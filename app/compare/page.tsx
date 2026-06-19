'use client'
import { useState } from 'react'
import { CompareResult } from '@/lib/types'

export default function Compare() {
  const [file1, setFile1] = useState<File | null>(null)
  const [file2, setFile2] = useState<File | null>(null)
  const [selectedField, setSelectedField] = useState<string>('')
  const [result, setResult] = useState<CompareResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

const handleCompare = async () => {
    if (!file1 || !file2) {
      setError('Please upload both policy files')
      return
    }

    // ← ADD THIS CHECK
    if (file1.name === file2.name && file1.size === file2.size) {
      setError('You uploaded the same policy twice! Please upload two different policy documents.')
      return
    }

    setLoading(true)
    setError('')
    try {
      const form = new FormData()
      form.append('file1', file1)
      form.append('file2', file2)

      const res = await fetch('http://localhost:8000/compare', {
        method: 'POST',
        body: form,
      })
      const data = await res.json()
      if (data.error) {
        setError(data.error)
        setLoading(false)
        return
      }
      setResult(data)
      setSelectedField(data.common_fields[0])
    } catch (err) {
      setError('Could not connect to backend.')
    }
    setLoading(false)
  }

  const field = result && selectedField ? result.comparison[selectedField] : null

  return (
    <div className="min-h-screen bg-gray-950 px-6 py-10">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold text-white mb-2">Compare Policies</h1>
        <p className="text-gray-400 mb-8">Upload two policy documents to compare them field by field</p>

        {/* Upload Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Policy 1 */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-white font-semibold mb-3">Policy 1</p>
            <label className={`block border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition
              ${file1 ? 'border-blue-500 bg-blue-500/5' : 'border-gray-700 hover:border-gray-500'}`}>
              {file1 ? (
                <div>
                  <p className="text-2xl mb-2">✅</p>
                  <p className="text-blue-400 font-medium text-sm">{file1.name}</p>
                </div>
              ) : (
                <div>
                  <p className="text-2xl mb-2">📄</p>
                  <p className="text-gray-400 text-sm">Click to upload PDF / DOCX / TXT</p>
                </div>
              )}
              <input
                type="file"
                className="hidden"
                accept=".pdf,.docx,.txt"
                onChange={(e) => e.target.files && setFile1(e.target.files[0])}
              />
            </label>
          </div>

          {/* Policy 2 */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-white font-semibold mb-3">Policy 2</p>
            <label className={`block border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition
              ${file2 ? 'border-purple-500 bg-purple-500/5' : 'border-gray-700 hover:border-gray-500'}`}>
              {file2 ? (
                <div>
                  <p className="text-2xl mb-2">✅</p>
                  <p className="text-purple-400 font-medium text-sm">{file2.name}</p>
                </div>
              ) : (
                <div>
                  <p className="text-2xl mb-2">📄</p>
                  <p className="text-gray-400 text-sm">Click to upload PDF / DOCX / TXT</p>
                </div>
              )}
              <input
                type="file"
                className="hidden"
                accept=".pdf,.docx,.txt"
                onChange={(e) => e.target.files && setFile2(e.target.files[0])}
              />
            </label>
          </div>
        </div>

        {/* Compare Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleCompare}
            disabled={loading || !file1 || !file2}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500 text-white px-10 py-3 rounded-xl font-semibold transition"
          >
            {loading ? 'Analysing...' : 'Compare Policies →'}
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-6">
            ⚠️ {error}
          </div>
        )}

        {/* Results */}
        {result && (
          <div>
            {/* Policy Titles */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 text-center">
                <p className="text-blue-400 text-xs uppercase font-semibold mb-1">Policy 1</p>
                <p className="text-white font-bold">{result.policy1_title}</p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-4 text-center">
                <p className="text-purple-400 text-xs uppercase font-semibold mb-1">Policy 2</p>
                <p className="text-white font-bold">{result.policy2_title}</p>
              </div>
            </div>

            {/* Field Selector */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
              <p className="text-white font-semibold mb-4">Select a field to compare:</p>
              <div className="flex flex-wrap gap-3">
                {result.common_fields.map((field) => (
                  <button
                    key={field}
                    onClick={() => setSelectedField(field)}
                    className={`px-5 py-2 rounded-xl text-sm font-semibold transition
                      ${selectedField === field
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                      }`}
                  >
                    {field}
                  </button>
                ))}
              </div>
            </div>

            {/* Field Comparison */}
            {field && (
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
                <h2 className="text-lg font-bold text-white mb-6 text-center">
                  {selectedField} — Head to Head
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  {/* Policy 1 */}
                  <div className={`rounded-xl p-5 border ${field.winner === 'policy1' ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 bg-gray-800'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-blue-400 font-semibold text-sm">Policy 1</p>
                      {field.winner === 'policy1' && (
                        <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded-full border border-blue-500/30">
                          ✓ Better
                        </span>
                      )}
                    </div>
                    <p className="text-4xl font-bold text-white mb-3">{field.policy1_score}<span className="text-gray-500 text-lg">/100</span></p>
                    <div className="bg-gray-700 rounded-full h-2 mb-3">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${field.policy1_score}%` }} />
                    </div>
                    <p className="text-gray-400 text-sm">{field.policy1_summary}</p>
                  </div>

                  {/* Policy 2 */}
                  <div className={`rounded-xl p-5 border ${field.winner === 'policy2' ? 'border-purple-500 bg-purple-500/10' : 'border-gray-700 bg-gray-800'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-purple-400 font-semibold text-sm">Policy 2</p>
                      {field.winner === 'policy2' && (
                        <span className="bg-purple-500/20 text-purple-400 text-xs px-2 py-0.5 rounded-full border border-purple-500/30">
                          ✓ Better
                        </span>
                      )}
                    </div>
                    <p className="text-4xl font-bold text-white mb-3">{field.policy2_score}<span className="text-gray-500 text-lg">/100</span></p>
                    <div className="bg-gray-700 rounded-full h-2 mb-3">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${field.policy2_score}%` }} />
                    </div>
                    <p className="text-gray-400 text-sm">{field.policy2_summary}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Overall Winner */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-gray-700 rounded-2xl p-6 text-center">
              <p className="text-gray-400 text-sm mb-1">Overall Winner</p>
              <p className="text-2xl font-bold text-white mb-2">
                🏆 {result.overall_winner === 'policy1' ? result.policy1_title : result.policy2_title}
              </p>
              <p className="text-gray-400 text-sm">{result.overall_winner_reason}</p>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}