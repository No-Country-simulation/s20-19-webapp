from typing import List
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
from utils.config import Base

class Shop(Base):
    __tablename__ = 'shops'

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    address = Column(String, nullable=True)
    location = Column(String, nullable=True)
    locations = relationship("Location", secondary='ShopLocation', back_populates='shops')
    publication = relationship("Publication", back_populates='shops')