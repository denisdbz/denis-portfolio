from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import os

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return jsonify({"message": "API Flask do portfólio está online! 🚀 Use rotas como /play01, /play02, etc."})

@app.route("/<play>", methods=["POST"])
def executar_script(play):
    script_path = os.path.join("plays", f"{play}", "run.sh")

    if not os.path.isfile(script_path):
        return jsonify({"code": 1, "stdout": "", "stderr": f"Script não encontrado: {script_path}"}), 404

    try:
        result = subprocess.run(["bash", script_path], capture_output=True, text=True, timeout=60)
        return jsonify({
            "code": result.returncode,
            "stdout": result.stdout,
            "stderr": result.stderr
        })
    except subprocess.TimeoutExpired:
        return jsonify({
            "code": -1,
            "stdout": "",
            "stderr": "Tempo de execução excedido"
        })
