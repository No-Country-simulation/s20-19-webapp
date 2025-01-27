from pydantic import BaseModel

class ProductOutput(BaseModel):
    id: int
    name: str
    brand: str
    type: str