from typing import List
from sqlalchemy import Column, String, ForeignKey, Integer
from sqlalchemy.orm import relationship
from utils.config import Base

class Comment(Base):
    __tablename__ = 'comments'
    id = Column(Integer, primary_key=True, autoincrement=True)
    comment = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship('User', back_populates='comments')
    publication_id = Column(Integer, ForeignKey('publications.id'))
    publication = relationship('Publication', back_populates='comments')