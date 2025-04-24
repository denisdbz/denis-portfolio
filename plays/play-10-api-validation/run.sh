#!/bin/bash
echo "Consultando API JSONPlaceholder..."
curl -s https://jsonplaceholder.typicode.com/posts/1 | jq .
 	
