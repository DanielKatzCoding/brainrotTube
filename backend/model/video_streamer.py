import os
from fastapi import Request, HTTPException
from fastapi.responses import Response, StreamingResponse

class VideoStreamer:
    VIDEO_DIR = os.path.abspath("./media")

    def get_video_path(self, index) -> str:
        """"Get the current video file path."""
        return os.listdir(self.VIDEO_DIR)[index]

    def parse_range_header(self, range_header: str, file_size: int) -> tuple:
        """Parse the 'Range' header and return (start, end) byte positions."""
        try:
            range_value = range_header.replace("bytes=", "")
            start_str, end_str = range_value.split("-")
            start = int(start_str)
            end = int(end_str) if end_str else file_size - 1
            if start > end or end >= file_size:
                raise ValueError
            return start, end
        except Exception:
            raise HTTPException(status_code=416, detail="Invalid range header")

    def get_video_chunk(self, file_path: str, start: int, end: int) -> bytes:
        """Read the specified byte range from the video file."""
        with open(file_path, "rb") as video:
            video.seek(start)
            return video.read(end - start + 1)

    def iter_video_file(self, file_path: str):
        """Yield the video file in chunks (for full file streaming)."""
        with open(file_path, "rb") as video:
            yield from video

    async def stream_video(self, request: Request, index: int):
        file_path = os.path.join(self.VIDEO_DIR, self.get_video_path(index))
        file_size = os.path.getsize(file_path)
        range_header = request.headers.get('range')

        if range_header:
            start, end = self.parse_range_header(range_header, file_size)
            chunk = self.get_video_chunk(file_path, start, end)
            headers = {
                "Content-Range": f"bytes {start}-{end}/{file_size}",
                "Accept-Ranges": "bytes",
                "Content-Length": str(end - start + 1),
                "Content-Type": "video/mp4",
            }

                    
            return Response(chunk, status_code=206, headers=headers)
        else:
            return StreamingResponse(self.iter_video_file(file_path), media_type="video/mp4")