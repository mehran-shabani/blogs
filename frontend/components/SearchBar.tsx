'use client'

import { useState } from 'react'

interface SearchBarProps {
  onSearch: (query: string, useWebSearch: boolean) => void
  isLoading: boolean
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [useWebSearch, setUseWebSearch] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query, useWebSearch)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="سوال خود را بپرسید..."
          disabled={isLoading}
          className="w-full px-6 py-4 pr-14 text-lg rounded-2xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-primary-500 focus:outline-none disabled:opacity-50 transition-all shadow-lg"
        />
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-primary-500 hover:bg-primary-600 disabled:bg-gray-400 text-white transition-colors"
        >
          {isLoading ? (
            <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </button>
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <span className="text-2xl">🔍</span>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-center gap-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={useWebSearch}
            onChange={(e) => setUseWebSearch(e.target.checked)}
            disabled={isLoading}
            className="w-4 h-4 text-primary-500 rounded focus:ring-primary-500"
          />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            جست‌وجو در وب (در صورت نیاز)
          </span>
        </label>
      </div>
    </form>
  )
}
