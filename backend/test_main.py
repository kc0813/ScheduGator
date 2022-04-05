from fastapi.testclient import TestClient
import main

client = TestClient(main.app)


def test_read_main():
    """
    Makes sure that the api is setup
    """
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello world, I'm working!!!"}


def test_class_category_valid():
    """
    Tests the class endpoint with a valid query
    """
    response = client.put(
        "/class/",
        json={
            "category": "CWSP",
            "term": 2221,
            "courseCode": "CAP3027",
        },
    )
    assert response.status_code == 200
    assert response.json() == [
        {
            "COURSES": [],
            "LASTCONTROLNUMBER": 0,
            "RETRIEVEDROWS": 0,
            "TOTALROWS": 0,
        }
    ]


def test_class_category_invalid():
    """
    Tests the class endpoint with an invalid query
    """
    response = client.put(
        "/class/",
        json={
            "category": True,
            "term": 2221,
            "courseCode": "CAP3027",
        },
    )
    assert response.status_code == 200
    assert response.json() == [
        {
            "COURSES": [],
            "LASTCONTROLNUMBER": 0,
            "RETRIEVEDROWS": 0,
            "TOTALROWS": 0,
        }
    ]
