# Map of Population Density and Employment Structure of Germany

This project is an interactive analytical map of Germany built with Next.js. It combines a choropleth view of population density with embedded employment-structure diagrams for the federal states, making the application useful for geography coursework, regional analysis, and data-driven presentations.

Reference artifact: [https://claude.ai/public/artifacts/1240a17a-1417-4335-9669-e08b57e1e5e8](https://claude.ai/public/artifacts/1240a17a-1417-4335-9669-e08b57e1e5e8)

## What the app includes

- An interactive SVG/GeoJSON-based map of all 16 federal states of Germany
- Density shading for each Land based on population per square kilometer
- Small pie charts placed directly on the map for lands with the largest labor resources
- Hover tooltips with population, density, population share, annual growth, and sector breakdown
- Top-5 rankings for agriculture
- Top-5 rankings for industry
- Top-5 rankings for trade, transport, and tourism
- Top-5 rankings for other services
- A full comparative table for all states
- A summary block focused on east-west contrasts, density extremes, and demographic tendencies

## Data model used in the interface

For each federal state, the app stores and calculates:

- population in 2010 and 2019
- area
- labor resources
- employment by major sectors
- population density
- population share within Germany
- annualized population growth rate
- an east/west marker for territorial comparison

The frontend then combines these values with `public/germany-states.geojson` to generate the interactive map.

## Tech stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui + Radix UI
- Recharts
- GeoJSON-driven SVG rendering
- Prisma + SQLite scaffold included for future backend expansion

## Main files

- `src/app/page.tsx` contains the full analytical application
- `public/germany-states.geojson` contains the boundaries used to draw the map
- `germany-states.json` provides the source regional dataset included in the repository
- `src/app/layout.tsx` contains project metadata
- `prisma/schema.prisma` and `src/app/api/route.ts` are backend scaffolding and are not required for the current frontend behavior

## Local run

1. Install dependencies:

```bash
npm install
```

2. Create a local environment file:

```bash
cp .env.example .env.local
```

3. Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

## Available scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run db:push
npm run db:generate
npm run db:migrate
npm run db:reset
```

## Notes

- The current product is frontend-driven and works without a live backend
- The Prisma schema and sample API route are included as a base for future expansion
- Local SQLite files and large intermediate materials from the `upload` directory are excluded from Git history in this repository import
