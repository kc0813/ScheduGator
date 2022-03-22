from pydantic import BaseModel


class ClassQuery(BaseModel):
    """
    ClassQuery is the model for looking up classes
    """

    # API requires this to query properly
    category: str = "CWSP"
    term: int = 2221
    # priority 1
    # quest will be quest 1
    isQuest: bool | None
    genEd: str | None
    writing: int | None
    # TODO: specify R for thursday
    meeting: str | None

    # TODO see https://fastapi.tiangolo.com/tutorial/schema-extra-example/
    class Config:
        schema_extra = {
            "example": {
                "category": "CWSP",
                "term": 2221,
                "isQuest": False,
                "genEd": None,
                "writing": 2000,
                "meeting": "MWF",
            }
        }
