from flask import Flask, request, Response, jsonify
import subprocess, os, glob

app = Flask(__name__)

PLAYS_PERMITIDOS = { f"play-{i:02d}" for i in range(1,16) }

@app.route('/')
def home():
    return 'Servidor Flask ativo!'

@app.route('/health')
def health():
    return jsonify(status='ok'), 200

@app.route('/executar', methods=['POST'])
def executar():
    dados = request.get_json()
    play = dados.get('play', '').strip()
    if play not in PLAYS_PERMITIDOS:
        return jsonify({'erro': 'Play inválido ou não autorizado.'}), 403

    # localiza script via glob
    caminhos = glob.glob(f"./plays/{play}-*/run.sh")
    if not caminhos:
        return jsonify({'erro': 'Script não encontrado para o Play informado.'}), 404
    script_real = caminhos[0]

    def gerar_saida():
        processo = subprocess.Popen(
            ["bash", script_real],
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True
        )
        for linha in processo.stdout:
            yield linha
        processo.stdout.close()
        processo.wait()

    return Response(gerar_saida(), mimetype='text/event-stream')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port)