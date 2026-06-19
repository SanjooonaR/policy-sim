export default function RiskScore({ score }: { score: number }) {
  const color = score > 70 ? 'text-red-400' : score > 40 ? 'text-yellow-400' : 'text-green-400'
  const bg = score > 70 ? 'bg-red-500' : score > 40 ? 'bg-yellow-500' : 'bg-green-500'
  const label = score > 70 ? 'High Risk' : score > 40 ? 'Medium Risk' : 'Low Risk'
  const glow = score > 70 ? 'shadow-red-500/20' : score > 40 ? 'shadow-yellow-500/20' : 'shadow-green-500/20'

  return (
    <div className={`bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center shadow-xl ${glow}`}>
      <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest mb-4">Overall Risk Score</p>
      <p className={`text-8xl font-bold ${color}`}>{score}</p>
      <p className={`text-base font-semibold mt-2 ${color}`}>{label}</p>
      <div className="mt-5 bg-gray-800 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-700 ${bg}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <p className="text-gray-600 text-xs mt-3">out of 100</p>
    </div>
  )
}