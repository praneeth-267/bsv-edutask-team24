import pytest
from src.util.dao import DAO


@pytest.fixture
def dao():
    d = DAO("user")
    yield d
    d.drop()


def test_create_valid_object(dao):
    result = dao.create({
        "firstName": "Alice",
        "lastName": "Smith",
        "email": "alice@test.com"
    })

    assert result["email"] == "alice@test.com"


def test_create_missing_field(dao):
    with pytest.raises(Exception):
        dao.create({
            "firstName": "Bob",
            "email": "bob@test.com"
        })


def test_create_missing_email_field(dao):
    with pytest.raises(Exception):
        dao.create({
            "firstName": "John",
            "lastName": "Doe"
        })


def test_create_wrong_datatype(dao):
    with pytest.raises(Exception):
        dao.create({
            "firstName": 123,
            "lastName": True,
            "email": "wrong@test.com"
        })