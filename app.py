from flask import Flask, Response, stream_with_context
from flask_cors import CORS
import subprocess
import time

app = Flask(__name__)
CORS(app, origins=["https://denisdbz.github.io"])  # Libera apenas o GitHub Pages

@app.route('/')
def home():
    return 'API do Portfólio Técnico do Denis — Online.'

@app.route('/stream/<play_id>')
def stream(play_id):
    def generate():
        yield f'data: {{"log":"Iniciando teste...\n", "progress":0}}\n\n'
        try:
            # Executa o script correspondente
            process = subprocess.Popen(
                ['./run.sh', play_id],
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True
            )

            progress = 10
            for line in iter(process.stdout.readline, ''):
                if line:
                    time.sleep(0.3)
                    progress = min(progress + 3, 95)
                    payload = {
                        "log": line.rstrip(),
                        "progress": progress
                    }
                    yield f'data: {payload.__str__()}\n\n'

            process.stdout.close()
            process.wait()
            yield 'event: end\ndata: {}\n\n'

        except Exception as e:
            erro = f'[ERRO] {str(e)}\n'
            yield f'data: {{"log":"{erro}", "progress":0}}\n\n'
            yield 'event: end\ndata: {}\n\n'

    return Response(stream_with_context(generate()), content_type='text/event-stream')

if __name__ == '__main__':
    app.run(debug=True)
