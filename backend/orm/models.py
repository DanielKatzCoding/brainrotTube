import uuid
from sqlalchemy import (
    Column, Integer, String, ForeignKey, Text, create_engine, func, select
)
from sqlalchemy.orm import declarative_base, relationship, sessionmaker, column_property
from sqlalchemy.dialects.postgresql import UUID

Base = declarative_base()


class VideoAlias(Base):
    __tablename__ = 'videoalias'

    video_id = Column(UUID(as_uuid=True), ForeignKey('videos.video_id'), primary_key=True, default=uuid.uuid4)
    real_name = Column(String(255))
    video = relationship("Video", back_populates="alias", uselist=False)


class Comment(Base):
    __tablename__ = 'comments'

    id = Column(Integer, primary_key=True)
    video_id = Column(UUID(as_uuid=True), ForeignKey('videos.video_id'), nullable=False)
    username = Column(String(100), nullable=False)
    email = Column(String(100))
    body = Column(Text)

    # Relationship to video
    video = relationship("Video", back_populates="comments")
    

class Video(Base):
    __tablename__ = 'videos'

    video_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    likes = Column(Integer, default=0)

    # One-to-one relationship with VideoAlias
    alias = relationship("VideoAlias", back_populates="video", uselist=False)

    # One-to-many relationship with Comments
    comments = relationship("Comment", back_populates="video", cascade="all, delete-orphan")

    # Derived attribute: commentsCount (computed, not stored)
    commentsCount = column_property(
        select(func.count(Comment.id)).where(Comment.video_id == video_id).correlate_except(Comment).scalar_subquery()
    )
