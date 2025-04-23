# Imagem base leve com Python
FROM python:3.11-slim

# Evita prompts interativos durante instalação
ENV DEBIAN_FRONTEND=noninteractive

# Atualiza o sistema e instala dependências
RUN apt-get update && apt-get install -y \
    nmap \
    hydra \
    openjdk-11-jre \
    adb \
    curl \
    wget \
    bash \
    git \
    unzip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Instala o SQLMap
RUN git clone --depth 1 https://github.com/sqlmapproject/sqlmap.git /opt/sqlmap
ENV PATH="/opt/sqlmap:$PATH"

# Cria e define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do projeto para o container
COPY . /app

# Instala as dependências Python
RUN pip install --no-cache-dir -r requirements.txt

# Expõe a porta da aplicação
EXPOSE 8080

# Comando para rodar o app
CMD ["python", "app.py"]
