FROM python:3.11-slim

# Evita prompts interativos
ENV DEBIAN_FRONTEND=noninteractive

# Instala dependências do sistema
RUN apt-get update && apt-get install -y \
    nmap \
    hydra \
    openjdk-11-jre-headless \
    adb \
    curl \
    wget \
    bash \
    git \
    unzip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Instala dependências Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia os arquivos do projeto
COPY . /app
WORKDIR /app

# Expõe a porta do Gunicorn
EXPOSE 8080

# Comando para rodar o app com Gunicorn
CMD ["gunicorn", "-b", "0.0.0.0:8080", "app:app"]
