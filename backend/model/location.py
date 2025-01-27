from typing import List
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
from utils.config import Base

class Location(Base):
    __tablename__ = 'locations'

    id = Column(String, primary_key=True)
    city = Column(String, nullable=False)
    state = Column(String, nullable=False)
    country = Column(String, nullable=False)
    shops = relationship("Shop", secondary='shop_location', back_populates='locations')