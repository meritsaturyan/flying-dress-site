# Flying Dress Dubai — RU/EN/AR (React + Node)

## Что внутри
- **client/** — React + Vite + React Router + i18next (RU/EN/AR, Arabic RTL)
- **server/** — Node.js + Express API (контент + форма заявки)

## Быстрый старт (локально)
1) Установи зависимости (в корне проекта):
```bash
npm install
```

2) Запусти в режиме разработки (клиент + сервер):
```bash
npm run dev
```

- Frontend: http://localhost:5173  
- Backend:  http://localhost:5174  

## Где менять контент (пакеты/галереи/локации/платья/отзывы)
- `server/content/content.json`

## Где менять тексты (переводы)
- `client/src/i18n/locales/ru.json`
- `client/src/i18n/locales/en.json`
- `client/src/i18n/locales/ar.json`

## WhatsApp номер
По умолчанию стоит тестовый. Поменяй в:
- `server/.env.example` → создай `server/.env` и впиши `WHATSAPP_NUMBER=971XXXXXXXXX`

## Production (сборка)
```bash
npm run build
npm run start
```
