'use client'

import ReactMarkdown from 'react-markdown'
import { useState } from 'react'

interface ResultCardProps {
  answer: string
  sources: string[]
  query: string
}

export default function ResultCard({ answer, sources, query }: ResultCardProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error('خطا در کپی:', err)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 sm:mt-8 space-y-4 sm:space-y-6 animate-fade-in">
      {/* پاسخ اصلی - با طراحی مدرن */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-5 sm:p-6 lg:p-8 hover:shadow-2xl transition-all duration-300">
        {/* Header */}
        <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary-400 to-purple-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-2xl sm:text-3xl">🤖</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2 text-gray-800 dark:text-gray-100">
              پاسخ هوشمند
            </h3>
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              برای: <span className="font-semibold text-gray-700 dark:text-gray-300 break-words">{query}</span>
            </div>
          </div>
        </div>
        
        {/* Answer Content */}
        <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
          <ReactMarkdown 
            className="text-gray-700 dark:text-gray-300 leading-relaxed sm:leading-loose text-sm sm:text-base"
            components={{
              p: ({node, ...props}) => <p className="mb-3 sm:mb-4 last:mb-0" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc mr-5 sm:mr-6 mb-3 sm:mb-4 space-y-1 sm:space-y-2" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal mr-5 sm:mr-6 mb-3 sm:mb-4 space-y-1 sm:space-y-2" {...props} />,
              li: ({node, ...props}) => <li className="mb-1 text-sm sm:text-base" {...props} />,
              strong: ({node, ...props}) => <strong className="font-bold text-primary-600 dark:text-primary-400" {...props} />,
              h1: ({node, ...props}) => <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 mt-4 sm:mt-6 text-gray-800 dark:text-gray-100" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 mt-3 sm:mt-4 text-gray-800 dark:text-gray-100" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-base sm:text-lg font-bold mb-2 mt-3 text-gray-800 dark:text-gray-100" {...props} />,
              code: ({node, ...props}) => <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm font-mono" {...props} />,
              blockquote: ({node, ...props}) => <blockquote className="border-r-4 border-primary-400 pr-4 my-4 italic text-gray-600 dark:text-gray-400" {...props} />,
            }}
          >
            {answer}
          </ReactMarkdown>
        </div>
      </div>

      {/* منابع - با طراحی مدرن و قابلیت کپی */}
      {sources && sources.length > 0 && (
        <div className="bg-gradient-to-br from-primary-50/80 to-blue-50/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-lg border border-primary-200/50 dark:border-gray-700/50 p-5 sm:p-6 lg:p-8 hover:shadow-xl transition-all duration-300 animate-fade-in-delay">
          {/* Header */}
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-primary-500 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-xl sm:text-2xl">📚</span>
            </div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 dark:text-gray-100">
              منابع و مراجع
            </h3>
          </div>
          
          {/* Sources List */}
          <ul className="space-y-2 sm:space-y-3">
            {sources.map((source, index) => (
              <li 
                key={index} 
                className="group flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white/60 dark:bg-gray-700/40 rounded-xl sm:rounded-2xl hover:bg-white/80 dark:hover:bg-gray-700/60 transition-all duration-200 border border-transparent hover:border-primary-200 dark:hover:border-primary-800"
              >
                <span className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-primary-500 to-purple-500 text-white rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm shadow-sm mt-0.5">
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  {source.startsWith('http') ? (
                    <a
                      href={source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 break-all text-xs sm:text-sm font-medium transition-colors duration-200 block"
                    >
                      {source}
                    </a>
                  ) : (
                    <span className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm break-words block">
                      {source}
                    </span>
                  )}
                </div>
                {/* Copy Button */}
                <button
                  onClick={() => copyToClipboard(source, index)}
                  className="flex-shrink-0 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 active:scale-95 touch-manipulation"
                  aria-label="کپی کردن"
                >
                  {copiedIndex === index ? (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
