FROM python:3.10-slim

# Instala dependências essenciais e o nmap
RUN apt-get update && apt-get install -y \
    nmap \
    curl \
    bash \
 && apt-get clean

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
