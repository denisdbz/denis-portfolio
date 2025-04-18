#!/bin/bash
echo "<h2>Scan Nmap</h2><pre>$(nmap -T4 -A 127.0.0.1)</pre>" > report.html
