#!/bin/bash
echo 'Running Nmap...'
nmap -A -T4 127.0.0.1 -oN nmap_scan.txt