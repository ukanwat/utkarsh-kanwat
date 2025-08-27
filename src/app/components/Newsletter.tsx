'use client'
import { useState } from 'react'
import { Mail, Check, AlertCircle } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) return
    
    setStatus('loading')
    
    try {
      const response = await fetch('https://buttondown.email/api/emails/embed-subscribe/ukanwat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email: email
        })
      })

      if (response.ok) {
        setStatus('success')
        setMessage('Thanks! Please check your email to confirm your subscription.')
        setEmail('')
      } else {
        throw new Error('Subscription failed')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
    
    // Reset status after 5 seconds
    setTimeout(() => {
      setStatus('idle')
      setMessage('')
    }, 5000)
  }

  if (status === 'success') {
    return (
      <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center justify-center gap-2 text-green-800">
          <Check className="w-4 h-4" />
          <p className="text-sm font-medium">{message}</p>
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center justify-center gap-2 text-red-800">
          <AlertCircle className="w-4 h-4" />
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button 
          onClick={() => setStatus('idle')}
          className="text-sm text-red-600 underline mt-2"
        >
          Try again
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className="w-full px-4 py-2 pl-10 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent bg-white text-slate-900"
          required
          disabled={status === 'loading'}
        />
        <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
      </div>
      <button
        type="submit"
        disabled={!email || status === 'loading'}
        className="w-full bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Subscribing...' : 'Subscribe to newsletter'}
      </button>
      <p className="text-xs text-slate-600 text-center font-medium">
        No spam, unsubscribe anytime. I write about AI engineering and development tools.
      </p>
    </form>
  )
}