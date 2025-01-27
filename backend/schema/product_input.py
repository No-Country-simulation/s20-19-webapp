from pydantic import BaseModel

class ProductInput(BaseModel):
    name: str
    brand: str
    type: str