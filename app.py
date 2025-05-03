from flask import Flask, Response, jsonify
from flask_cors import CORS
import subprocess
import os

app = Flask(__name__)
CORS(app)

PLAYS_PERMITIDOS = ['play-01']

@app.route('/')
def home():
    return jsonify({"status": "API rodando!"})

@app.route('/stream/<play_id>')
def stream_logs(play_id):
    if play_id not in PLAYS_PERMITIDOS:
        return jsonify({'erro': 'Play inválido ou não autorizado.'}), 403

    script_path = f"./plays/{play_id}-nmap-recon/run.sh"
    if not os.path.exists(script_path):
        return jsonify({'erro': 'Script não encontrado'}), 404

    def gerar_saida():
        processo = subprocess.Popen(
            ["bash", script_path],
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            universal_newlines=True,
            bufsize=1
        )

        progresso = 0
        for linha in processo.stdout:
            progresso = min(100, progresso + 5)  # Simulação de progresso
            payload = {
                "log": linha.strip(),
                "progress": progresso
            }
            yield f"data: {jsonify(payload).get_data(as_text=True)}\n\n"

        yield "event: end\ndata: done\n\n"

    return Response(gerar_saida(), mimetype='text/event-stream')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
