FROM python:3.10-slim

ENV DEBIAN_FRONTEND=noninteractive

# Instala dependências básicas primeiro
RUN apt-get update && apt-get install -y \
    bash curl git wget unzip gnupg ca-certificates jq \
    perl libnet-ssleay-perl openssl \
    libauthen-pam-perl libio-pty-perl nmap \
    && rm -rf /var/lib/apt/lists/*

# Instala Nikto via Git
RUN git clone https://github.com/sullo/nikto.git /opt/nikto && \
    ln -s /opt/nikto/program/nikto.pl /usr/local/bin/nikto && \
    chmod +x /usr/local/bin/nikto

# Instala k6 via script (separado para facilitar debug)
RUN curl -s https://packagecloud.io/install/repositories/loadimpact/k6/script.deb.sh | bash && \
    apt-get update && apt-get install -y k6 && \
    rm -rf /var/lib/apt/lists/*

# Cria diretório da aplicação
WORKDIR /app

# Copia o projeto
COPY . .

# Instala dependências do Python
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Expõe a porta da API
EXPOSE 5000

# Inicia a API com Gunicorn
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
