'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import ThemeToggle from '../../components/ThemeToggle'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export default function AdminPage() {
  const [apiKey, setApiKey] = useState('')
  const [baseUrl, setBaseUrl] = useState('')
  const [ingestUrl, setIngestUrl] = useState('')
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentConfig, setCurrentConfig] = useState<any>(null)

  useEffect(() => {
    loadConfig()
  }, [])

  const loadConfig = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/config`)
      setCurrentConfig(response.data)
      setBaseUrl(response.data.base_url)
    } catch (err) {
      console.error('خطا در دریافت تنظیمات:', err)
    }
  }

  const handleSaveConfig = async () => {
    if (!apiKey || !baseUrl) {
      setMessage({ type: 'error', text: 'لطفاً همه فیلدها را پر کنید' })
      return
    }

    setIsLoading(true)
    setMessage(null)

    try {
      await axios.post(`${API_BASE_URL}/api/config`, {
        api_key: apiKey,
        base_url: baseUrl
      })

      setMessage({ type: 'success', text: '✅ تنظیمات با موفقیت ذخیره شد' })
      setApiKey('')
      loadConfig()
    } catch (err: any) {
      setMessage({ 
        type: 'error', 
        text: err.response?.data?.detail || 'خطا در ذخیره تنظیمات' 
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleIngestUrl = async () => {
    if (!ingestUrl) {
      setMessage({ type: 'error', text: 'لطفاً URL را وارد کنید' })
      return
    }

    setIsLoading(true)
    setMessage(null)

    try {
      const response = await axios.post(`${API_BASE_URL}/api/ingest-url`, {
        url: ingestUrl
      })

      setMessage({ 
        type: 'success', 
        text: response.data.message || '✅ URL با موفقیت اضافه شد' 
      })
      setIngestUrl('')
    } catch (err: any) {
      setMessage({ 
        type: 'error', 
        text: err.response?.data?.detail || 'خطا در افزودن URL' 
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <ThemeToggle />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* هدر */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline mb-4"
          >
            ← بازگشت به صفحه اصلی
          </Link>
          
          <h1 className="text-4xl font-bold mb-2 text-gray-800 dark:text-gray-200">
            ⚙️ پنل مدیریت
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            تنظیمات موتور جست‌وجو و مدیریت محتوا
          </p>
        </div>

        {/* نمایش پیام */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl ${
            message.type === 'success' 
              ? 'bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300'
              : 'bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300'
          }`}>
            {message.text}
          </div>
        )}

        {/* تنظیمات فعلی */}
        {currentConfig && (
          <div className="mb-8 p-6 bg-blue-50 dark:bg-gray-800 rounded-2xl border border-blue-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              📊 تنظیمات فعلی
            </h2>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>API Key:</strong> <code className="bg-white dark:bg-gray-700 px-2 py-1 rounded">{currentConfig.api_key}</code>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Base URL:</strong> <code className="bg-white dark:bg-gray-700 px-2 py-1 rounded">{currentConfig.base_url}</code>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Model:</strong> <code className="bg-white dark:bg-gray-700 px-2 py-1 rounded">{currentConfig.model}</code>
              </p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* بخش تنظیمات OpenAI */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
              🔑 تنظیمات OpenAI
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  API Key
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-xxxxxxxxxxxxxxxx"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-primary-500 focus:outline-none text-gray-900 dark:text-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Base URL
                </label>
                <input
                  type="text"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  placeholder="https://api.gapgpt.app/v1"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-primary-500 focus:outline-none text-gray-900 dark:text-gray-100"
                />
              </div>

              <button
                onClick={handleSaveConfig}
                disabled={isLoading}
                className="w-full px-6 py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-400 text-white rounded-xl font-medium transition-colors"
              >
                {isLoading ? 'در حال ذخیره...' : 'ذخیره تنظیمات'}
              </button>
            </div>
          </div>

          {/* بخش افزودن URL */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
              🌐 افزودن محتوا از وب
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  آدرس URL
                </label>
                <input
                  type="url"
                  value={ingestUrl}
                  onChange={(e) => setIngestUrl(e.target.value)}
                  placeholder="https://example.com/article"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-primary-500 focus:outline-none text-gray-900 dark:text-gray-100"
                />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  با افزودن URL، محتوای آن استخراج و به پایگاه داده اضافه می‌شود
                </p>
              </div>

              <button
                onClick={handleIngestUrl}
                disabled={isLoading}
                className="w-full px-6 py-3 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white rounded-xl font-medium transition-colors"
              >
                {isLoading ? 'در حال پردازش...' : 'افزودن URL'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
