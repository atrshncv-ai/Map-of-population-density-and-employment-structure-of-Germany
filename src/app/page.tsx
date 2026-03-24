'use client'

import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { Separator } from '@/components/ui/separator'

// ============================================
// GERMANY STATES DATA
// ============================================

interface StateData {
  id: string
  name: string
  nameRu: string
  population2010: number
  population2019: number
  area: number
  isEastern: boolean
  agriculture: number
  industry: number
  tradeTransportTourism: number
  otherServices: number
  laborResources: number
}

const stateData: Record<string, StateData> = {
  'Baden-Württemberg': {
    id: 'baden-wurttemberg',
    name: 'Baden-Württemberg',
    nameRu: 'Баден-Вюртемберг',
    population2010: 10650,
    population2019: 11069,
    area: 35751.6,
    isEastern: false,
    agriculture: 56,
    industry: 2084,
    tradeTransportTourism: 1404,
    otherServices: 2443,
    laborResources: 5987
  },
  'Bayern': {
    id: 'bayern',
    name: 'Bayern',
    nameRu: 'Бавария',
    population2010: 12338,
    population2019: 13076,
    area: 70549.3,
    isEastern: false,
    agriculture: 107,
    industry: 2210,
    tradeTransportTourism: 1737,
    otherServices: 3021,
    laborResources: 7075
  },
  'Berlin': {
    id: 'berlin',
    name: 'Berlin',
    nameRu: 'Берлин',
    population2010: 3449,
    population2019: 3644,
    area: 891.7,
    isEastern: true,
    agriculture: 0,
    industry: 258,
    tradeTransportTourism: 524,
    otherServices: 1083,
    laborResources: 1865
  },
  'Brandenburg': {
    id: 'brandenburg',
    name: 'Brandenburg',
    nameRu: 'Бранденбург',
    population2010: 2511,
    population2019: 2511,
    area: 29476.7,
    isEastern: true,
    agriculture: 25,
    industry: 277,
    tradeTransportTourism: 312,
    otherServices: 631,
    laborResources: 1245
  },
  'Bremen': {
    id: 'bremen',
    name: 'Bremen',
    nameRu: 'Бремен',
    population2010: 661,
    population2019: 682,
    area: 404.3,
    isEastern: false,
    agriculture: 0,
    industry: 70,
    tradeTransportTourism: 99,
    otherServices: 163,
    laborResources: 332
  },
  'Hamburg': {
    id: 'hamburg',
    name: 'Hamburg',
    nameRu: 'Гамбург',
    population2010: 1775,
    population2019: 1841,
    area: 755.3,
    isEastern: false,
    agriculture: 0,
    industry: 157,
    tradeTransportTourism: 314,
    otherServices: 506,
    laborResources: 977
  },
  'Hessen': {
    id: 'hessen',
    name: 'Hessen',
    nameRu: 'Гессен',
    population2010: 6062,
    population2019: 6265,
    area: 21114.9,
    isEastern: false,
    agriculture: 24,
    industry: 744,
    tradeTransportTourism: 883,
    otherServices: 1569,
    laborResources: 3220
  },
  'Mecklenburg-Vorpommern': {
    id: 'mecklenburg-vorpommern',
    name: 'Mecklenburg-Vorpommern',
    nameRu: 'Мекленбург-Передняя Померания',
    population2010: 1650,
    population2019: 1609,
    area: 23173.5,
    isEastern: true,
    agriculture: 23,
    industry: 161,
    tradeTransportTourism: 203,
    otherServices: 374,
    laborResources: 761
  },
  'Niedersachsen': {
    id: 'niedersachsen',
    name: 'Niedersachsen',
    nameRu: 'Нижняя Саксония',
    population2010: 7854,
    population2019: 7982,
    area: 47618.0,
    isEastern: false,
    agriculture: 87,
    industry: 1096,
    tradeTransportTourism: 1035,
    otherServices: 1798,
    laborResources: 4016
  },
  'Nordrhein-Westfalen': {
    id: 'nordrhein-westfalen',
    name: 'Nordrhein-Westfalen',
    nameRu: 'Северный Рейн-Вестфалия',
    population2010: 17784,
    population2019: 17932,
    area: 34082.8,
    isEastern: false,
    agriculture: 63,
    industry: 2238,
    tradeTransportTourism: 2334,
    otherServices: 4172,
    laborResources: 8807
  },
  'Rheinland-Pfalz': {
    id: 'rheinland-pfalz',
    name: 'Rheinland-Pfalz',
    nameRu: 'Рейнланд-Пфальц',
    population2010: 4015,
    population2019: 4084,
    area: 19846.9,
    isEastern: false,
    agriculture: 30,
    industry: 585,
    tradeTransportTourism: 536,
    otherServices: 939,
    laborResources: 2090
  },
  'Saarland': {
    id: 'saarland',
    name: 'Saarland',
    nameRu: 'Саар',
    population2010: 1025,
    population2019: 990,
    area: 2568.5,
    isEastern: false,
    agriculture: 0,
    industry: 131,
    tradeTransportTourism: 117,
    otherServices: 227,
    laborResources: 475
  },
  'Sachsen': {
    id: 'sachsen',
    name: 'Sachsen',
    nameRu: 'Саксония',
    population2010: 4264,
    population2019: 4078,
    area: 18413.3,
    isEastern: true,
    agriculture: 23,
    industry: 574,
    tradeTransportTourism: 475,
    otherServices: 914,
    laborResources: 1986
  },
  'Sachsen-Anhalt': {
    id: 'sachsen-anhalt',
    name: 'Sachsen-Anhalt',
    nameRu: 'Саксония-Анхальт',
    population2010: 2353,
    population2019: 2208,
    area: 20444.7,
    isEastern: true,
    agriculture: 18,
    industry: 279,
    tradeTransportTourism: 255,
    otherServices: 474,
    laborResources: 1026
  },
  'Schleswig-Holstein': {
    id: 'schleswig-holstein',
    name: 'Schleswig-Holstein',
    nameRu: 'Шлезвиг-Гольштейн',
    population2010: 2833,
    population2019: 2896,
    area: 15762.9,
    isEastern: false,
    agriculture: 28,
    industry: 320,
    tradeTransportTourism: 399,
    otherServices: 718,
    laborResources: 1465
  },
  'Thüringen': {
    id: 'thuringen',
    name: 'Thüringen',
    nameRu: 'Тюрингия',
    population2010: 2248,
    population2019: 2143,
    area: 16172.2,
    isEastern: true,
    agriculture: 16,
    industry: 335,
    tradeTransportTourism: 246,
    otherServices: 444,
    laborResources: 1041
  }
}

const germanyTotals = {
  population2010: 81472,
  population2019: 83019,
  area: 357020.8,
  agriculture: 510,
  industry: 11519,
  tradeTransportTourism: 10873,
  otherServices: 19476,
  laborResources: 42378
}

// ============================================
// GEOJSON TYPES
// ============================================

interface GeoJsonFeature {
  type: 'Feature'
  properties: {
    id?: string
    NAME_1?: string
    name?: string
    GEN?: string
  }
  geometry: {
    type: 'Polygon' | 'MultiPolygon'
    coordinates: number[][][][] | number[][][]
  }
}

interface GeoJsonData {
  type: 'FeatureCollection'
  features: GeoJsonFeature[]
}

// ============================================
// PROJECTION FUNCTIONS
// ============================================

const GERMANY_BOUNDS = {
  minLon: 5.5,
  maxLon: 15.5,
  minLat: 47.0,
  maxLat: 55.2
}

const SVG_WIDTH = 500
const SVG_HEIGHT = 650
const PADDING = 30

function projectCoordinate(lon: number, lat: number): [number, number] {
  const x = PADDING + ((lon - GERMANY_BOUNDS.minLon) / (GERMANY_BOUNDS.maxLon - GERMANY_BOUNDS.minLon)) * (SVG_WIDTH - 2 * PADDING)
  const y = PADDING + ((GERMANY_BOUNDS.maxLat - lat) / (GERMANY_BOUNDS.maxLat - GERMANY_BOUNDS.minLat)) * (SVG_HEIGHT - 2 * PADDING)
  return [x, y]
}

function coordinatesToPath(coordinates: number[][][]): string {
  const parts: string[] = []
  
  coordinates.forEach((ring) => {
    const pathParts: string[] = []
    ring.forEach((point, pointIndex) => {
      const [x, y] = projectCoordinate(point[0], point[1])
      if (pointIndex === 0) {
        pathParts.push(`M ${x.toFixed(2)} ${y.toFixed(2)}`)
      } else {
        pathParts.push(`L ${x.toFixed(2)} ${y.toFixed(2)}`)
      }
    })
    pathParts.push('Z')
    parts.push(pathParts.join(' '))
  })
  
  return parts.join(' ')
}

function geometryToPath(geometry: GeoJsonFeature['geometry']): string {
  if (geometry.type === 'Polygon') {
    return coordinatesToPath(geometry.coordinates as number[][][])
  } else if (geometry.type === 'MultiPolygon') {
    return (geometry.coordinates as number[][][][]).map(poly => coordinatesToPath(poly)).join(' ')
  }
  return ''
}

function getCenterOfGeometry(geometry: GeoJsonFeature['geometry']): [number, number] {
  let allCoords: number[][] = []
  
  if (geometry.type === 'Polygon') {
    allCoords = (geometry.coordinates as number[][][])[0]
  } else if (geometry.type === 'MultiPolygon') {
    (geometry.coordinates as number[][][][]).forEach(poly => {
      allCoords = allCoords.concat(poly[0])
    })
  }
  
  const sumLon = allCoords.reduce((sum, c) => sum + c[0], 0)
  const sumLat = allCoords.reduce((sum, c) => sum + c[1], 0)
  
  return projectCoordinate(sumLon / allCoords.length, sumLat / allCoords.length)
}

// ============================================
// CALCULATIONS
// ============================================

interface CalculatedData extends StateData {
  density: number
  populationShare: number
  areaShare: number
  growthRate: number
  employmentStructure: {
    agriculture: number
    industry: number
    tradeTransportTourism: number
    otherServices: number
  }
  path: string
  centerX: number
  centerY: number
}

function calculateStateData(state: StateData): Omit<CalculatedData, 'path' | 'centerX' | 'centerY'> {
  const density = (state.population2019 * 1000) / state.area
  const populationShare = (state.population2019 / germanyTotals.population2019) * 100
  const areaShare = (state.area / germanyTotals.area) * 100
  const growthRate = (Math.pow(state.population2019 / state.population2010, 1/9) * 100) - 100
  const totalEmployment = state.agriculture + state.industry + state.tradeTransportTourism + state.otherServices
  const employmentStructure = {
    agriculture: (state.agriculture / totalEmployment) * 100,
    industry: (state.industry / totalEmployment) * 100,
    tradeTransportTourism: (state.tradeTransportTourism / totalEmployment) * 100,
    otherServices: (state.otherServices / totalEmployment) * 100
  }
  
  return {
    ...state,
    density,
    populationShare,
    areaShare,
    growthRate,
    employmentStructure
  }
}

function getDensityColor(density: number): string {
  if (density < 100) return '#e8f5e9'
  if (density < 150) return '#c8e6c9'
  if (density < 200) return '#a5d6a7'
  if (density < 300) return '#81c784'
  if (density < 500) return '#66bb6a'
  if (density < 1000) return '#4caf50'
  if (density < 2000) return '#43a047'
  if (density < 3000) return '#388e3c'
  return '#2e7d32'
}

const SECTOR_COLORS = {
  agriculture: '#8bc34a',
  industry: '#ff9800',
  tradeTransportTourism: '#2196f3',
  otherServices: '#9c27b0'
}

const SECTOR_NAMES = {
  agriculture: 'Сельское хозяйство',
  industry: 'Промышленность',
  tradeTransportTourism: 'Торговля/транспорт/туризм',
  otherServices: 'Другие услуги'
}

// ============================================
// COMPONENTS
// ============================================

function PieChartForLand({ data, size = 40 }: { data: CalculatedData, size?: number }) {
  const pieData = [
    { value: data.employmentStructure.agriculture, color: SECTOR_COLORS.agriculture },
    { value: data.employmentStructure.industry, color: SECTOR_COLORS.industry },
    { value: data.employmentStructure.tradeTransportTourism, color: SECTOR_COLORS.tradeTransportTourism },
    { value: data.employmentStructure.otherServices, color: SECTOR_COLORS.otherServices }
  ].filter(d => d.value > 0)

  return (
    <div style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={size * 0.12}
            outerRadius={size * 0.4}
            paddingAngle={0.5}
            dataKey="value"
          >
            {pieData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={pieData[index].color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

function LandTooltip({ data }: { data: CalculatedData }) {
  return (
    <div className="bg-white p-3 rounded-lg shadow-lg border text-sm max-w-xs">
      <h3 className="font-bold text-base mb-2">{data.nameRu}</h3>
      <div className="space-y-1">
        <div className="flex justify-between">
          <span className="text-gray-600">Население (2019):</span>
          <span className="font-medium">{data.population2019.toLocaleString()} тыс.</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Плотность:</span>
          <span className="font-medium">{data.density.toFixed(1)} чел/км²</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Доля населения:</span>
          <span className="font-medium">{data.populationShare.toFixed(2)}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Доля площади:</span>
          <span className="font-medium">{data.areaShare.toFixed(2)}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Темп прироста:</span>
          <span className={`font-medium ${data.growthRate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {data.growthRate >= 0 ? '+' : ''}{data.growthRate.toFixed(2)}%
          </span>
        </div>
        <Separator className="my-2" />
        <div className="font-medium mb-1">Структура занятости:</div>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: SECTOR_COLORS.agriculture }}></div>
            <span>Сельское хоз-во:</span>
            <span className="ml-auto">{data.employmentStructure.agriculture.toFixed(1)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: SECTOR_COLORS.industry }}></div>
            <span>Промышленность:</span>
            <span className="ml-auto">{data.employmentStructure.industry.toFixed(1)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: SECTOR_COLORS.tradeTransportTourism }}></div>
            <span>Торговля/транспорт:</span>
            <span className="ml-auto">{data.employmentStructure.tradeTransportTourism.toFixed(1)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: SECTOR_COLORS.otherServices }}></div>
            <span>Другие услуги:</span>
            <span className="ml-auto">{data.employmentStructure.otherServices.toFixed(1)}%</span>
          </div>
        </div>
        <div className="mt-2 flex justify-between">
          <span className="text-gray-600">Трудовые ресурсы:</span>
          <span className="font-medium">{data.laborResources.toLocaleString()} тыс.</span>
        </div>
      </div>
    </div>
  )
}

function GermanyMap({ 
  calculatedData, 
  hoveredLand, 
  setHoveredLand,
  geoJsonData 
}: { 
  calculatedData: CalculatedData[]
  hoveredLand: string | null
  setHoveredLand: (id: string | null) => void
  geoJsonData: GeoJsonData | null
}) {
  const landsWithCharts = calculatedData.filter(d => d.laborResources > 2000)

  if (!geoJsonData) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  const dataMap = new Map(calculatedData.map(d => [d.name, d]))

  return (
    <div className="relative w-full" style={{ maxWidth: '550px', margin: '0 auto' }}>
      <svg 
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        className="w-full h-auto"
        style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))' }}
      >
        {/* Background */}
        <rect x="0" y="0" width={SVG_WIDTH} height={SVG_HEIGHT} fill="#ffffff"/>
        
        {/* Sea labels */}
        <text x="60" y="40" className="text-[8px] fill-blue-400" style={{ fontStyle: 'italic' }}>Северное море</text>
        <text x="400" y="35" className="text-[8px] fill-blue-400" style={{ fontStyle: 'italic' }}>Балтийское море</text>
        
        {/* Neighboring countries */}
        <text x="35" y="250" className="text-[7px] fill-gray-400" style={{ fontStyle: 'italic' }}>Нидерланды</text>
        <text x="30" y="350" className="text-[7px] fill-gray-400" style={{ fontStyle: 'italic' }}>Бельгия</text>
        <text x="25" y="430" className="text-[7px] fill-gray-400" style={{ fontStyle: 'italic' }}>Франция</text>
        <text x="150" y="620" className="text-[7px] fill-gray-400" style={{ fontStyle: 'italic' }}>Швейцария</text>
        <text x="320" y="625" className="text-[7px] fill-gray-400" style={{ fontStyle: 'italic' }}>Австрия</text>
        <text x="460" y="450" className="text-[7px] fill-gray-400" style={{ fontStyle: 'italic' }}>Польша</text>
        <text x="455" y="550" className="text-[7px] fill-gray-400" style={{ fontStyle: 'italic' }}>Чехия</text>

        {/* Germany states from GeoJSON */}
        {geoJsonData.features.map((feature, index) => {
          const stateName = feature.properties.NAME_1 || feature.properties.name || feature.properties.GEN
          const data = dataMap.get(stateName || '')
          if (!data) {
            console.log('No data for:', stateName)
            return null
          }
          
          const isHovered = hoveredLand === data.id
          const path = geometryToPath(feature.geometry)
          const [cx, cy] = getCenterOfGeometry(feature.geometry)
          
          return (
            <g key={data.id || index}>
              <path
                d={path}
                fill={getDensityColor(data.density)}
                stroke={isHovered ? '#1e40af' : '#888888'}
                strokeWidth={isHovered ? 2 : 0.5}
                className="cursor-pointer transition-all duration-200"
                style={{ filter: isHovered ? 'brightness(1.1)' : 'none' }}
                onMouseEnter={() => setHoveredLand(data.id)}
                onMouseLeave={() => setHoveredLand(null)}
              />
            </g>
          )
        })}

        {/* Pie charts for large labor resources lands */}
        {landsWithCharts.map(land => {
          const feature = geoJsonData.features.find(f => 
            (f.properties.NAME_1 || f.properties.name || f.properties.GEN) === land.name
          )
          if (!feature) return null
          const [cx, cy] = getCenterOfGeometry(feature.geometry)
          
          return (
            <g key={`chart-${land.id}`}>
              <foreignObject
                x={cx - 20}
                y={cy - 20}
                width={40}
                height={40}
                style={{ overflow: 'visible', pointerEvents: 'none' }}
              >
                <PieChartForLand data={land} size={40} />
              </foreignObject>
            </g>
          )
        })}

        {/* Labels for city-states */}
        {calculatedData.filter(d => d.area < 2500).map(land => {
          const feature = geoJsonData.features.find(f => 
            (f.properties.NAME_1 || f.properties.name || f.properties.GEN) === land.name
          )
          if (!feature) return null
          const [cx, cy] = getCenterOfGeometry(feature.geometry)
          const offsetY = land.name === 'Bremen' ? 25 : land.name === 'Hamburg' ? 22 : 20
          
          return (
            <text
              key={`label-${land.id}`}
              x={cx}
              y={cy + offsetY}
              textAnchor="middle"
              className="text-[7px] font-bold fill-gray-700 pointer-events-none"
            >
              {land.nameRu}
            </text>
          )
        })}

        {/* Scale bar */}
        <g transform="translate(30, 610)">
          <rect x="0" y="0" width="60" height="6" fill="none" stroke="#333" strokeWidth="0.5"/>
          <rect x="0" y="0" width="30" height="6" fill="#333"/>
          <text x="0" y="18" className="text-[7px] fill-gray-600">0</text>
          <text x="30" y="18" className="text-[7px] fill-gray-600">50</text>
          <text x="60" y="18" className="text-[7px] fill-gray-600">100 км</text>
        </g>
      </svg>

      {/* Tooltip */}
      {hoveredLand && (
        <div className="absolute top-4 right-4 z-10">
          <LandTooltip data={calculatedData.find(d => d.id === hoveredLand)!} />
        </div>
      )}
    </div>
  )
}

function DensityLegend() {
  const levels = [
    { max: 100, label: '< 100', color: '#e8f5e9' },
    { max: 150, label: '100-150', color: '#c8e6c9' },
    { max: 200, label: '150-200', color: '#a5d6a7' },
    { max: 300, label: '200-300', color: '#81c784' },
    { max: 500, label: '300-500', color: '#66bb6a' },
    { max: 1000, label: '500-1000', color: '#4caf50' },
    { max: 2000, label: '1000-2000', color: '#43a047' },
    { max: 3000, label: '2000-3000', color: '#388e3c' },
    { max: Infinity, label: '> 3000', color: '#2e7d32' }
  ]

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Легенда плотности населения (чел/км²)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {levels.map((level, i) => (
            <div key={i} className="flex items-center gap-1">
              <div 
                className="w-4 h-4 rounded border border-gray-200"
                style={{ backgroundColor: level.color }}
              />
              <span className="text-xs">{level.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function SectorLegend() {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Условные знаки секторов экономики</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(SECTOR_COLORS).map(([key, color]) => (
            <div key={key} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs">{SECTOR_NAMES[key as keyof typeof SECTOR_NAMES]}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Круговые диаграммы показывают структуру занятости для земель с трудовыми ресурсами &gt; 2 млн чел.
        </p>
      </CardContent>
    </Card>
  )
}

function Top5Table({ 
  calculatedData, 
  sector 
}: { 
  calculatedData: CalculatedData[]
  sector: keyof typeof SECTOR_COLORS 
}) {
  if (calculatedData.length === 0) return null
  
  const sorted = [...calculatedData]
    .sort((a, b) => b.employmentStructure[sector] - a.employmentStructure[sector])
    .slice(0, 5)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-8">№</TableHead>
          <TableHead>Земля</TableHead>
          <TableHead className="text-right">%</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sorted.map((land, i) => (
          <TableRow key={land.id}>
            <TableCell className="font-medium">{i + 1}</TableCell>
            <TableCell>{land.nameRu}</TableCell>
            <TableCell className="text-right">
              {land.employmentStructure[sector].toFixed(1)}%
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function StatisticsSummary({ calculatedData }: { calculatedData: CalculatedData[] }) {
  if (calculatedData.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Сводная статистика</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const easternLands = calculatedData.filter(d => d.isEastern)
  const westernLands = calculatedData.filter(d => !d.isEastern)
  
  const easternPopulation = easternLands.reduce((sum, l) => sum + l.population2019, 0)
  const westernPopulation = westernLands.reduce((sum, l) => sum + l.population2019, 0)
  const easternShare = (easternPopulation / germanyTotals.population2019 * 100)
  const westernShare = (westernPopulation / germanyTotals.population2019 * 100)

  const sortedByDensity = [...calculatedData].sort((a, b) => b.density - a.density)
  const highestDensity = sortedByDensity[0]
  const lowestDensity = sortedByDensity[sortedByDensity.length - 1]

  const sortedByGrowth = [...calculatedData].sort((a, b) => b.growthRate - a.growthRate)
  const highestGrowth = sortedByGrowth[0]
  const lowestGrowth = sortedByGrowth[sortedByGrowth.length - 1]

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Сводная статистика</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-2 bg-green-50 rounded-lg">
            <div className="text-xs text-gray-600">Западные земли</div>
            <div className="text-lg font-bold">{westernShare.toFixed(1)}%</div>
            <div className="text-xs text-gray-500">населения</div>
          </div>
          <div className="p-2 bg-orange-50 rounded-lg">
            <div className="text-xs text-gray-600">Восточные земли</div>
            <div className="text-lg font-bold">{easternShare.toFixed(1)}%</div>
            <div className="text-xs text-gray-500">населения</div>
          </div>
        </div>
        
        <Separator />
        
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <div className="text-gray-600">Макс. плотность</div>
            <Badge variant="outline" className="font-normal text-xs mt-1">
              {highestDensity?.nameRu}: {highestDensity?.density.toFixed(0) || '-'}
            </Badge>
          </div>
          <div>
            <div className="text-gray-600">Мин. плотность</div>
            <Badge variant="outline" className="font-normal text-xs mt-1">
              {lowestDensity?.nameRu}: {lowestDensity?.density.toFixed(0) || '-'}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <div className="text-gray-600">Макс. прирост</div>
            <Badge className="bg-green-600 text-xs mt-1">
              {highestGrowth?.nameRu}: +{highestGrowth?.growthRate.toFixed(2)}%
            </Badge>
          </div>
          <div>
            <div className="text-gray-600">Мин. прирост</div>
            <Badge className="bg-red-600 text-xs mt-1">
              {lowestGrowth?.nameRu}: {lowestGrowth?.growthRate.toFixed(2)}%
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function Conclusions() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Выводы о территориальных различиях занятости</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 text-sm">
          <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <h4 className="font-semibold mb-1">1. Структура занятости</h4>
            <p className="text-gray-700">
              Во всех землях доминирует сектор услуг (42-58% занятости). Промышленность составляет 15-35%, 
              за исключением Берлина и Гамбурга, где преобладают услуги.
            </p>
          </div>
          
          <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
            <h4 className="font-semibold mb-1">2. Сельское хозяйство</h4>
            <p className="text-gray-700">
              Наибольшая доля занятых в сельском хозяйстве: Бавария (1.5%), Нижняя Саксония (1.4%), 
              Мекленбург-Передняя Померания (1.3%).
            </p>
          </div>
          
          <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
            <h4 className="font-semibold mb-1">3. Промышленность</h4>
            <p className="text-gray-700">
              Лидеры: Баден-Вюртемберг (34.8%), Тюрингия (32.2%), Саар (27.6%) — 
              земли с развитым машиностроением и автомобильной промышленностью.
            </p>
          </div>
          
          <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
            <h4 className="font-semibold mb-1">4. Восток vs Запад</h4>
            <p className="text-gray-700">
              Восточные земли занимают ~30% территории, но только ~13% населения — 
              последствие исторического разделения Германии.
            </p>
          </div>
          
          <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
            <h4 className="font-semibold mb-1">5. Демографические тенденции</h4>
            <p className="text-gray-700">
              Рост населения в развитых землях (Бавария, Баден-Вюртемберг, Берлин). 
              Убыль в восточных землях из-за миграции.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function FullDataTable({ calculatedData }: { calculatedData: CalculatedData[] }) {
  if (calculatedData.length === 0) return null
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Полная таблица расчётов</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="sticky left-0 bg-white">Земля</TableHead>
                <TableHead className="text-right">Население 2019</TableHead>
                <TableHead className="text-right">Площадь (км²)</TableHead>
                <TableHead className="text-right">Плотность</TableHead>
                <TableHead className="text-right">Доля нас.</TableHead>
                <TableHead className="text-right">Прирост</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {calculatedData.map(land => (
                <TableRow key={land.id}>
                  <TableCell className="sticky left-0 bg-white font-medium">
                    {land.nameRu}
                    {land.isEastern && <span className="ml-1 text-orange-500">★</span>}
                  </TableCell>
                  <TableCell className="text-right">{land.population2019.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{land.area.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{land.density.toFixed(1)}</TableCell>
                  <TableCell className="text-right">{land.populationShare.toFixed(2)}%</TableCell>
                  <TableCell className={`text-right ${land.growthRate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {land.growthRate >= 0 ? '+' : ''}{land.growthRate.toFixed(2)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="text-xs text-gray-500 mt-2">★ — восточные земли (бывшая ГДР)</p>
      </CardContent>
    </Card>
  )
}

// ============================================
// MAIN PAGE
// ============================================

export default function GermanyMapPage() {
  const [hoveredLand, setHoveredLand] = useState<string | null>(null)
  const [geoJsonData, setGeoJsonData] = useState<GeoJsonData | null>(null)
  
  useEffect(() => {
    fetch('/germany-states.geojson')
      .then(res => res.json())
      .then(data => setGeoJsonData(data))
      .catch(err => console.error('Failed to load GeoJSON:', err))
  }, [])
  
  const calculatedData = useMemo(() => {
    if (!geoJsonData) return []
    
    return geoJsonData.features.map(feature => {
      const stateName = feature.properties.NAME_1 || feature.properties.name || feature.properties.GEN
      const state = stateData[stateName || '']
      if (!state) return null
      
      const calculated = calculateStateData(state)
      const path = geometryToPath(feature.geometry)
      const [cx, cy] = getCenterOfGeometry(feature.geometry)
      
      return {
        ...calculated,
        path,
        centerX: cx,
        centerY: cy
      }
    }).filter(Boolean) as CalculatedData[]
  }, [geoJsonData])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Контурная карта Германии
          </h1>
          <p className="text-base text-gray-600">
            Структура занятости населения по федеральным землям
          </p>
          <p className="text-sm text-gray-500">
            Практическая работа по географии Германии
          </p>
        </div>

        {/* Main Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Карта плотности населения и структуры занятости</CardTitle>
                <CardDescription className="text-sm">
                  Наведите на землю для просмотра информации
                </CardDescription>
              </CardHeader>
              <CardContent>
                <GermanyMap 
                  calculatedData={calculatedData}
                  hoveredLand={hoveredLand}
                  setHoveredLand={setHoveredLand}
                  geoJsonData={geoJsonData}
                />
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-4">
            <DensityLegend />
            <SectorLegend />
            <StatisticsSummary calculatedData={calculatedData} />
          </div>
        </div>

        {/* TOP-5 Tables */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">ТОП-5 земель по секторам экономики</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="agriculture">
              <TabsList className="grid w-full grid-cols-4 h-9">
                <TabsTrigger value="agriculture" className="text-xs">Сельское хоз-во</TabsTrigger>
                <TabsTrigger value="industry" className="text-xs">Промышленность</TabsTrigger>
                <TabsTrigger value="tradeTransportTourism" className="text-xs">Торговля</TabsTrigger>
                <TabsTrigger value="otherServices" className="text-xs">Услуги</TabsTrigger>
              </TabsList>
              <TabsContent value="agriculture" className="mt-4">
                <Top5Table calculatedData={calculatedData} sector="agriculture" />
              </TabsContent>
              <TabsContent value="industry" className="mt-4">
                <Top5Table calculatedData={calculatedData} sector="industry" />
              </TabsContent>
              <TabsContent value="tradeTransportTourism" className="mt-4">
                <Top5Table calculatedData={calculatedData} sector="tradeTransportTourism" />
              </TabsContent>
              <TabsContent value="otherServices" className="mt-4">
                <Top5Table calculatedData={calculatedData} sector="otherServices" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Full Data Table */}
        <FullDataTable calculatedData={calculatedData} />

        {/* Conclusions */}
        <Conclusions />

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 py-4">
          Источник данных: Статистическое ведомство Германии (Destatis), 2010-2019
        </div>
      </div>
    </div>
  )
}
