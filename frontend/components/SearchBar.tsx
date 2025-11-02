'use client'

import { useState, useRef, useEffect } from 'react'

interface SearchBarProps {
  onSearch: (query: string, useWebSearch: boolean) => void
  isLoading: boolean
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [useWebSearch, setUseWebSearch] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim() && !isLoading) {
      onSearch(query, useWebSearch)
    }
  }

  // Auto-focus on mount for better UX
  useEffect(() => {
    // Don't auto-focus on mobile to prevent keyboard popup
    if (window.innerWidth > 768) {
      inputRef.current?.focus()
    }
  }, [])

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="relative group">
        {/* Search Input with modern glassmorphism */}
        <div className={`relative transition-all duration-300 ${isFocused ? 'scale-[1.02]' : ''}`}>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="سوال خود را بپرسید..."
            disabled={isLoading}
            className="w-full px-4 sm:px-6 py-3 sm:py-4 pr-12 sm:pr-16 pl-14 sm:pl-16 text-base sm:text-lg rounded-xl sm:rounded-2xl border-2 border-gray-200/50 dark:border-gray-700/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md focus:border-primary-400 dark:focus:border-primary-500 focus:ring-4 focus:ring-primary-100 dark:focus:ring-primary-900/30 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl focus:shadow-2xl text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 touch-manipulation"
          />
          
          {/* Search Icon - Left side */}
          <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg 
              className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-200 ${isFocused ? 'text-primary-500' : 'text-gray-400 dark:text-gray-500'}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Submit Button - Right side with improved mobile touch target */}
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 disabled:from-gray-300 disabled:to-gray-400 dark:disabled:from-gray-600 dark:disabled:to-gray-700 text-white transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 disabled:shadow-none disabled:cursor-not-allowed touch-manipulation min-w-[44px] min-h-[44px] sm:min-w-[48px] sm:min-h-[48px] flex items-center justify-center"
            aria-label="جست‌وجو"
          >
            {isLoading ? (
              <svg className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            )}
          </button>

          {/* Focus indicator glow */}
          {isFocused && (
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary-400/20 to-purple-400/20 blur-xl -z-10 animate-pulse"></div>
          )}
        </div>

        {/* Loading indicator bar */}
        {isLoading && (
          <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-purple-500 to-primary-500 rounded-full animate-shimmer"></div>
        )}
      </div>
      
      {/* Web Search Toggle - Improved mobile design */}
      <div className="mt-4 sm:mt-5 flex items-center justify-center">
        <label className="group/toggle flex items-center gap-2 sm:gap-3 cursor-pointer select-none touch-manipulation">
          <div className="relative">
            <input
              type="checkbox"
              checked={useWebSearch}
              onChange={(e) => setUseWebSearch(e.target.checked)}
              disabled={isLoading}
              className="sr-only peer"
            />
            <div className="w-11 sm:w-12 h-6 sm:h-7 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 sm:after:top-[2px] after:right-0.5 sm:after:right-[2px] after:bg-white after:rounded-full after:h-5 sm:after:h-6 after:w-5 sm:after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-primary-500 peer-checked:to-purple-500 shadow-inner"></div>
          </div>
          <span className={`text-xs sm:text-sm font-medium transition-colors duration-200 ${
            useWebSearch 
              ? 'text-primary-600 dark:text-primary-400' 
              : 'text-gray-600 dark:text-gray-400'
          }`}>
            <span className="hidden sm:inline">جست‌وجو در اینترنت</span>
            <span className="sm:hidden">جست‌وجو در وب</span>
          </span>
          {useWebSearch && (
            <span className="text-primary-500 text-lg animate-bounce">🌐</span>
          )}
        </label>
      </div>
    </form>
  )
}
