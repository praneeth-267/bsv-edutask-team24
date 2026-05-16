import pytest
from src.util.dao import DAO


# Creates DAO object for tests and removes collection after tests.
@pytest.fixture
def dao():
    d = DAO("user")
    yield d
    d.drop()


# Valid user object should be created successfully.
def test_create_valid_object(dao):
    result = dao.create({
        "firstName": "Alice",
        "lastName": "Smith",
        "email": "alice@test.com"
    })
    assert result["email"] == "alice@test.com"


# Empty string values should be accepted as strings.
def test_create_empty_string_values(dao):
    result = dao.create({
        "firstName": "",
        "lastName": "",
        "email": ""
    })
    assert result["email"] == ""


# Missing required field should raise exception.
def test_create_missing_required_field(dao):
    with pytest.raises(Exception):
        dao.create({
            "firstName": "Bob",
            "email": "bob@test.com"
        })


# Wrong datatype should raise exception.
def test_create_wrong_datatype(dao):
    with pytest.raises(Exception):
        dao.create({
            "firstName": 123,
            "lastName": True,
            "email": "wrong@test.com"
        })


# Missing email field should raise exception.
def test_create_missing_email_field(dao):
    with pytest.raises(Exception):
        dao.create({
            "firstName": "John",
            "lastName": "Doe"
        })