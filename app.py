from flask import Flask, jsonify, request
from flask_cors import CORS
import subprocess
import os

app = Flask(__name__)
CORS(app)  # Habilita CORS em todas as rotas

def executar_comando(script_path):
    try:
        resultado = subprocess.run(['bash', script_path], capture_output=True, text=True)
        return {
            "code": resultado.returncode,
            "stdout": resultado.stdout,
            "stderr": resultado.stderr
        }
    except Exception as e:
        return {
            "code": -1,
            "stdout": "",
            "stderr": str(e)
        }

@app.route('/')
def index():
    return '''
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
    '''

@app.route('/play01', methods=['POST'])
def play01():
    return jsonify(executar_comando('./plays/play-01-nmap-recon/run.sh'))

@app.route('/play02', methods=['POST'])
def play02():
    return jsonify(executar_comando('./plays/play-02-hydra-dvwa/run.sh'))

@app.route('/play03', methods=['POST'])
def play03():
    return jsonify(executar_comando('./plays/play-03-sqlmap-dvwa/run.sh'))

@app.route('/play04', methods=['POST'])
def play04():
    return jsonify(executar_comando('./plays/play-04-jmeter/run.sh'))

@app.route('/play05', methods=['POST'])
def play05():
    return jsonify(executar_comando('./plays/play-05-qa-automacao/run.sh'))

@app.route('/play06', methods=['POST'])
def play06():
    return jsonify(executar_comando('./plays/play-06-bash-carga/run.sh'))

@app.route('/play07', methods=['POST'])
def play07():
    return jsonify(executar_comando('./plays/play-07-mobile/run.sh'))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
