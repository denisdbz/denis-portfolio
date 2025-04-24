#!/usr/bin/env bash
set -e

declare -a files=(
  nmap_scan.png
  hydra_login.png
  sqlmap_dvwa.png
  jmeter_test.png
  qa_auto.png
  bash_load.png
  mobile_adb.png
)

for f in "${files[@]}"; do
  if [[ ! -f "assets/img/$f" ]]; then
    echo "Criando placeholder $f"
    curl -sL "https://placehold.co/800x450/000000/00ff00?text=Evidência" -o "assets/img/$f"
  else
    echo "$f já existe, pulando."
  fi
done

echo "Placeholders prontos em assets/img/"
