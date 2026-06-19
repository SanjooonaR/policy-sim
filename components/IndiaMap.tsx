'use client'
import { useEffect, useState } from 'react'
import { StateImpact } from '@/lib/types'

export default function IndiaMap({ states }: { states: StateImpact[] }) {
  const [MapComponent, setMapComponent] = useState<any>(null)

  useEffect(() => {
    // Dynamically import Leaflet only on client side
    const loadMap = async () => {
      const L = (await import('leaflet')).default
      const { MapContainer, TileLayer, GeoJSON, Tooltip } = await import('react-leaflet')
      await import('leaflet/dist/leaflet.css')

      const geoData = await fetch('/india.geojson').then(r => r.json())

      const getColor = (score: number) => {
        if (score > 70) return '#ef4444'
        if (score > 40) return '#f97316'
        if (score > 20) return '#eab308'
        return '#22c55e'
      }

      const getScore = (stateName: string) => {
        const match = states.find(s =>
          stateName.toLowerCase().includes(s.state.toLowerCase()) ||
          s.state.toLowerCase().includes(stateName.toLowerCase())
        )
        return match ? match.impact_score : 0
      }

      const style = (feature: any) => {
        const score = getScore(feature.properties.NAME_1 || feature.properties.name || '')
        return {
          fillColor: getColor(score),
          fillOpacity: 0.7,
          color: '#1f2937',
          weight: 1.5,
        }
      }

      const onEachFeature = (feature: any, layer: any) => {
        const name = feature.properties.NAME_1 || feature.properties.name || ''
        const score = getScore(name)
        layer.bindTooltip(
          `<div style="background:#1f2937;color:white;padding:6px 10px;border-radius:8px;font-size:13px;">
            <strong>${name}</strong><br/>Impact Score: ${score}/100
          </div>`,
          { sticky: true, opacity: 1 }
        )
      }

      const Map = () => (
        <MapContainer
          center={[20.5937, 78.9629]}
          zoom={4}
          style={{ height: '450px', width: '100%', background: '#111827' }}
          zoomControl={true}
          scrollWheelZoom={false}
        >
          <GeoJSON
            key={JSON.stringify(states)}
            data={geoData}
            style={style}
            onEachFeature={onEachFeature}
          />
        </MapContainer>
      )

      setMapComponent(<Map />)
    }

    loadMap()
  }, [states])

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
          🗺️
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">State-wise Impact Map</h2>
          <p className="text-gray-500 text-xs">Hover over states to see impact scores</p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mb-4 text-xs">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-red-500 inline-block" />High (70-100)</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-orange-500 inline-block" />Medium (40-70)</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-yellow-500 inline-block" />Low (20-40)</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-green-500 inline-block" />Minimal (0-20)</span>
      </div>

      <div className="rounded-xl overflow-hidden">
        {MapComponent ? MapComponent : (
          <div className="h-[450px] bg-gray-800 rounded-xl flex items-center justify-center">
            <p className="text-gray-500">Loading map...</p>
          </div>
        )}
      </div>
    </div>
  )
}