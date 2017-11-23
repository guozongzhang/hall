# Statusbar
#
# VERSION    1.0.0

FROM hub.c.163.com/library/node:8.2.1


COPY . /app  
WORKDIR /app

RUN npm install pm2 -g --registry=https://registry.npm.taobao.org

RUN npm install --registry=https://registry.npm.taobao.org

RUN npm run build

EXPOSE 5008

CMD ["npm", "run", "deploy"]