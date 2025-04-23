FROM python:3.11-slim

ENV DEBIAN_FRONTEND=noninteractive

# Adiciona utilitários essenciais para debugging
RUN apt-get update && \
    apt-get install -y gnupg2 lsb-release software-properties-common

# Instala os pacotes necessários, exceto os que dão erro (comenta para testar)
RUN apt-get update && \
    apt-get install -y \
    nmap \
    hydra \
    openjdk-11-jre-headless \
    curl \
    wget \
    bash \
    git \
    unzip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# ADB pode dar erro, vamos deixar comentado por enquanto:
# RUN apt-get install -y adb

# Instala dependências Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app
WORKDIR /app

EXPOSE 8080

CMD ["gunicorn", "-b", "0.0.0.0:8080", "app:app"]
