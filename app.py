from flask import Flask, send_file, request
import subprocess
import os

app = Flask(__name__)

@app.route("/api/exec/<play_id>", methods=["POST"])
def executar_play(play_id):
    caminho = os.path.join("plays", play_id, "run.sh")
    if not os.path.exists(caminho):
        return {"erro": "Play não encontrado."}, 404

    try:
        subprocess.run(["bash", caminho], cwd=os.path.dirname(caminho), check=True)
        return {"mensagem": f"Play {play_id} executado com sucesso."}
    except subprocess.CalledProcessError as e:
        return {"erro": str(e)}, 500

@app.route("/relatorio/<play_id>")
def relatorio(play_id):
    caminho = os.path.join("plays", play_id, "relatorio.html")
    if os.path.exists(caminho):
        return send_file(caminho)
    return "Relatório não encontrado", 404

@app.route("/")
def home():
    return "<h1>API de Execução de Pentest - Denis</h1>"

if __name__ == "__main__":
    app.run(debug=True)
