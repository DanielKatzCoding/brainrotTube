from orm.db_manager import DatabaseManager
import os


class Setup:
    def __init__(self):
        VIDEO_DIR = os.environ["MEDIA_PATH"]
        postgres_uri = os.environ["POSTGRES_URI"]
        self.__client = DatabaseManager(postgres_uri)
        self.__files = os.listdir(VIDEO_DIR)

    def start(self):
        records_lst = self.__client.get_video_records()
        records = {}
        if records_lst:
            records = {record.real_name: record.video_id for record in records_lst}

        for file in self.__files:
            if not records.get(file):                
                self.__client.insert_video(file)
            else:
                records.pop(file)
        for _, video_id in records.items():
            self.__client.delete_video_record(video_id)
