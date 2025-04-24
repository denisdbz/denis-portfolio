#!/bin/bash
echo "Iniciando varredura com Nikto..."
nikto -host http://testphp.vulnweb.com -timeout 5
