FROM node:18.13-alpine as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npx nuxt build

FROM node:18.13-alpine
WORKDIR /app
COPY --from=builder /app/.output output

CMD ["node", "output/server/index.mjs"]
