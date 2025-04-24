from flask import Flask, jsonify, request, send_from_directory, render_template
import subprocess
import os

app = Flask(__name__)

# Página inicial
@app.route("/")
def home():
    return render_template("index.html")

# Servir o HTML do Play
@app.route("/play/<play_id>")
def serve_play_page(play_id):
    return send_from_directory(f"plays/{play_id}", "index.html")

# Executar o teste (run.sh)
@app.route("/api/exec/<play_id>", methods=["POST"])
def executar_play(play_id):
    print(f"Recebendo requisição POST para play: {play_id}")
    caminho = os.path.abspath(os.path.join("plays", play_id, "run.sh"))
    print(f"Procurando script no caminho: {caminho}")

    os.environ['PATH'] += ":/usr/local/bin"

    if not os.path.exists(caminho):
        return jsonify({"erro": "Script não encontrado"}), 404

    try:
        resultado = subprocess.run(["bash", caminho], capture_output=True, text=True, timeout=60)
        return jsonify({
            "stdout": resultado.stdout,
            "stderr": resultado.stderr,
            "code": resultado.returncode
        })
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

# Rodar o app
if __name__ == "__main__":
    app.run(debug=True)
