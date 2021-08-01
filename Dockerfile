FROM NODE:16.3

WORKDIR /app
COPY package*.json ./
RUN ["npm", "ci"]

EXPOSE 8081