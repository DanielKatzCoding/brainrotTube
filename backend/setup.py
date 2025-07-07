from random import randint
from orm.db_manager import DatabaseManager
import os
import json


class Setup:
    def __init__(self):
        VIDEO_DIR = os.environ["MEDIA_PATH"]
        postgres_uri = os.environ["POSTGRES_URI"]
        self.__client = DatabaseManager(postgres_uri)
        self.__files = os.listdir(VIDEO_DIR)

    def generate_videos_data(self):
        records_lst = self.__client.get_videoalias_records()
        records = {}
        if records_lst:
            records = {record.real_name: record.video_id for record in records_lst}

        for file in self.__files:
            if not records.get(file):                
                self.__client.insert_video(file, 
                                           f"Default description for {file.split('.')[0]}", 
                                           randint(0, 1_000_000)
                                            )
            else:
                records.pop(file)
        for _, video_id in records.items():
            self.__client.delete_video_record(video_id)

    def generate_comments_data(self):
        records_lst = self.__client.get_videoalias_records()
        
        for record in records_lst:
            video_record = self.__client.get_video_record(record.video_id)
            comments_amount = video_record.likes // 50  # simulate real ratio
            with open("/app/fake_comments.json", 'r') as f:
                comments_json = json.load(f)
            
            for _ in range(comments_amount):
                comment = comments_json[randint(0, len(comments_json)-1)]
                self.__client.insert_comment(comment, record.video_id)
                

    def delete_trash_data(self):
        records_lst = self.__client.get_videoalias_records()
        if not records_lst:
            return
        
        for file in self.__files:
            for record in records_lst.copy():
                if record.real_name == file.split('.')[0]:
                    records_lst.remove(record)
                    break

        video_ids = [record.video_id for record in records_lst]

        for video_id in video_ids:
            self.__client.delete_video_record(video_id)
            self.__client.delete_comments(video_id)


    def start(self):
        print("[*] DELETING TRASH DATA")        
        self.delete_trash_data()  
        print("[*] GENERATING VIDEO DATA")
        self.generate_videos_data()
        print("[*] GENERATING COMMENTS DATA")
        self.generate_comments_data()
              
