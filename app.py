from flask import Flask, request, Response, jsonify
import subprocess, glob, os
from prometheus_client import Counter, generate_latest, CONTENT_TYPE_LATEST

app = Flask(__name__)

# Definindo os plays permitidos
PLAYS_PERMITIDOS = { f"play-{i:02d}" for i in range(1, 23) }

# Métrica de execuções por play
PLAY_COUNTER = Counter('play_executions_total', 'Total de execuções de Plays', ['play'])

@app.route('/')
def home():
    return 'Servidor Flask ativo!'

@app.route('/health')
def health():
    return jsonify(status='ok'), 200

@app.route('/metrics')
def metrics():
    data = generate_latest()
    return Response(data, mimetype=CONTENT_TYPE_LATEST)

@app.route('/executar', methods=['POST'])
def executar():
    dados = request.get_json()
    play = dados.get('play', '').strip()
    if play not in PLAYS_PERMITIDOS:
        return jsonify({'erro': 'Play inválido ou não autorizado.'}), 403

    scripts = glob.glob(f"./plays/{play}-*/run.sh")
    if not scripts:
        return jsonify({'erro': 'Script não encontrado para o Play informado.'}), 404
    script_real = scripts[0]

    def gerar_saida():
        processo = subprocess.Popen(
            ["bash", script_real],
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            universal_newlines=True
        )
        for linha in processo.stdout:
            PLAY_COUNTER.labels(play=play).inc()
            yield f"data: {linha.strip()}\n\n"
        processo.stdout.close()
        processo.wait()

    return Response(gerar_saida(), mimetype='text/event-stream')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port)
