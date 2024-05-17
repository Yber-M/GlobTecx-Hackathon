import asyncio
from rasa.core.agent import Agent
import PyPDF2

# Función para extraer el texto de un archivo PDF
def extract_text_from_pdf(file_path):
    with open(file_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
    return text

async def main():
    agent = Agent.load("models/nlu-20230527-155447-sizzling-eagle.tar.gz")  # Carga el modelo entrenado
    pdf_file = "./redes_lan.pdf"  # Ruta del archivo PDF que deseas utilizar

    # Extrae el texto del PDF
    pdf_text = extract_text_from_pdf(pdf_file)

    # Inicia un bucle de conversación con el chatbot
    while True:
        user_input = input("Usuario: ")  # Ingresa el mensaje del usuario
        responses = await agent.handle_text(user_input, output_channel="pdf", pdf_text=pdf_text)  # Procesa el mensaje del usuario y pasa el texto del PDF
        for response in responses:
            print("Bot:", response["text"])  # Imprime la respuesta del bot

# Ejecuta el bucle de converJsación
asyncio.run(main())
