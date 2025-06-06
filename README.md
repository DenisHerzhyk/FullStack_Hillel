# ДЗ #1 Express.js

## 1. Завантажуємо репозиторій та розгортаємо проект

`npm install`

або

`yarn`

_yarn повинен бути встановлений глобально, це можна зробити командой:_

`npm i -g yarn`

## 2. Виконуємо задачі для .js файлів

## 3. Запускаємо тести

`yarn test`

або

`npm test`

## 4. Перевіряємо результат

Якщо **тести не пройдені**

- Аналізуйте результати тестів, ідентифікуйте та виправляйте помилки у коді.

Якщо **тести пройдені**:

1. Зробіть скріншот пройдених тестів та відправте його як доказ виконання завдання.
2. Завантажте ваш проект на GitHub.
3. Надайте пряме посилання на файл (або файли) JavaScript (або TypeScript) у вашому проекті.

## 5. Project structure:
- **responses** folder - contains all responses
  - **articleResponses** - contains all responses for /articles and /articles/:articleId requests
  - **usersResponses** - contains all responses for /users and /users/:userId requests
  - **rootResponse** - contains response for / request
- **middleware** folder contains middleware functionality
  - **articlePermission** - sets permission in post request, if post wasn't involved then throws 403 error
  - **authentication**(unfinished) - expected to authorize titles
  - **errorHandling** - contains middlewares for error status 404 and 500
  - **logger** - will log each response method and response path
  - **rootAccess** - will log once root path accessed
  - **validateUser** - will check for correct input data and give 403 error if invalid
- **middleware** - handle all middleware calls in one function
- **responses** - handle all responses from responses folder
