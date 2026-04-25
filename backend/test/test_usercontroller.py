import pytest
from unittest.mock import Mock
from src.controllers.usercontroller import UserController


@pytest.fixture
def mock_dao():
    return Mock()

@pytest.fixture
def controller(mock_dao):
    return UserController(mock_dao)



def test_single_user_found(controller, mock_dao):

    mock_dao.find.return_value = [{"name": "John", "email": "john@test.com"}]

    result = controller.get_user_by_email("john@test.com")

    assert result["email"] == "john@test.com"


def test_multiple_users_returns_first_and_prints_warning(controller, mock_dao, capsys):
    
    mock_dao.find.return_value = [
        {"name": "User1", "email": "same@test.com"},
        {"name": "User2", "email": "same@test.com"},
    ]

    result = controller.get_user_by_email("same@test.com")
    captured = capsys.readouterr()

    assert result["name"] == "User1"
    assert "more than one user found" in captured.out


def test_no_user_found_returns_none(controller, mock_dao):
    
    mock_dao.find.return_value = []

    result = controller.get_user_by_email("none@test.com")

    assert result is None


def test_invalid_email_raises_value_error(controller):

    with pytest.raises(ValueError):
        controller.get_user_by_email("wrong-email")


def test_invalid_email_missing_local_part(controller):
    

    with pytest.raises(ValueError):
        controller.get_user_by_email("@test.com")


def test_database_exception_propagates(controller, mock_dao):
    
    mock_dao.find.side_effect = Exception("Database failed")

    with pytest.raises(Exception):
        controller.get_user_by_email("test@test.com")