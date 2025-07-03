from pydantic import BaseModel

class Comment(BaseModel):
    index: int
    offset: int
    size: int

class Video(BaseModel):
    index: int
