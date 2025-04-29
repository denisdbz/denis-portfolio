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
FROM python:3.11-slim

# 1) Instala ferramentas necessárias
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      curl \
      gnupg2 \
      apt-transport-https \
      ca-certificates \
 && rm -rf /var/lib/apt/lists/*

# 2) Adiciona chave GPG e o repositório oficial do k6
RUN curl -fsSL https://dl.k6.io/key.gpg \
     | gpg --dearmor -o /usr/share/keyrings/k6-archive-keyring.gpg \
 && echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" \
     > /etc/apt/sources.list.d/k6.list

# 3) Atualiza o APT e instala o k6
RUN apt-get update \
 && apt-get install -y --no-install-recommends k6 \
 && rm -rf /var/lib/apt/lists/*

# 4) Resto do seu Dockerfile
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

CMD ["python", "app.py"]

# Biblioteca Python do backend
RUN pip install --no-cache-dir -r requirements.txt

CMD ["python", "app.py"]
