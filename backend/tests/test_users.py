import json

from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)


def test_root():
    res = client.get("/")
    assert res.json()["message"] == "Hi mom"
    assert res.status_code == 200


def test_create_user_success():
    res = client.post("/users/", json={
                                      "username": "string12",
                                      "password": "string",
                                      "first_name": "string",
                                      "last_name": "string",
                                      "description": "string",
                                      "email": "string12",
                                      "role_id": 1
                                    })
    assert res.status_code == 201
    assert res.json()["email"] == "string12"
    assert res.json()["username"] == "string12"
    assert res.json()["role_id"] == 1
    to_delete = res.json()['user_id']
    res = client.delete(f"/users/?user_id={to_delete}")
    assert res.status_code == 204

