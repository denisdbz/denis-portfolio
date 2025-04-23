# Imagem base um pouco mais completa para evitar erros de dependência
FROM python:3.11

# Evita prompts interativos
ENV DEBIAN_FRONTEND=noninteractive

# Atualiza repositórios e instala ferramentas
RUN apt-get update && \
    apt-get install -y \
    nmap \
    hydra \
    curl \
    wget \
    bash \
    git \
    unzip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Cria diretório da aplicação
WORKDIR /app

# Copia os arquivos do projeto para dentro do container
COPY . .

# Instala as dependências Python
RUN pip install --no-cache-dir -r requirements.txt

# Expõe a porta usada pelo Gunicorn
EXPOSE 8080

# Comando padrão
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "app:app"]
