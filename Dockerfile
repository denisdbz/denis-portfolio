# Imagem base com bash + utilitários
FROM python:3.10-slim

# Evita prompts interativos
ENV DEBIAN_FRONTEND=noninteractive

# Instala dependências necessárias
RUN apt-get update && apt-get install -y \
    bash curl jq nikto git k6 \
    && rm -rf /var/lib/apt/lists/*

# Cria diretório do app
WORKDIR /app

# Copia todos os arquivos pro container
COPY . .

# Instala dependências Python
RUN pip install --no-cache-dir -r requirements.txt

# Permissões para execução dos scripts
RUN chmod +x plays/*/run.sh || true

# Porta para a Railway
EXPOSE 5000

# Comando de inicialização
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
