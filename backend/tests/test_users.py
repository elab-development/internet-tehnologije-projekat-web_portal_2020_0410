from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)


def test_root():
    res = client.get("/")
    assert res.json()["message"] == "Hi mom"
