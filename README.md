# Docker Compose

предварительно отредактировать файл конфигурации .env

## Пересобрать образ
docker-compose build

## Запустить контейнер
docker-compose up -d



# Dockerfile
Ручная сборка контейнера при помощи Dockerfile

## Собрать образ
docker build --build-arg APP_DIR=var/app -t ismartypro/node-app:v1 .

## Просмотреть список доступных образов
docker images

## Запустить контейнер из образа
docker run -p 8080:8080 -d --name node-app ismartypro/node-app:v1


# Полезняшки

Использование команды CURL для загрузки файлов на сервер с авторизацией по токену, а так же замером времени.
```
curl -i -w "%{time_total}\n" -X POST -H "iToken: TLq8i86SY9TFLLfnVuhVJy" -F "file=@C:\Users\Ilias.Aidar\Downloads\iTunes64Setup.exe" http://localhost:8080/backup/iFolder
```