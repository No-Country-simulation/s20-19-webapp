from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from utils.config import Base

class ShopLocation(Base):
    __tablename__ = 'shops_locations'

    location_id = Column(String, ForeignKey('locations.id'), primary_key=True)
    shop_id = Column(String, ForeignKey('shops.id'), primary_key=True)
    shop = relationship("Shop", back_populates="locations")
    location = relationship("Location", back_populates="shops")