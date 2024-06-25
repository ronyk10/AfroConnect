FROM node:20

WORKDIR /AfroConnect

COPY package*.json ./
RUN npm install
COPY . .
# TODO: change to production

CMD npx prisma generate && npx prisma db push && npm run dev