from flask import Flask, Response, stream_with_context
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app, origins="*", supports_credentials=True)  # CORS liberado para todos

@app.route('/')
def home():
    return 'API de Testes Técnicos — Online'

@app.route('/stream/play-01')
def stream_play_01():
    def generate():
        yield 'Iniciando teste...\n'
        yield 'Executando Nmap no alvo...\n'

        try:
            process = subprocess.Popen(
                ['./automated-tests/plays/play-01-nmap-recon/run.sh'],
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                universal_newlines=True,
                bufsize=1
            )
            for line in process.stdout:
                yield line
            process.wait()
        except Exception as e:
            yield f'[ERRO] {str(e)}\n'

        yield '✔️ Teste finalizado com sucesso.\n'

    return Response(stream_with_context(generate()), mimetype='text/event-stream')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
