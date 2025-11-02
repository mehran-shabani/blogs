'use client'

import { useTheme } from '../app/providers'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-3 sm:top-4 left-3 sm:left-4 p-2.5 sm:p-3 rounded-full sm:rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md hover:bg-white dark:hover:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 z-50 touch-manipulation group"
      aria-label="تغییر تم"
    >
      <div className="relative w-5 h-5 sm:w-6 sm:h-6">
        {theme === 'light' ? (
          <svg 
            className="w-full h-full text-gray-700 dark:text-gray-300 transition-all duration-300 group-hover:text-primary-600 dark:group-hover:text-primary-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
            />
          </svg>
        ) : (
          <svg 
            className="w-full h-full text-yellow-500 transition-all duration-300 group-hover:text-yellow-400 animate-spin-slow" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
            />
          </svg>
        )}
      </div>
    </button>
  )
}
