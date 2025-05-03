from flask import Flask, request, Response, jsonify
from flask_cors import CORS   # <— import

app = Flask(__name__)
CORS(app)                     # <— habilita CORS para todas as rotas

# Lista de plays permitidos
PLAYS_PERMITIDOS = {
    f"play-{str(i).zfill(2)}" for i in range(1, 16)
}

# Rota principal para checar se o servidor está no ar
@app.route('/')
def home():
    return 'Servidor Flask ativo!'

# Rota para execução de testes (Play)
@app.route('/executar', methods=['POST'])
def executar():
    dados = request.get_json()
    play = dados.get('play')

    if not play or play not in PLAYS_PERMITIDOS:
        return jsonify({'erro': 'Play inválido ou não autorizado.'}), 403

    caminho_script = f"./plays/{play}-*/run.sh"
    script_real = None

    # Localiza o run.sh correto baseado no wildcard
    for path in os.listdir('./plays'):
        if path.startswith(play):
            script_real = f"./plays/{path}/run.sh"
            break

    if not script_real or not os.path.isfile(script_real):
        return jsonify({'erro': 'Script não encontrado para o Play informado.'}), 404

    def gerar_saida():
        processo = subprocess.Popen(
            ["bash", script_real],
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            universal_newlines=True
        )

        for linha in processo.stdout:
            yield f"data: {linha.strip()}\n\n"

        processo.stdout.close()
        processo.wait()

    return Response(gerar_saida(), mimetype='text/event-stream')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
