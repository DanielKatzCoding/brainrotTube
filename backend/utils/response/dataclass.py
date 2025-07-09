from pydantic import BaseModel

class VideoData(BaseModel):
    title: str
    description: str
    video_id: str
    likes_count: int
    comments_count: int


class CommentData(BaseModel):
    username: str
    comment: str
