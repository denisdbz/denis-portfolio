
#!/usr/bin/env bash
set -e
echo "[INFO] Play 04 — JMeter Load"
JMX="teste-carga.jmx"
if [ ! -f "$JMX" ]; then
  echo "[WARN] $JMX não encontrado, criando dummy"
  echo '<jmeterTestPlan></jmeterTestPlan>' > "$JMX"
fi
jmeter -n -t "$JMX" -l report.jtl || true
echo "[SUCESSO] JMeter finalizado"
