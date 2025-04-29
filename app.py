from flask import Flask, jsonify, request
from flask_cors import CORS
import subprocess
import os

app = Flask(__name__)
CORS(app)

# Lista segura de plays permitidos (whitelist)
PLAYS_PERMITIDOS = {
    f"play-{str(i).zfill(2)}" for i in range(1, 16)
}

@app.route("/executar", methods=["POST"])
def executar():
    try:
        play = request.json.get("play")
        if not play:
            return jsonify({"erro": "Play não informado."}), 400

        # Verifica se o play é permitido
        if play not in PLAYS_PERMITIDOS:
            return jsonify({"erro": "Play inválido ou não autorizado."}), 403

        projeto_root = os.path.dirname(os.path.abspath(__file__))
        # Monta o caminho para o run.sh correto
        script_path = os.path.join(projeto_root, "plays", f"{play}-nmap-recon", "run.sh")

        if not os.path.isfile(script_path):
            return jsonify({"erro": f"Script {script_path} não encontrado."}), 404

        resultado = subprocess.check_output(
            f"bash {script_path}",
            shell=True,
            stderr=subprocess.STDOUT,
            text=True,
            timeout=120
        )

        return jsonify({"saida": resultado})

    except subprocess.CalledProcessError as e:
        return jsonify({"erro": e.output}), 500
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
