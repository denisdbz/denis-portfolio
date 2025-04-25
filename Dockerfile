FROM python:3.10-slim

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    bash curl git wget unzip \
    perl libnet-ssleay-perl openssl \
    libauthen-pam-perl libio-pty-perl \
    nmap gnupg ca-certificates jq \
    && git clone https://github.com/sullo/nikto.git /opt/nikto \
    && ln -s /opt/nikto/program/nikto.pl /usr/local/bin/nikto \
    && curl -s https://packagecloud.io/install/repositories/loadimpact/k6/script.deb.sh | bash \
    && apt-get update && apt-get install -y k6 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["python", "app.py"]
