FROM node:16.13-alpine3.13 as node

WORKDIR /app

COPY /package.json /app/package.json
COPY /package-lock.json /app/package-lock.json

COPY . .

RUN npm install \
    && npm install -g @angular/cli

RUN ng b -c production

FROM nginx

COPY --from=node /app/dist/contas-ui/ /usr/share/nginx/html/
COPY /nginx-custom.conf /etc/nginx/conf.d/default.conf

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'