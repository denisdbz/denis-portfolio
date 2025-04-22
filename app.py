from flask import (
    Flask,
    send_from_directory,
    jsonify,
    render_template_string,
    request,
)
import subprocess
import os
from pathlib import Path

app = Flask(__name__, static_folder=".", static_url_path="")

# -------------------------------------------------
# Helpers
# -------------------------------------------------
PLAYS_DIR = Path(__file__).parent / "plays"
TEMPLATE_404 = """
<!DOCTYPE html><html lang="pt-BR"><head>
<meta charset="utf-8"><title>404 – Não encontrado</title>
<link rel="stylesheet" href="/style.css">
<style>body{display:flex;align-items:center;justify-content:center;height:100vh;color:#0f0;text-align:center}</style>
</head><body><div>
<h1>404 – Oops!</h1>
<p>Não encontrei o recurso requisitado.</p>
<p><a class="btn-link" href="/">⬅ Voltar ao início</a></p>
</div></body></html>
"""


def play_path(play_id: str) -> Path:
    """Retorna o path absoluto da pasta do play."""
    return PLAYS_DIR / play_id


# -------------------------------------------------
# Rotas
# -------------------------------------------------
@app.route("/")
def home():
    # Servimos o index da raiz como arquivo estático
    return send_from_directory(".", "index.html")


@app.route("/plays/<play_id>/")
def serve_play(play_id):
    """Entrega o index.html dentro da pasta play."""
    p_dir = play_path(play_id)
    if (p_dir / "index.html").exists():
        return send_from_directory(p_dir, "index.html")
    return render_template_string(TEMPLATE_404), 404


@app.route("/api/exec/<play_id>", methods=["POST"])
def exec_play(play_id):
    """
    Executa o run.sh dentro da pasta do play e devolve saída JSON.
    Mesmo que seja mock / demo, respeita timeout e retorno.
    """
    run_script = play_path(play_id) / "run.sh"

    # Proteção simples – evita execução fora dos plays
    if not run_script.exists():
        return jsonify({"erro": "Script não encontrado"}), 404

    try:
        result = subprocess.run(
            ["bash", str(run_script)],
            capture_output=True,
            text=True,
            timeout=90,
            env={**os.environ, "PATH": os.environ.get("PATH", "") + ":/usr/local/bin"},
        )
        return jsonify(
            {
                "stdout": result.stdout,
                "stderr": result.stderr,
                "code": result.returncode,
                "mensagem": "Execução concluída" if result.returncode == 0 else "",
            }
        )
    except subprocess.TimeoutExpired:
        return jsonify({"erro": "Tempo de execução excedido"}), 500
    except Exception as exc:
        return jsonify({"erro": str(exc)}), 500


# -------------------------------------------------
# Static fallback – permite servir CSS, JS, imgs, etc.
# -------------------------------------------------
@app.route("/<path:filename>")
def static_files(filename):
    file_path = Path(filename)
    if file_path.exists():
        return send_from_directory(".", filename)
    return render_template_string(TEMPLATE_404), 404


# -------------------------------------------------
# Run
# -------------------------------------------------
if __name__ == "__main__":
    # Para produção, use gunicorn/uwsgi; aqui é só dev
    app.run(debug=True, host="0.0.0.0", port=int(os.getenv("PORT", 5000)))
