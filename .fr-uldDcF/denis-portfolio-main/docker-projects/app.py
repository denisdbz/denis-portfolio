from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import os

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return 'API do Portfólio — Online!'

@app.route('/<play>', methods=['POST'])
def executar_play(play):
    script_path = f"./plays/{play}/run.sh"
    
    if not os.path.exists(script_path):
        return jsonify({"erro": f"Script não encontrado para '{play}'"}), 404
    
    try:
        result = subprocess.run(
            ['bash', script_path],
            capture_output=True,
            text=True,
            timeout=60
        )
        return jsonify({
            "stdout": result.stdout,
            "stderr": result.stderr,
            "code": result.returncode
        })
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)