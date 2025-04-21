from flask import Flask, send_file, request
import subprocess
import os

app = Flask(__name__)

@app.route("/api/exec/<play_id>", methods=["POST"])
def executar_play(play_id):
    print(f"Recebendo requisição POST para play: {play_id}")  # Adicionando log
    caminho = os.path.join("plays", play_id, "run.sh")
    print(f"Procurando script no caminho: {caminho}")

    if not os.path.exists(caminho):
        print(f"Play {play_id} não encontrado")
        return {"erro": "Play não encontrado."}, 404

    try:
        subprocess.run(["bash", caminho], cwd=os.path.dirname(caminho), check=True)
        print(f"Play {play_id} executado com sucesso.")
        return {"mensagem": f"Play {play_id} executado com sucesso."}
    except subprocess.CalledProcessError as e:
        print(f"Erro ao executar o play {play_id}: {str(e)}")
        return {"erro": str(e)}, 500

@app.route("/relatorio/<play_id>")
def relatorio(play_id):
    caminho = os.path.join("plays", play_id, "relatorio.html")
    print(f"Procurando relatório em: {caminho}")  # Log para depuração
    if os.path.exists(caminho):
        return send_file(caminho)
    return "Relatório não encontrado", 404

@app.route("/")
def home():
    return "<h1>API de Execução de Pentest - Denis</h1>"

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)  # Permitindo acesso externo (host='0.0.0.0')
