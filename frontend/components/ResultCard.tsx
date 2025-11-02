'use client'

import ReactMarkdown from 'react-markdown'

interface ResultCardProps {
  answer: string
  sources: string[]
  query: string
}

export default function ResultCard({ answer, sources, query }: ResultCardProps) {
  return (
    <div className="w-full max-w-3xl mx-auto mt-8 space-y-6 animate-fadeIn">
      {/* ???? ???? */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-start gap-3 mb-4">
          <span className="text-3xl">??</span>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
              ???? ??????
            </h3>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              ????: <span className="font-medium">{query}</span>
            </div>
          </div>
        </div>
        
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown 
            className="text-gray-700 dark:text-gray-300 leading-relaxed"
            components={{
              p: ({node, ...props}) => <p className="mb-3" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc mr-6 mb-3" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal mr-6 mb-3" {...props} />,
              li: ({node, ...props}) => <li className="mb-1" {...props} />,
              strong: ({node, ...props}) => <strong className="font-bold text-primary-600 dark:text-primary-400" {...props} />,
            }}
          >
            {answer}
          </ReactMarkdown>
        </div>
      </div>

      {/* ????? */}
      {sources && sources.length > 0 && (
        <div className="bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 border border-primary-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">??</span>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              ????? ? ?????
            </h3>
          </div>
          
          <ul className="space-y-2">
            {sources.map((source, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-primary-500 font-bold mt-1">
                  {index + 1}.
                </span>
                {source.startsWith('http') ? (
                  <a
                    href={source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 dark:text-primary-400 hover:underline break-all"
                  >
                    {source}
                  </a>
                ) : (
                  <span className="text-gray-700 dark:text-gray-300">
                    {source}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
