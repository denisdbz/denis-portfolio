FROM python:3.11-slim

ENV DEBIAN_FRONTEND=noninteractive

# Instala dependências
RUN apt-get update && apt-get install -y \
    bash curl git wget unzip \
    perl libnet-ssleay-perl openssl \
    libauthen-pam-perl libio-pty-perl \
    nmap gnupg ca-certificates jq \
    && git clone https://github.com/sullo/nikto.git /opt/nikto \
    && ln -s /opt/nikto/program/nikto.pl /usr/local/bin/nikto \
    && rm -rf /var/lib/apt/lists/*

# Instala o k6 com segurança
RUN curl -s https://packagecloud.io/install/repositories/loadimpact/k6/script.deb.sh | bash || true \
    && apt-get update && apt-get install -y k6 || true \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

CMD ["python", "app.py"]
