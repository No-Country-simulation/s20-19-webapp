from typing import List
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
from utils.config import Base

class Product(Base):
    __tablename__ = 'products'

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    brand = Column(String, nullable=False)
    type = Column(String, nullable=False)
    publication = relationship('Publication', back_populates='products')