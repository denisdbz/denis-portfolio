from flask import Flask, jsonify, request
from flask_cors import CORS
import subprocess
import os

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return jsonify({"status": "API no ar!", "mensagem": "Use os endpoints /play01 a /play07 via POST para executar os testes."})

def executar_script(rel_path):
    abs_path = os.path.join(os.getcwd(), rel_path)
    if not os.path.exists(abs_path):
        return jsonify({"erro": f"Script {rel_path} não encontrado"}), 404
    try:
        os.chmod(abs_path, 0o755)
        resultado = subprocess.run(["bash", abs_path], capture_output=True, text=True, timeout=60)
        return jsonify({
            "stdout": resultado.stdout,
            "stderr": resultado.stderr,
            "code": resultado.returncode
        })
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

@app.route("/<play>", methods=["POST"])
def play(play):
    path = f"plays/{play}/run.sh"
    return executar_script(path)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
