'use client'

import { useState } from 'react'

interface PasswordGateProps {
  password: string
  hint?: string
  children: React.ReactNode
}

export default function PasswordGate({ password, hint, children }: PasswordGateProps) {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input === password) {
      setIsUnlocked(true)
      setError(false)
    } else {
      setError(true)
    }
  }

  if (isUnlocked) {
    return <>{children}</>
  }

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-800">
        <div className="text-center">
          <svg
            className="mx-auto mb-4 h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-gray-100">
            此文章受密码保护
          </h2>
          {hint && <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">提示：{hint}</p>}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="请输入密码"
              className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
            />
          </div>
          {error && <p className="mb-4 text-center text-sm text-red-500">密码错误，请重试</p>}
          <button
            type="submit"
            className="bg-primary-500 hover:bg-primary-600 w-full rounded-md px-4 py-2 text-white"
          >
            确认
          </button>
        </form>
      </div>
    </div>
  )
}
