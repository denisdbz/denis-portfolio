# Etapa 1: Instala dependências Python e Node
FROM python:3.11-slim AS base

# Evita prompts interativos
ENV DEBIAN_FRONTEND=noninteractive

# Instala dependências do sistema
RUN apt-get update && apt-get install -y \
    curl \
    build-essential \
    git \
    python3-dev \
    libffi-dev \
    && apt-get clean

# Instala Node.js (requerido pro build do frontend e Cypress)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Define diretório de trabalho
WORKDIR /app

# Copia arquivos do projeto
COPY . .

# Instala as dependências Python (ex: Flask)
RUN pip install --no-cache-dir -r requirements.txt

# Instala dependências Node (ex: para buildar frontend)
RUN npm install

# Builda o frontend (caso use frameworks modernos)
RUN npm run build || echo "sem build"

# Porta usada pelo app
EXPOSE 5000

# Comando para rodar o app
CMD ["python", "app.py"]
