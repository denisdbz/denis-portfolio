from flask import Flask, jsonify, request, send_from_directory, render_template_string
import subprocess
import os

app = Flask(__name__)

@app.route("/")
def home():
    return render_template_string("""
    <h1>Bem-vindo ao Portfólio de Testes</h1>
    <p>Esta API suporta execução real dos testes via POST nos endpoints /playXX</p>
    <ul>
      <li>/play01</li>
      <li>/play02</li>
      <li>/play03</li>
      <li>/play04</li>
      <li>/play05</li>
      <li>/play06</li>
      <li>/play07</li>
    </ul>
    """)

def executar_script(rel_path):
    abs_path = os.path.join(os.getcwd(), rel_path)
    if not os.path.exists(abs_path):
        return jsonify({"erro": f"Script {rel_path} não encontrado"}), 404
    try:
        os.chmod(abs_path, 0o755)  # Garante permissão
        resultado = subprocess.run(["bash", abs_path], capture_output=True, text=True, timeout=60)
        return jsonify({
            "stdout": resultado.stdout,
            "stderr": resultado.stderr,
            "code": resultado.returncode
        })
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

@app.route("/play01", methods=["POST"])
def play01():
    return executar_script("plays/play-01-nmap-recon/run.sh")

@app.route("/play02", methods=["POST"])
def play02():
    return executar_script("plays/play-02-hydra-dvwa/run.sh")

@app.route("/play03", methods=["POST"])
def play03():
    return executar_script("plays/play-03-sqlmap-dvwa/run.sh")

@app.route("/play04", methods=["POST"])
def play04():
    return executar_script("plays/play-04-jmeter-loadtest/run.sh")

@app.route("/play05", methods=["POST"])
def play05():
    return executar_script("plays/play-05-qa-automacao/run.sh")

@app.route("/play06", methods=["POST"])
def play06():
    return executar_script("plays/play-06-carga-bash/run.sh")

@app.route("/play07", methods=["POST"])
def play07():
    return executar_script("plays/play-07-mobile-tests/run.sh")

if __name__ == "__main__":
    app.run(debug=True)
