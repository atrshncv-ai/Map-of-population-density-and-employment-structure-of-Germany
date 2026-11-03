# Map of Population Density and Employment Structure of Germany

An interactive analytical map of Germany — a geography coursework/research project built with **Next.js + React + TypeScript**. Combines a choropleth view of population density with embedded employment-structure diagrams for the federal states.

> **Status: experiment** — research/coursework project, not a production service.

## Features

- Interactive SVG/GeoJSON-based map of all 16 federal states (Länder)
- Density shading per Land (population per km²)
- Pie charts on the map for the states with the largest labor resources
- Hover tooltips: population, density, population share, annual growth, sector breakdown
- Top-5 rankings: agriculture, industry, trade/transport/tourism, other services
- Full comparative table for all states
- Summary block: east–west contrasts, density extremes, demographic tendencies

## Data

- `germany-states.json` — state boundaries and statistics used by the app

## Local run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Build: `npm run build && npm run start`.

---

# Карта плотности населения и структуры занятости Германии

Интерактивная аналитическая карта Германии — учебно-исследовательский проект по географии на **Next.js + React + TypeScript**. Сочетает хороплет плотности населения с диаграммами структуры занятости по федеральным землям.

> **Статус: experiment** — исследовательский/учебный проект, не production-сервис.

## Возможности

- Интерактивная SVG/GeoJSON-карта всех 16 федеральных земель
- Заливка плотности населения (чел./км²) по каждой земле
- Круговые диаграммы на карте для земель с крупнейшими трудовыми ресурсами
- Подсказки при наведении: население, плотность, доля, годовой прирост, структура секторов
- Топ-5 рейтинги: сельское хозяйство, промышленность, торговля/транспорт/туризм, прочие услуги
- Сводная сравнительная таблица по всем землям
- Аналитический блок: контрасты восток–запад, экстремумы плотности, демографические тенденции

## Данные

- `germany-states.json` — границы земель и статистика, используемые приложением

## Локальный запуск

```bash
npm install
npm run dev
```

Откройте `http://localhost:3000`. Сборка: `npm run build && npm run start`.

## License / Лицензия

Released under the MIT License. See [LICENSE](LICENSE).
Проект распространяется по лицензии MIT. См. [LICENSE](LICENSE).
