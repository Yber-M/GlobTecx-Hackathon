from controller.FileController import FileController
from service.PdfService import PdfService
import os

pdf = PdfService()
file_ctrl = FileController()


files = file_ctrl.get_all_files()

file_path = files[0]["path"]

print(pdf.read(file_path))
