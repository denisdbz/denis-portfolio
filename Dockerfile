# Dockerfile
FROM python:3.11-slim

ENV DEBIAN_FRONTEND=noninteractive

# Instala ferramentas de QA, pentest e dependências de CI/CD
RUN apt-get update && apt-get install -y \
    bash \
    curl \
    git \
    wget \
    unzip \
    perl libnet-ssleay-perl openssl \
    libauthen-pam-perl libio-pty-perl \
    nmap gnupg ca-certificates jq \
    hydra \
    sqlmap \
    xsltproc \
    jmeter \
    nodejs \
    npm \
    libcap2-bin \
  && git clone https://github.com/sullo/nikto.git /opt/nikto \
  && ln -s /opt/nikto/program/nikto.pl /usr/local/bin/nikto \
  # Permite Nmap usar raw sockets sem ser root
  && setcap 'cap_net_raw+eip' /usr/bin/nmap \
  # Instala globalmente Appium e Cypress
  && npm install -g appium cypress \
  && rm -rf /var/lib/apt/lists/*

# Instala k6 via script oficial (com fallback)
RUN curl -s https://packagecloud.io/install/repositories/loadimpact/k6/script.deb.sh | bash || true \
  && apt-get update && apt-get install -y k6 || true \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

# Biblioteca Python do backend
RUN pip install --no-cache-dir -r requirements.txt

CMD ["python", "app.py"]
