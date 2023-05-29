from flask import Flask, request, jsonify
# import bot
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Ruta para la consulta
@app.route('/', methods=['POST'])
def realizar_consulta():
    # Obtener el cuerpo de la solicitud
    data = request.json
    # Ejemplo de respuesta
    
    consulta = data["body"]["consulta"]

    print(consulta)
    # respuesta = bot.generar_pregunta()


    # Devolver la respuesta en formato JSON
    return "xd"

# CORS(app)
if __name__ == '__main__':
    app.run()