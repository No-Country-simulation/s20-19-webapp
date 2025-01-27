from typing import List
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from utils.config import Base

class Comment(Base):
    __tablename__ = 'comments'

    id = Column(String, primary_key=True)
    comment = Column(String, nullable=False)
    user_id = Column(String, ForeignKey('users.id'))
    user = relationship('User', back_populates='comments')
    publication_id = Column(String, ForeignKey('publications.id'))
    publication = relationship('Publication', back_populates='comments')