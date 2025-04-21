# Imagem base com Node.js
FROM node:18

# Instala Python 3 e pip
RUN apt-get update && apt-get install -y python3 python3-pip

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências Node.js
COPY package*.json ./

# Instala dependências Node.js
RUN npm install

# Copia o restante da aplicação
COPY . .

# Expõe a porta (ajuste conforme o seu app)
EXPOSE 3000

# Comando padrão para iniciar a aplicação
CMD ["npm", "start"]
