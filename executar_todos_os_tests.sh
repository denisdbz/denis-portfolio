#!/bin/bash

echo "[*] Executando todos os plays..."

# Play 01 — Nmap Recon
if [ -d "plays/play-01-nmap-recon" ]; then
  cd plays/play-01-nmap-recon
  ./run.sh
  cd ../..
else
  echo "[!] play-01-nmap-recon não encontrado!"
fi

# Play 02 — Hydra vs DVWA
if [ -d "plays/play-02-hydra-dvwa" ]; then
  cd plays/play-02-hydra-dvwa
  ./run.sh
  cd ../..
else
  echo "[!] play-02-hydra-dvwa não encontrado!"
fi

# Play 03 — SQLMap vs DVWA
if [ -d "plays/play-03-sqlmap-dvwa" ]; then
  cd plays/play-03-sqlmap-dvwa
  ./run.sh
  cd ../..
else
  echo "[!] play-03-sqlmap-dvwa não encontrado!"
fi

echo "[*] Todos os testes executados."
