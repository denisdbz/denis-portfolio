from flask import Flask, jsonify, request
from flask_cors import CORS
import subprocess
import os

app = Flask(__name__)
CORS(app)

# POST /executar  { "play": "play-01-nmap-recon" }
@app.route("/executar", methods=["POST"])
def executar():
    try:
        play = request.json.get("play")
        if not play:
            return jsonify({"erro": "Play não informado"}), 400

        # caminho absoluto do run.sh
        projeto_root = os.path.dirname(os.path.abspath(__file__))
        script_path = os.path.join(projeto_root, "plays", play, "run.sh")

        # executa via bash para evitar problemas de permissão shebang
        resultado = subprocess.check_output(
            f"bash {script_path}",
            shell=True,
            stderr=subprocess.STDOUT,
            text=True,
            timeout=120          # evita travar caso o script demore
        )

        return jsonify({"saida": resultado})

    except subprocess.CalledProcessError as e:
        # erro de execução do script
        return jsonify({"erro": e.output}), 500
    except FileNotFoundError:
        # run.sh não encontrado
        return jsonify({"erro": f"Script {script_path} não encontrado"}), 404
    except Exception as e:
        # fallback
        return jsonify({"erro": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
