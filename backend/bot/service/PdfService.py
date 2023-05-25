from PyPDF2 import PdfReader


class PdfService:

    def read(self, file):
        pdf_reader = PdfReader(open(file, "rb"))
        words = ""

        for page in pdf_reader.pages:
            words += page.extract_text()
        return words
