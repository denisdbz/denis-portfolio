#!/bin/bash
cd api-tests
newman run colecao.postman_collection.json -e ambiente.postman_environment.json
