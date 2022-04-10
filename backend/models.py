from pydantic import BaseModel


class ClassQuery(BaseModel):
    """
    ClassQuery is the model for looking up classes
    """

    # API requires this to query properly
    category: str = "CWSP"
    term: int = 2221
    # priority 1
    courseCode: str | None
    # quest will be quest 1
    isQuest: bool | None
    genEd: str | None
    writing: int | None
    # days the class meets
    meetingDays: str | None

    # TODO see https://fastapi.tiangolo.com/tutorial/schema-extra-example/
    class Config:
        schema_extra = {
            "example": {
                "category": "CWSP",
                "term": 2221,
                "courseCode": "CAP3027",
                "isQuest": False,
                "writing": 2000,
                "meeting": "mwf",
            }
        }


class CourseData(BaseModel):
    """
    Schema for returning courses
    """

    code: str
    sections: list


class Message(BaseModel):
    message: str
