
# Фломастер

Инструмент для хранения речевых модулей с интеграцией в [Хелпер](https://helper.chrsnv.ru) и Генезис


## Скриншоты

![Главная страница](https://github.com/user-attachments/assets/b4243ec1-85f8-49bc-a4ae-c0f458e0a443)
![Пример РМов](https://github.com/user-attachments/assets/3ce962d3-a189-46fd-97bf-9d412244ae27)
![Пример поиска](https://github.com/user-attachments/assets/824acc2a-683c-4da3-a4fc-ea6a9d332284)

## Развертывание проекта

Для развертывания проекта:
1. Клонируйте репозиторий
```bash
git clone https://github.com/AuthFailed/chat-flomaster.git
```
2. Установите зависимости
```bash
npm install
```
3. Запустите dev сервер Astro
```bash
npm run dev
```

## Переменные
При использовании [Keystatic](https://github.com/Thinkmill/keystatic) в качестве CMS:
- `KEYSTATIC_GITHUB_CLIENT_ID`
- `KEYSTATIC_GITHUB_CLIENT_SECRET`
- `KEYSTATIC_SECRET`
- `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`
заполняются либо вручную, либо автоматически при установке Keystatic

## Авторы

- [Роман Чурсанов](https://www.github.com/AuthFailed) - Техническая часть, написание РМов

