import { Stakeholder } from '@/lib/types'

export default function StakeholderCard({ stakeholder }: { stakeholder: Stakeholder }) {
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
      card: 'bg-green-500/5 border-green-500/20',
      badge: 'bg-green-500/10 text-green-400 border-green-500/20',
      dot: 'bg-green-500'
    }
  }

  const s = styles[stakeholder.severity]

  return (
    <div className={`rounded-xl p-4 border ${s.card}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${s.dot}`} />
          <p className="text-white font-semibold">{stakeholder.group}</p>
        </div>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${s.badge} uppercase`}>
          {stakeholder.severity}
        </span>
      </div>
      <p className="text-gray-400 text-sm leading-relaxed">{stakeholder.impact}</p>
    </div>
  )
}