'use client'

import { useState } from 'react'
import axios from 'axios'
import SearchBar from '../components/SearchBar'
import ResultCard from '../components/ResultCard'
import ThemeToggle from '../components/ThemeToggle'
import Link from 'next/link'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

interface SearchResult {
  answer: string
  sources: string[]
  query: string
  search_results?: any[]
}

export default function Home() {
  const [result, setResult] = useState<SearchResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (query: string, useWebSearch: boolean) => {
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await axios.post(`${API_BASE_URL}/api/search`, {
        query,
        use_web_search: useWebSearch,
        top_k: 5
      })

      setResult(response.data)
    } catch (err: any) {
      console.error('خطا در جست‌وجو:', err)
      setError(err.response?.data?.detail || 'خطایی در ارتباط با سرور رخ داد')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-all duration-300 relative overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-20 w-96 h-96 bg-primary-200/20 dark:bg-primary-900/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-purple-200/20 dark:purple-900/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <ThemeToggle />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 relative z-10">
        {/* هدر - بهینه شده برای موبایل */}
        <header className="text-center mb-6 sm:mb-8 lg:mb-12 animate-fade-in-down">
          <div className="inline-block mb-4 sm:mb-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient leading-tight">
              🔍 موتور جست‌وجوی فارسی
            </h1>
            <div className="h-1 w-20 sm:w-32 mx-auto bg-gradient-to-r from-primary-500 to-purple-500 rounded-full"></div>
          </div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 font-medium px-4 max-w-2xl mx-auto leading-relaxed">
            جست‌وجوی هوشمند با قدرت هوش مصنوعی و یادگیری ماشین
          </p>
          
          {/* دکمه تنظیمات - بهینه شده برای موبایل */}
          <div className="mt-4 sm:mt-6 flex justify-center gap-3 sm:gap-4">
            <Link 
              href="/admin"
              className="group px-4 sm:px-5 py-2 sm:py-2.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl transition-all duration-200 text-xs sm:text-sm font-medium shadow-md hover:shadow-lg active:scale-95 touch-manipulation"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                تنظیمات
              </span>
            </Link>
          </div>
        </header>

        {/* باکس جست‌وجو */}
        <div className="mb-6 sm:mb-8 animate-fade-in-up">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* نمایش خطا - با انیمیشن */}
        {error && (
          <div className="w-full max-w-3xl mx-auto mb-6 sm:mb-8 animate-shake">
            <div className="bg-red-50/90 dark:bg-red-900/30 backdrop-blur-sm border-2 border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 pt-0.5">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm sm:text-base mb-1">خطا در جست‌وجو</p>
                  <p className="text-xs sm:text-sm break-words">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* نمایش نتایج */}
        {result && (
          <div className="animate-fade-in">
            <ResultCard
              answer={result.answer}
              sources={result.sources}
              query={result.query}
            />
          </div>
        )}

        {/* پیام خوش‌آمدگویی - با طراحی مدرن */}
        {!result && !isLoading && !error && (
          <div className="w-full max-w-4xl mx-auto mt-8 sm:mt-12 lg:mt-16 animate-fade-in">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 lg:p-10 hover:shadow-2xl transition-all duration-300">
              <div className="text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary-400 to-purple-500 rounded-2xl mb-4 sm:mb-6 shadow-lg">
                  <span className="text-3xl sm:text-4xl">👋</span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 text-gray-800 dark:text-gray-100">
                  خوش آمدید!
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto px-2">
                  این موتور جست‌وجوی هوشمند فارسی با استفاده از تکنولوژی پیشرفته RAG 
                  (Retrieval-Augmented Generation) و مدل‌های زبانی قدرتمند، به سوالات شما پاسخ می‌دهد.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mt-6 sm:mt-8">
                <div className="group p-4 sm:p-5 lg:p-6 bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl sm:rounded-2xl border border-primary-100 dark:border-gray-600 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 transform group-hover:scale-110 transition-transform duration-300">🧠</div>
                  <h3 className="font-semibold text-sm sm:text-base mb-2 text-gray-800 dark:text-gray-200">هوشمند</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    پاسخ‌های دقیق با هوش مصنوعی پیشرفته
                  </p>
                </div>
                
                <div className="group p-4 sm:p-5 lg:p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl sm:rounded-2xl border border-purple-100 dark:border-gray-600 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 transform group-hover:scale-110 transition-transform duration-300">🌐</div>
                  <h3 className="font-semibold text-sm sm:text-base mb-2 text-gray-800 dark:text-gray-200">وب</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    جست‌وجوی هوشمند در اینترنت
                  </p>
                </div>
                
                <div className="group p-4 sm:p-5 lg:p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl sm:rounded-2xl border border-blue-100 dark:border-gray-600 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 transform group-hover:scale-110 transition-transform duration-300">⚡</div>
                  <h3 className="font-semibold text-sm sm:text-base mb-2 text-gray-800 dark:text-gray-200">سریع</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    پاسخ فوری و دقیق در کمترین زمان
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* فوتر - بهینه شده برای موبایل */}
      <footer className="text-center py-6 sm:py-8 mt-12 sm:mt-16 relative z-10">
        <div className="container mx-auto px-4">
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2">
            ساخته‌شده با <span className="text-red-500 animate-pulse">❤️</span> توسط تیم توسعه فارسی
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            نسخه 1.0.0 | MVP
          </p>
        </div>
      </footer>
    </main>
  )
}
