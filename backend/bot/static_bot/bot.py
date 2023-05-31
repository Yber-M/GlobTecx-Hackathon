import nltk
from nltk.chat.util import Chat, reflections

# Pares de patrones y respuestas
pares = [
    [
        r"(.*)Hola(.*)",
        ["¡Hola! ¿En qué puedo ayudarte?",
            "Hola!, Soy Tecx-Bot, Dime tus dudas"]
    ],
    [
        r"(.*)donde subir mi tesis(.*)",
        ["Puedes subir tu tesis en la sección de tesis ubicada en el sitio web de la universidad."]
    ],
    [
        r"(.*)gracias(.*)",
        ["De nada, ¡estoy aquí para ayudarte!"]
    ],
    [
        r"(.*)adios(.*)",
        ["¡Hasta luego! Si tienes más preguntas, no dudes en volver."]
    ],
    [
        r"(.*)qué recursos adicionales puedo utilizar para apoyar mi investigación(.*)",
        ["Además de las bibliotecas y bases de datos académicas, puedes utilizar recursos en línea como artículos científicos, conferencias y videos relacionados con tu área de investigación. También puedes participar en grupos de estudio o discusión en línea para intercambiar ideas y obtener retroalimentación."]
    ]
]

# Inicializar el chatbot
chatbot = Chat(pares, reflections)

# Función principal para ejecutar el chatbot


def generate_quesiton(question):
    response = chatbot.respond(question)
    if response == None:
        response = "No entendi lo que me quisiste decir"
    return response
