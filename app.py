from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app)

@app.route('/<play>', methods=['POST'])
def executar_play(play):
    try:
        resultado = subprocess.run(
            ["bash", f"./plays/play-0{play[-2:]}/run.sh"],
            capture_output=True, text=True
        )
        return jsonify({
            "code": resultado.returncode,
            "stdout": resultado.stdout,
            "stderr": resultado.stderr
        })
    except Exception as e:
        return jsonify({"code": 1, "stdout": "", "stderr": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
