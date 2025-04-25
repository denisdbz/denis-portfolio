from flask import Flask, jsonify, request
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app)

@app.route("/executar", methods=["POST"])
def executar():
    try:
        play = request.json.get("play")
        if not play:
            return jsonify({"erro": "Play não informado"}), 400
        comando = f"./plays/{play}/run.sh"
        resultado = subprocess.check_output(comando, shell=True, stderr=subprocess.STDOUT, text=True)
        return jsonify({"saida": resultado})
    except subprocess.CalledProcessError as e:
        return jsonify({"erro": e.output}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
