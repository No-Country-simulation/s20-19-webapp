from typing import List
from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from utils.config import Base

class Publication(Base):
    __tablename__ = 'publications'

    id = Column(String, primary_key=True)
    price = Column(Float, nullable=False)
    positive_points = Column(Integer, default=0)
    negative_points = Column(Integer, default=0)
    initial_date = Column(DateTime, nullable=False)
    final_date = Column(DateTime, nullable=True)
    is_deleted = Column(Boolean, default=False)
    created_at = Column(String, nullable=False)
    user_id = Column(String, ForeignKey('users.id'))
    user = relationship('User', back_populates='publications')
    comments = relationship('Comment', back_populates='publication')
    #product_id = Column(String, ForeignKey('products.id'))
    shop_id = Column(String, ForeignKey('shops.id'))
    shops = relationship('Shop', back_populates='publications')