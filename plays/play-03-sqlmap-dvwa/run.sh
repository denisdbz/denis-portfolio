#!/bin/bash
sqlmap -u "http://127.0.0.1/dvwa/vulnerabilities/sqli/?id=1&Submit=Submit" --cookie="security=low; PHPSESSID=123" --batch --output-dir=./sqlmap-output > output.txt

echo "<html><head><style>body{background:black;color:white;font-family:monospace;}</style></head><body><h1>SQLMap Report</h1><pre>$(cat output.txt)</pre></body></html>" > index.html
