#!/bin/bash
nmap -sV -oN report.txt 172.20.0.2
xsltproc report.txt -o relatorio.html
