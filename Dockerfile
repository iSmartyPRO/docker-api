FROM node:12

# Папка приложения
ARG APP_DIR=/home/node/app/
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

# Установка зависимостей
COPY ./app/package*.json ./
RUN npm install
RUN apt-get update -y && apt-get install smbclient -y && rm -rf /var/lib/apt/lists/*

# Копирование файлов проекта
COPY ./app ./

# Уведомление о порте, который будет прослушивать работающее приложение
EXPOSE ${APP_PORT}

# Запуск проекта
CMD ["node", "index.js"]




