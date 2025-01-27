from typing import Callable
from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse

class AhorraYaAPIException(Exception):
    """base exception class"""

    def __init__(self, message: str = "Service is unavailable"):
        self.message = message
        self.name = self.__class__.__name__
        super().__init__(self.message)


class ServiceError(AhorraYaAPIException):
    """failures in APIs services"""

    pass


class EntityDoesNotExistError(AhorraYaAPIException):
    """database returns nothing"""

    pass


class InvalidOperationError(AhorraYaAPIException):
    """invalid operations like trying to delete a non-existing entity"""

    pass


class EntityAlreadyExistsError(AhorraYaAPIException):
    """conflict detected, like trying to create a resource that already exists"""

    pass


class AuthenticationFailed(AhorraYaAPIException):
    """invalid authentication credentials"""

    pass


class InvalidTokenError(AhorraYaAPIException):
    """invalid token"""

    pass


app = FastAPI()

def create_exception_handler(
    status_code: int, initial_detail: str
) -> Callable[[Request, AhorraYaAPIException], JSONResponse]:
    detail = {"message": initial_detail}  # diccionario para mantener mensaje de detalle de excepcion

    async def exception_handler(_: Request, exc: AhorraYaAPIException) -> JSONResponse:
        if exc.message:
            detail["message"] = exc.message

        return JSONResponse(
            status_code=status_code, content={"detail": detail["message"]}
        )

    return exception_handler


app.add_exception_handler(
    exc_class_or_status_code=EntityDoesNotExistError,
    handler=create_exception_handler(
        status.HTTP_404_NOT_FOUND, "Entity does not exist."
    ),
)

app.add_exception_handler(
    exc_class_or_status_code=InvalidOperationError,
    handler=create_exception_handler(
        status.HTTP_400_BAD_REQUEST, "Can't perform the operation."
    ),
)

app.add_exception_handler(
    exc_class_or_status_code=AuthenticationFailed,
    handler=create_exception_handler(
        status.HTTP_401_UNAUTHORIZED,
        "Authentication failed due to invalid credentials.",
    ),
)

app.add_exception_handler(
    exc_class_or_status_code=InvalidTokenError,
    handler=create_exception_handler(
        status.HTTP_401_UNAUTHORIZED, "Invalid token, please re-authenticate again."
    ),
)

app.add_exception_handler(
    exc_class_or_status_code=ServiceError,
    handler=create_exception_handler(
        status.HTTP_500_INTERNAL_SERVER_ERROR,
        "A service seems to be down, try again later.",
    ),
)