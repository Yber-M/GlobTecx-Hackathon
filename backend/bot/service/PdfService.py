from PyPDF2 import PdfReader


class PdfService:

    def read(self, file):
        pdf_reader = PdfReader(open(file, "rb"))
        words = []

        for line in pdf_reader.pages:
            words.append(line.extract_text())

        return words