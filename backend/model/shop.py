from typing import List
from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship
from utils.config import Base

class Shop(Base):
    __tablename__ = 'shops'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    address = Column(String, nullable=True)
    location = Column(String, nullable=True)
    locations = relationship("Location", secondary='shop_location', back_populates='shops')
    publications = relationship("Publication", back_populates='shops')