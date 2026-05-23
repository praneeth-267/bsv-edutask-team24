import pytest
from unittest.mock import patch
from src.util.dao import DAO


# Creates DAO object for tests and removes collection after tests.
@pytest.fixture
def dao():
    with patch("src.util.dao.getValidator") as mock_validator:
        mock_validator.return_value = {}

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


# Empty string values should be stored successfully.
def test_create_empty_string_values(dao):
    result = dao.create({
        "firstName": "",
        "lastName": "",
        "email": ""
    })

    assert result["email"] == ""


# Object with missing fields should still be inserted
# because validator behavior is mocked.
def test_create_object_missing_fields(dao):
    result = dao.create({
        "firstName": "Bob"
    })

    assert result["firstName"] == "Bob"


# Multiple objects should be inserted successfully.
def test_create_multiple_objects(dao):
    dao.create({
        "firstName": "Alice",
        "lastName": "Smith",
        "email": "alice@test.com"
    })

    result = dao.create({
        "firstName": "Bob",
        "lastName": "Jones",
        "email": "bob@test.com"
    })

    assert result["email"] == "bob@test.com"


# Inserted object should contain generated MongoDB id.
def test_create_returns_inserted_object(dao):
    result = dao.create({
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@test.com"
    })

    assert "_id" in result
    
