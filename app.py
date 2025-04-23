from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import os

app = Flask(__name__)
CORS(app)

@app.route('/<play>', methods=['POST'])
def executar_play(play):
    script_path = f"./plays/play-{play[-2:]}/run.sh"
    if not os.path.exists(script_path):
        return jsonify({"code": 1, "stdout": "", "stderr": f"Script {script_path} não encontrado."}), 404
    try:
        resultado = subprocess.run(
            ["bash", script_path],
            capture_output=True, text=True
        )
        return jsonify({
            "code": resultado.returncode,
            "stdout": resultado.stdout,
            "stderr": resultado.stderr
        })
    except Exception as e:
        return jsonify({"code": 1, "stdout": "", "stderr": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
