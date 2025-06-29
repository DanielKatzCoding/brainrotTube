import os
from fastapi import Request, HTTPException
from fastapi.responses import StreamingResponse

class VideoStreamer:
    VIDEO_DIR = os.path.abspath("./media")
    CHUNK_SIZE = 1024 * 1024  # 1MB chunks

    def get_video_path(self, index) -> str:
        files = sorted(os.listdir(self.VIDEO_DIR))
        if index >= len(files):
            raise HTTPException(status_code=404, detail="Video not found")
        return os.path.join(self.VIDEO_DIR, files[index])

    def parse_range_header(self, range_header: str, file_size: int) -> tuple:
        try:
            range_value = range_header.replace("bytes=", "")
            start_str, end_str = range_value.split("-")
            start = int(start_str)
            end = min(int(end_str) if end_str else file_size - 1, file_size - 1)
            
            if start < 0 or start >= file_size or start > end:
                raise ValueError("Invalid range")
                
            return start, end
        except Exception as e:
            raise HTTPException(status_code=416, detail=f"Invalid range header: {str(e)}")

    def iter_video_chunks(self, file_path: str, start: int, end: int):
        """Generator to stream video in chunks within a range"""
        with open(file_path, "rb") as video:
            video.seek(start)
            remaining = end - start + 1
            
            while remaining > 0:
                chunk_size = min(self.CHUNK_SIZE, remaining)
                data = video.read(chunk_size)
                if not data:
                    break
                remaining -= len(data)
                yield data

    async def stream_video(self, request: Request, index: int):
        file_path = self.get_video_path(index)
        file_size = os.path.getsize(file_path)
        range_header = request.headers.get('range')

        if range_header:
            start, end = self.parse_range_header(range_header, file_size)
            content_length = end - start + 1
            
            headers = {
                "Content-Range": f"bytes {start}-{end}/{file_size}",
                "Accept-Ranges": "bytes",
                "Content-Length": str(content_length),
                "Content-Type": "video/mp4",
            }
            
            return StreamingResponse(
                self.iter_video_chunks(file_path, start, end),
                status_code=206,
                headers=headers
            )
        else:
            return StreamingResponse(
                self.iter_video_chunks(file_path, 0, file_size - 1),
                headers={
                    "Accept-Ranges": "bytes",
                    "Content-Length": str(file_size),
                    "Content-Type": "video/mp4"
                }
            )
