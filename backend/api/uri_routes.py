from utils import Pagination
from fastapi import APIRouter, Request, Query
from fastapi.responses import StreamingResponse
from model.video_streamer import VideoStreamer

class URIRoutes(APIRouter):
    def __init__(self):
        """Initialize the URI routes with a prefix and tags."""
        super().__init__(prefix="/api", tags=["URI"])
        self.add_api_route("/media", self.stream_video_endpoint, methods=["GET"])

    @staticmethod
    async def stream_video_endpoint(
        request: Request,
        index: int = Query(..., ge=0)  # '...' makes it required, ge=0 ensures non-negative
    ):
        return await VideoStreamer().stream_video(request, index)