import pytest
from unittest.mock import patch
from pymongo.errors import WriteError
from src.util.dao import DAO


@pytest.fixture
def dao():
    validator = {
        "$jsonSchema": {
            "bsonType": "object",
            "required": ["firstName", "lastName", "email"],
            "properties": {
                "firstName": {"bsonType": "string"},
                "lastName":  {"bsonType": "string"},
                "email":     {"bsonType": "string"}
            }
        }
    }
    with patch("src.util.dao.getValidator", return_value=validator):
        d = DAO("testuser")
        yield d
        d.drop()


# TC1: required fields present, correct types, non-empty values -> success
def test_create_valid_object(dao):
    result = dao.create({
        "firstName": "Alice",
        "lastName": "Smith",
        "email": "alice@test.com"
    })
    assert result is not None
    assert "_id" in result


# TC2: required fields present, correct types, empty string values -> success
def test_create_empty_string_values(dao):
    result = dao.create({
        "firstName": "",
        "lastName": "",
        "email": ""
    })
    assert result is not None
    assert "_id" in result


# TC3: required fields present, incorrect types, non-empty values -> WriteError
def test_create_wrong_datatype(dao):
    with pytest.raises(WriteError):
        dao.create({
            "firstName": 123,
            "lastName": True,
            "email": "wrong@test.com"
        })


# TC4: required fields missing, correct types, non-empty values -> WriteError
def test_create_missing_required_field(dao):
    with pytest.raises(WriteError):
        dao.create({
            "firstName": "Bob",
            "email": "bob@test.com"
        })


# TC5: required fields missing, incorrect types, non-empty values -> WriteError
def test_create_missing_field_and_wrong_type(dao):
    with pytest.raises(WriteError):
        dao.create({
            "firstName": 123,
            "email": "test@test.com"
        })
