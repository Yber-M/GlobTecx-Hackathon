from service.FileService import FileService


class FileController:
    def __init__(self):
        self.file_service = FileService()

    def get_all_files(self):
        return self.file_service.get_all_files()
