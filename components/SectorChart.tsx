'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { SectorScore } from '@/lib/types'

export default function SectorChart({ sectors }: { sectors: SectorScore[] }) {
  const colors: Record<string, string> = {
    positive: '#22c55e',
    neutral: '#f59e0b',
    negative: '#ef4444'
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm">
          <p className="text-white font-semibold">{payload[0].payload.name}</p>
          <p className="text-gray-400">Score: <span className="text-white">{payload[0].value}</span></p>
          <p className="text-gray-400">Sentiment: <span className="text-white">{payload[0].payload.sentiment}</span></p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 h-full">
      <h2 className="text-lg font-semibold text-white mb-4">Sector Impact Scores</h2>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={sectors} layout="vertical" margin={{ left: 10 }}>
          <XAxis type="number" domain={[0, 100]} tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="name" width={110} tick={{ fill: '#d1d5db', fontSize: 13 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
          <Bar dataKey="score" radius={6} maxBarSize={24}>
            {sectors.map((s, i) => (
              <Cell key={i} fill={colors[s.sentiment]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex gap-5 mt-2 text-xs text-gray-500">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />Positive</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block" />Neutral</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />Negative</span>
      </div>
    </div>
  )
}