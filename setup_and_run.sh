#!/bin/bash

# Ativa o ambiente virtual
echo "Ativando o ambiente virtual..."
source venv/bin/activate

# Instalar o Flask se não estiver instalado
echo "Instalando Flask..."
pip install flask

# Verificar se o Flask foi instalado corretamente
echo "Verificando instalação do Flask..."
pip show flask

# Instalar o Gunicorn se não estiver instalado
echo "Instalando Gunicorn..."
pip install gunicorn

# Verificar se o Gunicorn foi instalado corretamente
echo "Verificando instalação do Gunicorn..."
pip show gunicorn

# Iniciar o Gunicorn com a aplicação Flask
echo "Iniciando o servidor com Gunicorn..."
gunicorn -w 4 -b 0.0.0.0:5000 app:app
