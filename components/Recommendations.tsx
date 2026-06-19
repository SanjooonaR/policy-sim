import { Recommendation } from '@/lib/types'

export default function Recommendations({ recommendations }: { recommendations: Recommendation[] }) {
  const styles = {
    high: {
      card: 'bg-red-500/5 border-red-500/20',
      badge: 'bg-red-500/10 text-red-400 border-red-500/20',
      dot: 'bg-red-500'
    },
    medium: {
      card: 'bg-yellow-500/5 border-yellow-500/20',
      badge: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      dot: 'bg-yellow-500'
    },
    low: {
      card: 'bg-blue-500/5 border-blue-500/20',
      badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      dot: 'bg-blue-500'
    }
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-base">
          💡
        </div>
        <h2 className="text-lg font-semibold text-white">AI Recommendations</h2>
        <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">
          {recommendations.length} suggestions
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((r, i) => {
          const s = styles[r.priority]
          return (
            <div key={i} className={`rounded-xl p-4 border ${s.card}`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full mt-1 shrink-0 ${s.dot}`} />
                  <p className="text-white font-semibold text-sm">{r.title}</p>
                </div>
                <div className="flex gap-2 shrink-0 ml-2">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${s.badge} uppercase`}>
                    {r.priority}
                  </span>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed ml-4">{r.description}</p>
              <p className="text-gray-600 text-xs mt-2 ml-4">Sector: {r.sector}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}