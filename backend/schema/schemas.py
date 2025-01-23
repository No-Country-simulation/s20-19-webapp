from pydantic import BaseModel
from typing import List, Annotated, Union, Optional

#Esquemas:
class UserSchema(BaseModel):
    id: str
    first_name: str
    last_name: str
    email: str
    password: Union[str, int] 
    is_blocked: Optional[bool] = False
    is_deleted: Optional[bool] = False
    publications: Optional[dict]

class PublicationSchema(BaseModel):
    id: str
    price: float
    positive_points: int
    negative_points: int
    initial_date: str
    final_date: Optional[str]
    comments: Optional[dict]
    product: dict
    business: dict
    is_deleted: Optional[bool] = False
    created_at: str

class CommentSchema(BaseModel):
    id: str
    user_id: str
    comment: str

class ProductSchema(BaseModel):
    id: str
    name: str
    brand: str
    type: str

class ShopSchema(BaseModel):
    id: str
    name: str
    address: Optional[str]
    location: Optional[str]


class LocationSchema(BaseModel):
    id: str
    city: str
    state: str
    country: str
    shop: Optional[str]


class ShopLocationSchema(BaseModel):
    location_id: str
    shop_id: str