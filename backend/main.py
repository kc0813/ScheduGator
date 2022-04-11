from doctest import Example
from enum import IntEnum
from http.client import responses
from fastapi import Body, FastAPI
from fastapi.responses import JSONResponse
import requests
from models import ClassQuery, CourseData, Message, ScheduleList, CourseList
from fastapi.middleware.cors import CORSMiddleware
from algorithm import dynamicScheduleBuilder as dsbuilder

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PERIOD(IntEnum):
    """
    Enum for periods
    """

    E1 = 12
    E2 = 13
    E3 = 14


@app.get("/")
async def root():
    """
    Default endpoint
    Currently set to message back hello world
    """
    return {"message": "Hello world, I'm working!!!"}


@app.post(
    "/buildSchedule/", response_model=ScheduleList, responses={400: {"model": Message}}
)
async def buildSchedule(
    query: CourseList = Body(
        ..., examples={"1": {"schedules": ["list of schedules here"]}}
    )
):
    """
    Endpoint for building a schedule
    """
    rows = 14
    template = {
        "M": ["" for i in range(rows)],
        "T": ["" for i in range(rows)],
        "W": ["" for i in range(rows)],
        "R": ["" for i in range(rows)],
        "F": ["" for i in range(rows)],
        "S": ["" for i in range(rows)],
        "Online": [],
    }
    return {"schedules": dsbuilder(template, query.courses)}


@app.put("/class/", response_model=CourseData, responses={404: {"model": Message}})
async def queryClass(
    query: ClassQuery = Body(
        ...,
        examples={
            "1": {
                "summary": "Query description",
                "description": "Description of the parameters, **DO NOT** query this.",
                "value": {
                    "category": "CWSP for on campus students, IA for innovation academy students",
                    "term": "2221, see rolstenhouse api for more detail",
                    "isQuest": "True if you want to see quest 1 classes",
                    "genEd": "The genEd you want to see",
                    "writing": "writing requirement, 2000, 4000, or 6000",
                    "meeting": "The meeting days you want to see M, T, W, R, F",
                },
            },
            "2": {
                "summary": "Example valid query",
                "description": "Example that you can **actually** query",
                "value": {
                    "category": "CWSP",
                    "term": 2221,
                    "courseCode": "CDA3101",
                },
            },
            "3": {
                "summary": "Example invalid query",
                "description": "Example that you can **actually** query but returns no classes",
                "value": {
                    "category": "CWSP",
                    "term": 2221,
                    "courseCode": "CAP3027",
                },
            },
        },
    ),
):
    """
    Query class information
    """
    # setup parameters to query uf soc
    url = "https://one.uf.edu/apix/soc/schedule"

    params = {
        "category": query.category,
        "term": query.term,
        "course-code": query.courseCode or "",
        "qst-1": query.isQuest or False,
        "days": {
            "day-m": True
            if query.meetingDays is not None and "m" in query.meetingDays.lower()
            else False,
            "day-t": True
            if query.meetingDays is not None and "t" in query.meetingDays.lower()
            else False,
            "day-w": True
            if query.meetingDays is not None and "w" in query.meetingDays.lower()
            else False,
            "day-r": True
            if query.meetingDays is not None and "r" in query.meetingDays.lower()
            else False,
            "day-f": True
            if query.meetingDays is not None and "f" in query.meetingDays.lower()
            else False,
            "day-s": True
            if query.meetingDays is not None and "s" in query.meetingDays.lower()
            else False,
        },
    }

    # writing requirement
    if query.writing is not None:
        wr = "wr-{}".format(query.writing)
        params[wr] = True

    if query.genEd is not None:
        genEd = "gen-{}".format(query.genEd)
        params[genEd] = True

    r = requests.get(url=url, params=params).json()[0]
    if r["TOTALROWS"] == 0:
        return JSONResponse(status_code=404, content={"message": "No class found"})

    course = r["COURSES"][0]
    code = course["code"]
    rawSections = course["sections"]
    sections = []
    for section in rawSections:
        meetTimes = []
        for meeting in section["meetTimes"]:
            meetStart = meeting["meetPeriodBegin"]
            if meetStart[0] == "E":
                meetStart = int(PERIOD(meetStart))
            else:
                meetStart = int(meetStart)
            meetEnd = meeting["meetPeriodEnd"]
            if meetEnd[0] == "E":
                meetEnd = int(PERIOD(meetEnd))
            else:
                meetEnd = int(meetEnd)
            periods = [i for i in range(meetStart, meetEnd + 1)]
            for meetDay in meeting["meetDays"]:
                for period in periods:
                    meetTimes.append([meetDay, period])
        sections.append({section["classNumber"]: meetTimes})

    return {"code": code, "sections": sections}
