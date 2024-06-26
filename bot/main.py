import PyPDF2
import nltk
import textwrap
import time
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from difflib import SequenceMatcher
from concurrent.futures import ThreadPoolExecutor

# Descargar recursos de NLTK
# nltk.download('punkt')
# nltk.download('stopwords')
# nltk.download('wordnet')

# Caché para almacenar el procesamiento de texto de los PDFs verídicos
procesamiento_cache = {}


def extraer_texto(pdf_path):
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
    return text


def preprocesar_texto(texto):
    # Tokenización en oraciones y palabras
    oraciones = sent_tokenize(texto)
    palabras = word_tokenize(texto)

    # Eliminar stopwords y puntuación
    stopwords_esp = set(stopwords.words('spanish'))
    palabras = (palabra.lower() for palabra in palabras if palabra.isalpha(
    ) and palabra not in stopwords_esp)

    # Lematización
    lematizador = WordNetLemmatizer()
    palabras = (lematizador.lemmatize(palabra) for palabra in palabras)

    return palabras


def procesar_texto(pdf_path):
    if pdf_path in procesamiento_cache:
        return procesamiento_cache[pdf_path]
    else:
        texto = extraer_texto(pdf_path)
        texto_procesado = list(preprocesar_texto(texto))
        procesamiento_cache[pdf_path] = texto_procesado
        return texto_procesado


def generar_correcciones(pdf_incorrecto, pdfs_veridicos):
    texto_incorrecto_procesado = procesar_texto(pdf_incorrecto)
    correcciones = []

    with ThreadPoolExecutor() as executor:
        futures = [executor.submit(procesar_correccion, pdf_veridico,
                                   texto_incorrecto_procesado) for pdf_veridico in pdfs_veridicos]

        for future in futures:
            correccion = future.result()
            correcciones.append(correccion)

    correcciones.sort(key=lambda x: x[1], reverse=True)
    return correcciones


def procesar_correccion(pdf_veridico, texto_incorrecto_procesado):
    texto_veridico_procesado = procesar_texto(pdf_veridico)
    similitud = SequenceMatcher(
        None, texto_incorrecto_procesado, texto_veridico_procesado).ratio()
    return (pdf_veridico, similitud, texto_veridico_procesado)


# Ruta del archivo PDF incorrecto
pdf_incorrecto = "./pdf10.pdf"

# Lista de PDFs verídicos
pdfs_veridicos = [
    "./redes_lan.pdf",
    "./contaminacion.pdf",
    "./Informe_Estadístico_07.docx.pdf",
    "./PRACT-CALIFICADA-SEM-8.pdf",
    "./TUTORIA - EXAMEN FINAL.pdf",
    "./pdf1.pdf",
    "./pdf2.pdf",
    "./pdf3.pdf",
    "./pdf4.pdf",
    "./pdf5.pdf",
    "./pdf6.pdf",
    "./pdf7.pdf",
    "./pdf8.pdf",
]

start_time = time.time()

# Generar lista de correcciones
correcciones = generar_correcciones(pdf_incorrecto, pdfs_veridicos)

end_time = time.time()

if correcciones:
    print("Se encontraron correcciones:")
    for pdf_veridico, similitud, texto_veridico in correcciones:
        similitud_porcentaje = round(similitud * 100, 2)
        texto_acortado = textwrap.shorten(
            " ".join(texto_veridico), width=200, placeholder="...")

        results = {
            "pdf_veridico": f"{pdf_veridico}",
            "similitud": f"{similitud_porcentaje}",
            "fragmento_similar": f"{texto_acortado}"
        }
        print(f"PORCENTAJE DE SIMILITUD: {results['similitud']}%")
        print(f"PED VERIDICO: {results['pdf_veridico']}")
        print(f"FRAGMENTO SIMILARES: {results['fragmento_similar']}")
        print(f"PDF ESCANEADOS: {len(pdf)}")
        print("")


elapsed_time = end_time - start_time
print(f"Tiempo de ejecución: {elapsed_time} segundos")
