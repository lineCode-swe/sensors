FROM node:16.3

ENV NODE_ENV="production"

WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY main.js main.js
RUN ["npm", "ci"]

EXPOSE 8082

ENTRYPOINT ["node", "main.js"]
