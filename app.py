from flask import Flask, Response
import subprocess
import time
import json

app = Flask(__name__)

@app.route("/")
def index():
    return "API do Portfólio Técnico Online"

@app.route("/stream/play-01-nmap-recon")
def stream_play_01():
    def generate():
        try:
            process = subprocess.Popen(
                ["bash", "plays/play-01-nmap-recon/run.sh"],
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                bufsize=1
            )

            progress = 0
            yield f"data: {json.dumps({'log': 'Iniciando teste...', 'progress': progress})}\n\n"

            for line in iter(process.stdout.readline, ""):
                line = line.strip()
                progress = min(progress + 10, 100)
                payload = {"log": line, "progress": progress}
                yield f"data: {json.dumps(payload)}\n\n"
                time.sleep(0.3)

            yield f"data: {json.dumps({'log': '✓ Teste finalizado com sucesso.', 'progress': 100})}\n\n"
            yield "event: end\ndata: FIM\n\n"
            process.stdout.close()
            process.wait()

        except Exception as e:
            erro = f"[ERRO] Falha interna: {str(e)}"
            yield f"data: {json.dumps({'log': erro, 'progress': 0})}\n\n"
            yield "event: end\ndata: FIM\n\n"

    return Response(generate(), mimetype="text/event-stream")
