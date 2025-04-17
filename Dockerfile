FROM cypress/included:12.17.4

WORKDIR /app
COPY . .

RUN npm install
CMD ["npx", "cypress", "run"]
