from urllib import request
import json


class FileService:
    def get_all_files(self):
        response = request.urlopen("http://localhost:3000/files")
        files = [x for x in json.loads(response.read()).get("body")]
        return files
