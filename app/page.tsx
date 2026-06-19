import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-8 tracking-widest uppercase">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
          Powered by Claude AI
        </div>

        <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
          Simulate Policy
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"> Impact </span>
          Instantly
        </h1>

        <p className="text-gray-400 text-xl mb-10 leading-relaxed">
          Upload any government policy document and get AI-powered impact analysis across sectors, states, and stakeholders in seconds.
        </p>

        <div className="flex gap-4 justify-center">
          <Link href="/upload">
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl text-base font-semibold transition-all hover:shadow-xl hover:shadow-blue-500/25">
              Upload Policy →
            </button>
          </Link>
          <Link href="/dashboard">
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-xl text-base font-semibold transition-all border border-gray-700">
              View Demo
            </button>
          </Link>
        </div>

        {/* Stats row */}
        <div className="flex justify-center gap-12 mt-16 text-center">
          <div>
            <p className="text-3xl font-bold text-white">28+</p>
            <p className="text-gray-500 text-sm mt-1">States Covered</p>
          </div>
          <div className="w-px bg-gray-800" />
          <div>
            <p className="text-3xl font-bold text-white">5</p>
            <p className="text-gray-500 text-sm mt-1">Sectors Analysed</p>
          </div>
          <div className="w-px bg-gray-800" />
          <div>
            <p className="text-3xl font-bold text-white">&lt;30s</p>
            <p className="text-gray-500 text-sm mt-1">Analysis Time</p>
          </div>
        </div>
      </div>
    </div>
  )
}