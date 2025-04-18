#!/bin/bash
nmap -sS -Pn -T4 127.0.0.1 -oN output.txt

echo "<html><head><style>body{background:black;color:white;font-family:monospace;}</style></head><body><h1>Nmap Scan</h1><pre>$(cat output.txt)</pre></body></html>" > index.html
