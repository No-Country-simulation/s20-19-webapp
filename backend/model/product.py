from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship
from utils.config import Base

class Product(Base):
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    brand = Column(String, nullable=False)
    type = Column(String, nullable=False)
    publications = relationship('Publication', back_populates='product')