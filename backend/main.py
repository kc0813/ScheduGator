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
                    "isQuest": False,
                    "genEd": None,
                    "writing": 2000,
                    "meeting": "R",
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
    }
    r = requests.get(url=url, params=params)
    return r.json()
