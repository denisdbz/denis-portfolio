# 1) Base Python com ferramentas de QA/Pentest
FROM python:3.11-slim

ENV DEBIAN_FRONTEND=noninteractive
ENV PORT=8080

RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      bash curl gnupg2 apt-transport-https ca-certificates \
      git wget unzip perl libnet-ssleay-perl openssl \
      libauthen-pam-perl libio-pty-perl nmap jq hydra sqlmap xsltproc \
      jmeter nodejs npm libcap2-bin \
 && git clone https://github.com/sullo/nikto.git /opt/nikto \
 && ln -s /opt/nikto/program/nikto.pl /usr/local/bin/nikto \
 && setcap 'cap_net_raw+eip' /usr/bin/nmap \
 && npm install -g appium cypress \
 && rm -rf /var/lib/apt/lists/*

# 2) Adiciona repositório oficial do k6 e instala
RUN curl -fsSL https://dl.k6.io/key.gpg \
     | gpg --dearmor -o /usr/share/keyrings/k6-archive-keyring.gpg \
 && echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" \
     > /etc/apt/sources.list.d/k6.list \
 && apt-get update \
 && apt-get install -y --no-install-recommends k6 \
 && rm -rf /var/lib/apt/lists/*

# 3) Instala dependências Python
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 4) Copia o resto do código e expõe a porta
COPY . .
EXPOSE 8080

# 5) Arranque com Gunicorn escutando em 0.0.0.0:8080
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:8080", "--workers", "2"]