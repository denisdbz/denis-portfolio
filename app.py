from flask import Flask, Response, stream_with_context, request
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app)  # Libera todas as origens (temporário, cuidado em produção)

@app.route('/')
def index():
    return 'API online. Use /stream/<play_id> para execuções.'

@app.route('/stream/<play_id>')
def stream_logs(play_id):
    def generate():
        process = subprocess.Popen(
            ['./automated-tests/plays/play-01-nmap-recon/run.sh'],
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            universal_newlines=True,
            bufsize=1
        )

        progress = 0
        for line in process.stdout:
            progress = min(progress + 5, 100)
            yield f'data: {{"log": "{line.strip()}", "progress": {progress}}}\n\n'

        yield 'event: end\ndata: {}\n\n'

    return Response(stream_with_context(generate()), mimetype='text/event-stream')

if __name__ == '__main__':
    app.run(debug=True)
