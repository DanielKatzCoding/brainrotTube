from pydantic import BaseModel

class VideoData(BaseModel):
    title: str
    description: str
    likes: int
    comments: int
    views: int


class CommentData(BaseModel):
    username: str
    comment: str
