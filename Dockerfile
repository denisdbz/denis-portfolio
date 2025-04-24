FROM python:3.10-slim

ENV DEBIAN_FRONTEND=noninteractive

# Instala dependências
RUN apt-get update && apt-get install -y \
    bash curl git wget unzip gnupg ca-certificates jq \
    perl libnet-ssleay-perl openssl \
    libauthen-pam-perl libio-pty-perl nmap \
    && rm -rf /var/lib/apt/lists/*

# Instala Nikto
RUN git clone https://github.com/sullo/nikto.git /opt/nikto && \
    ln -s /opt/nikto/program/nikto.pl /usr/local/bin/nikto && \
    chmod +x /usr/local/bin/nikto

# Instala k6 manualmente
RUN curl -L https://github.com/grafana/k6/releases/download/v0.47.0/k6-v0.47.0-linux-amd64.tar.gz | tar -xz && \
    mv k6-v0.47.0-linux-amd64/k6 /usr/local/bin/ && \
    chmod +x /usr/local/bin/k6 && \
    rm -rf k6-v0.47.0-linux-amd64

# Cria diretório da aplicação
WORKDIR /app

# Copia arquivos do projeto
COPY . .

# Instala dependências Python
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
