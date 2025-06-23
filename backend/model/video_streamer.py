import os
from fastapi import Request, HTTPException
from fastapi.responses import Response, StreamingResponse

class VideoStreamer:
    VIDEO_DIR = os.path.abspath("./media")
    MAX_CHUNK_SIZE = 1024 * 1024  # 1MB

    def get_video_path(self, index) -> str:
        files = sorted(os.listdir(self.VIDEO_DIR))
        return files[index]

    def parse_range_header(self, range_header: str, file_size: int) -> tuple:
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
        with open(file_path, "rb") as video:
            video.seek(start)
            return video.read(end - start + 1)

    def iter_video_file(self, file_path: str, chunk_size: int = 64 * 1024):
        with open(file_path, "rb") as video:
            while True:
                data = video.read(chunk_size)
                if not data:
                    break
                yield data

    async def stream_video(self, request: Request, index: int):
        file_path = os.path.join(self.VIDEO_DIR, self.get_video_path(index))
        file_size = os.path.getsize(file_path)
        range_header = request.headers.get('range')

        if range_header:
            start, end = self.parse_range_header(range_header, file_size)
            # Limit the chunk size
            end = min(end, start + self.MAX_CHUNK_SIZE - 1, file_size - 1)
            chunk = self.get_video_chunk(file_path, start, end)
            headers = {
                "Content-Range": f"bytes {start}-{end}/{file_size}",
                "Accept-Ranges": "bytes",
                "Content-Length": str(end - start + 1),
                "Content-Type": "video/mp4",
            }
            return Response(chunk, status_code=206, headers=headers)
        else:
            return StreamingResponse(
                self.iter_video_file(file_path),
                media_type="video/mp4",
                headers={"Accept-Ranges": "bytes"}
            )