
#!/usr/bin/env bash
set -e
echo "[INFO] Play 06 — Carga Bash"
for i in $(seq 1 50); do
  curl -s https://httpbin.org/get > /dev/null &
done
wait
echo "[SUCESSO] Carga concluída"
