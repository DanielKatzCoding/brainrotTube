import os
from random import randint
from orm.db_manager import DatabaseManager
from orm.models import VideoAlias
from fastapi import APIRouter, Request
from fastapi.exceptions import HTTPException
from model.video_streamer import VideoStreamer
from utils.request import Comment
from utils.response import VideoData, CommentData

class URIRoute(APIRouter):
    def __init__(self):
        """Initialize the URI routes with a prefix and tags."""
        super().__init__(prefix="/api", tags=["URI"])
        postgres_uri = os.environ["POSTGRES_URI"]
        self.__client = DatabaseManager(postgres_uri)
        self.add_api_route("/media", self.stream_video_endpoint, methods=["GET"])
        self.add_api_route("/get_video", self.get_random_video_data, methods=["GET"])

    async def stream_video_endpoint(
        self,
        request: Request,
        video_id: str
    ):
        with self.__client.connection() as session:
            filename = session.query(VideoAlias).filter(VideoAlias.video_id == video_id).one_or_none()
            if not filename:
                raise HTTPException(status_code=404, detail="video id does not exist")
            filename = filename.real_name

        return await VideoStreamer().stream_video(request, filename)
    
    def get_random_video_data(self):
        with self.__client.connection() as session:
            row_count = session.query(VideoAlias).count()

        randomized = randint(0, row_count-1)
        video_id = self.__client.get_videoalias_records(randomized, 1)[0].video_id
        video_record = self.__client.get_video_record(video_id)
        video_object = VideoData(
            title=video_record.title,
            description=video_record.description,
            video_id=video_id,
            likes_count=video_record.likes,
            comments_count=video_record.commentsCount,
        )
        return video_object.model_dump_json()
        