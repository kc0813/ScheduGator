from fastapi import Body, FastAPI
import requests
from models import ClassQuery

app = FastAPI()


@app.get("/")
async def root():
    """
    Default endpoint
    Currently set to message back hello world
    """
    return {"message": "Hello World"}


@app.put("/class/")
async def queryClass(
    query: ClassQuery = Body(
        ...,
        examples={
            "invalid": {
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
            "normal": {
                "summary": "Example query",
                "description": "Example that you can **actually** query",
                "value": {
                    "category": "CWSP",
                    "term": 2221,
                    "courseCode": "CAP3027",
                    "isQuest": False,
                    "writing": 2000,
                    "meeting": "r",
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

    r = requests.get(url=url, params=params)
    return r.json()
