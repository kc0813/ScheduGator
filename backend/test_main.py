from fastapi.testclient import TestClient
import main

client = TestClient(main.app)


def test_read_main():
    """
    Makes sure that the api is setup
    """
    response = client.get("/")
    assert response.status_code == 200


def test_class_category_invalid():
    """
    Tests the class endpoint with a 404 query
    """
    response = client.put(
        "/class/",
        json={
            "category": "CWSP",
            "term": 2221,
            "courseCode": "CAP3027",
        },
    )
    assert response.status_code == 404


def test_class_category_valid():
    """
    Tests the class endpoint with a valid query
    """
    response = client.put(
        "/class/",
        json={
            "category": True,
            "term": 2221,
            "courseCode": "CDA3101",
        },
    )
    assert response.status_code == 200
