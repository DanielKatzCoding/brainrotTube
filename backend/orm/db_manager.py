from random import randint
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .models import Base, VideoAlias, Video, Comment
from contextlib import contextmanager
import uuid

class DatabaseManager:
    def __init__(self, db_url):
        self.engine = create_engine(db_url)
        Base.metadata.create_all(self.engine)
        self.Session = sessionmaker(bind=self.engine)

    def get_videoalias_records(self) -> list[VideoAlias]:
        lst = []
        with self.connection() as session:
            for video_alias in session.query(VideoAlias).all():
                lst.append(VideoAlias(
                    video_id=video_alias.video_id,
                    real_name=video_alias.real_name
                    )
                )
        return lst
    
    def get_video_record(self, video_id) -> Video | None:
        with self.connection() as session:
            video = session.query(Video).filter(Video.video_id == video_id).one_or_none()
            if video:
                return Video(
                video_id=video.video_id,
                title=video.title,
                description=video.description,
                likes=video.likes
            )

    def insert_video(self, video_name: str, description, likes):
        with self.connection() as session:
            tb = VideoAlias(
                real_name=video_name,
                video_id=uuid.uuid4()
            )

            video_id = tb.video_id
            name = video_name.split('.')[0]

            tb2 = Video(
                video_id=video_id,
                title=name,
                description=description,
                likes=likes
            )

            session.add_all([tb, tb2])

    def delete_video_record(self, video_id: str):
        with self.connection() as session:
            obj_video_alias = session.query(VideoAlias).get(video_id)
            obj_video = session.query(Video).get(video_id)
            session.delete(obj_video)
            session.delete(obj_video_alias)         

    def insert_comment(self, comment, video_id):
        with self.connection() as session:
            tb = Comment(
                username=comment["name"],
                email=comment["email"],
                body=comment["body"],
                video_id=video_id
            )

            session.add(tb)
            
    def delete_comments(self, video_id: str):
        with self.connection() as session:
            objs = session.query(Comment).filter(Comment.video_id == video_id).all()
            for obj in objs:
                session.delete(obj)

    @contextmanager
    def connection(self):
        session = self.Session()
        try:
            yield session
            session.commit()
        except Exception:
            session.rollback()
            raise
        finally:
            session.close()

    # def create(self, obj):
    #     session = self.Session()
    #     session.add(obj)
    #     session.commit()
    #     session.refresh(obj)
    #     session.close()
    #     return obj

    # def read(self, model, obj_id):
    #     session = self.Session()
    #     result = session.query(model).get(obj_id)
    #     session.close()
    #     return result

    # def update(self, model, obj_id, **kwargs):
    #     session = self.Session()
    #     obj = session.query(model).get(obj_id)
    #     for key, value in kwargs.items():
    #         setattr(obj, key, value)
    #     session.commit()
    #     session.refresh(obj)
    #     session.close()
    #     return obj

    # def delete(self, model, obj_id):
    #     session = self.Session()
    #     obj = session.query(model).get(obj_id)
    #     session.delete(obj)
    #     session.commit()
    #     session.close()
