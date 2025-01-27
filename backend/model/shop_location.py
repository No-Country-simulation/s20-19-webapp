from sqlalchemy import Column, String, ForeignKey, Integer
from sqlalchemy.orm import relationship
from utils.config import Base

class ShopLocation(Base):
    __tablename__ = 'shop_location'

    location_id = Column(Integer, ForeignKey('locations.id'), primary_key=True)
    shop_id = Column(Integer, ForeignKey('shops.id'), primary_key=True)