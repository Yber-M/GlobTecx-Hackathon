from flask import Flask, request, abort
import bot


def cors_middleware(app):
    @app.after_request
    def add_cors_headers(response):
        # Permitir solicitudes de todos los orígenes (puedes ajustar esto según tus necesidades)
        response.headers['Access-Control-Allow-Origin'] = '*'
        # Permitir el encabezado Content-Type en las solicitudes
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        # Permitir los métodos GET, POST y OPTIONS
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'

        return response


# -------------------------------------
app = Flask(__name__)
cors_middleware(app)


# -------------------------------------
@app.route("/", methods=["POST"])
def bot_route():
    try:
        data = request.json
        question = data["question"]
        response = bot.generate_quesiton(question)
        return {
            "name": "tecx-bot",
            "message": response
        }
    except:
        abort(500)


if __name__ == "__main__":
    app.run(port=5001)
