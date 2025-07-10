from random import randint
from orm.db_manager import DatabaseManager
from orm.models import VideoAlias
import os
import json


class Setup:
    def __init__(self):
        VIDEO_DIR = os.environ["MEDIA_PATH"]
        postgres_uri = os.environ["POSTGRES_URI"]
        self.__client = DatabaseManager(postgres_uri)
        self.__files = os.listdir(VIDEO_DIR)

    def generate_videos_data(self, new_files: list[str]):
        for filename in new_files:
                self.__client.insert_video(filename,
                                           f"Default description for {filename}",
                                           randint(0, 500_000)
                                           )

    def generate_comments_data(self):
        records_lst = self.__client.get_videoalias_records()
        with open("/app/fake_comments.json", 'r') as f:
            comments_json = json.load(f)

        for record in records_lst:
            video_record = self.__client.get_video_record(record.video_id)
            comments_amount = int(video_record.likes * .1)  # simulate real ratio
            for _ in range(comments_amount):
                comment = comments_json[randint(0, len(comments_json)-1)]
                self.__client.insert_comment(comment, record.video_id)
                

    def delete_trash_data(self, records_lst: list[VideoAlias]):
        for record in records_lst:
            self.__client.delete_video_record(record.video_id)
            self.__client.delete_comments(record.video_id)
        # If extra records are left, It means that there are entities that no longer exists

    def clean_and_new_files(self) -> list[str]:
        """This function will return all new files available 
        and files clear records of files that are no longer exist.

        Returns:
            list[str]: List of new files (do not exist in records)
        """
        new_files = []
        records_lst = self.__client.get_videoalias_records()
        for file in self.__files:            
            for record in records_lst.copy():
                if record.real_name == os.path.splitext(file)[0]:
                    records_lst.remove(record)
                    break
            new_files.append(os.path.splitext(file)[0])
            
        self.delete_trash_data(records_lst)
        return new_files

    def start(self):
        print("[*] DELETING TRASH DATA")        
        new_filenames = self.clean_and_new_files()
        print("[*] GENERATING VIDEO DATA")
        self.generate_videos_data(new_filenames)
        print("[*] GENERATING COMMENTS DATA")
        self.generate_comments_data()
        