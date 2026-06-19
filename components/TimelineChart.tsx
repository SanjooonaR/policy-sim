'use client'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine
} from 'recharts'
import { TimelinePoint } from '@/lib/types'

export default function TimelineChart({ timeline }: { timeline: TimelinePoint[] }) {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload
      return (
        <div className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 max-w-xs">
          <p className="text-blue-400 font-bold text-sm mb-1">{point.period}</p>
          <p className="text-white font-semibold mb-1">Impact Score: {point.impact_score}/100</p>
          <p className="text-gray-400 text-xs leading-relaxed">{point.description}</p>
        </div>
      )
    }
    return null
  }

  const maxScore = Math.max(...timeline.map(t => t.impact_score))
  const trend = maxScore > 70 ? 'High Impact Trend' : maxScore > 40 ? 'Medium Impact Trend' : 'Low Impact Trend'
  const trendColor = maxScore > 70 ? 'text-red-400' : maxScore > 40 ? 'text-yellow-400' : 'text-green-400'

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            📅
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Policy Impact Timeline</h2>
            <p className="text-gray-500 text-xs">Predicted impact over time</p>
          </div>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-gray-800 ${trendColor}`}>
          {trend}
        </span>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={timeline} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
          <XAxis
            dataKey="period"
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={70} stroke="#ef4444" strokeDasharray="4 4" label={{ value: 'High Risk', fill: '#ef4444', fontSize: 10 }} />
          <ReferenceLine y={40} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: 'Medium Risk', fill: '#f59e0b', fontSize: 10 }} />
          <Line
            type="monotone"
            dataKey="impact_score"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ fill: '#3b82f6', r: 5, strokeWidth: 2, stroke: '#1e3a5f' }}
            activeDot={{ r: 7, fill: '#60a5fa', stroke: '#3b82f6', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Timeline points summary */}
      <div className="grid grid-cols-5 gap-2 mt-4">
        {timeline.map((t, i) => (
          <div key={i} className="text-center bg-gray-800 rounded-xl p-2">
            <p className="text-gray-400 text-xs mb-1">{t.period}</p>
            <p className={`text-sm font-bold ${t.impact_score > 70 ? 'text-red-400' : t.impact_score > 40 ? 'text-yellow-400' : 'text-green-400'}`}>
              {t.impact_score}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}