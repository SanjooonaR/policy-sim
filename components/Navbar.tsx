'use client'
import Link from 'next/link'
import { UserButton, useAuth } from '@clerk/nextjs'

export default function Navbar() {
  const { isSignedIn } = useAuth()

  return (
    <nav className="bg-gray-950 border-b border-gray-800 px-8 py-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold text-white tracking-tight">
        Policy<span className="text-blue-500">Sim</span>
      </Link>

      <div className="flex items-center gap-6">
        {isSignedIn ? (
          <>
            <Link href="/upload" className="text-gray-400 hover:text-white transition text-sm font-medium">Upload</Link>
            <Link href="/dashboard" className="text-gray-400 hover:text-white transition text-sm font-medium">Dashboard</Link>
            <Link href="/compare" className="text-gray-400 hover:text-white transition text-sm font-medium">Compare</Link>
            <UserButton />
          </>
        ) : (
          <>
            <Link href="/sign-in" className="text-gray-400 hover:text-white transition text-sm font-medium">
              Login
            </Link>
            <Link href="/sign-up">
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}