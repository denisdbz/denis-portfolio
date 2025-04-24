FROM debian:bullseye

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update &&     apt-get install -y     bash     curl     jq     git     wget     unzip     perl     libnet-ssleay-perl     openssl     libauthen-pam-perl     libio-pty-perl     nikto     gnupg     ca-certificates &&     curl -s https://packagecloud.io/install/repositories/loadimpact/k6/script.deb.sh | bash &&     apt-get update &&     apt-get install -y k6 &&     rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . .
EXPOSE 5000
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]