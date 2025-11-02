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
      console.error('??? ?? ???????:', err)
      setError(err.response?.data?.detail || '????? ?? ?????? ?? ???? ?? ???')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <ThemeToggle />
      
      <div className="container mx-auto px-4 py-12">
        {/* ??? */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
            ?? ????? ???????? ?????
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            ???????? ?????? ?? ???? ??? ??????
          </p>
          
          {/* ???????? ????? */}
          <div className="mt-6 flex justify-center gap-4">
            <Link 
              href="/admin"
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors text-sm"
            >
              ?? ???????
            </Link>
          </div>
        </header>

        {/* ???? ??????? */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* ????? ??? */}
        {error && (
          <div className="w-full max-w-3xl mx-auto bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-6 py-4 rounded-2xl">
            <div className="flex items-center gap-3">
              <span className="text-2xl">??</span>
              <div>
                <p className="font-bold">???</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* ????? ????? */}
        {result && (
          <ResultCard
            answer={result.answer}
            sources={result.sources}
            query={result.query}
          />
        )}

        {/* ???? ??????????? */}
        {!result && !isLoading && !error && (
          <div className="w-full max-w-3xl mx-auto mt-12 text-center space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                ?? ??? ?????!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                ??? ????? ???????? ?????? ????? ?? ??????? ?? ???????? RAG (Retrieval-Augmented Generation) 
                ? ??????? ????? ???????? ?? ?????? ??? ???? ??????.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <div className="p-4 bg-primary-50 dark:bg-gray-700 rounded-xl">
                  <div className="text-3xl mb-2">??</div>
                  <h3 className="font-semibold mb-1 text-gray-800 dark:text-gray-200">??????</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    ???????? ???? ?? AI
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-gray-700 rounded-xl">
                  <div className="text-3xl mb-2">??</div>
                  <h3 className="font-semibold mb-1 text-gray-800 dark:text-gray-200">??</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    ??????? ?? ???????
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-gray-700 rounded-xl">
                  <div className="text-3xl mb-2">?</div>
                  <h3 className="font-semibold mb-1 text-gray-800 dark:text-gray-200">????</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    ???? ???? ? ????
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ???? */}
      <footer className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
        <p>
          ????????? ?? ?? ???? ??? ????? ?????
        </p>
        <p className="mt-2">
          ???? 1.0.0 | MVP
        </p>
      </footer>
    </main>
  )
}
