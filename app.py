from flask import Flask, Response, stream_with_context
from flask_cors import CORS
import subprocess
import os

app = Flask(__name__)
CORS(app, origins="*", supports_credentials=True)

def run_script(script_path):
    process = subprocess.Popen(
        ["/bin/bash", script_path],
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        bufsize=1
    )
    for line in process.stdout:
        yield f"data: {line.strip()}\n\n"
    process.stdout.close()
    process.wait()

@app.route("/")
def home():
    return "API do Portfólio Técnico (stream de testes)."

@app.route("/stream/<play_id>")
def stream(play_id):
    script_path = os.path.join("automated-tests", "plays", play_id, "run.sh")
    if not os.path.isfile(script_path):
        return Response(f"data: [ERRO] Script não encontrado: {script_path}\n\n", mimetype="text/event-stream")
    return Response(stream_with_context(run_script(script_path)), mimetype="text/event-stream")

if __name__ == "__main__":
    app.run(debug=True)
