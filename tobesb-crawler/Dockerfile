FROM node:10.19

WORKDIR /apps/

COPY package.json .

# 用到了puppeteer, 忽略掉chromium的下载
RUN npm i --ignore-scripts

COPY ./src ./src

# 这个是不识别单引号? 一定要用双引号才行的.
CMD ["npm", "start"]
