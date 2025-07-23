'use client'
import { useState } from 'react'
import { Mail, Check, AlertCircle } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    // Don't prevent default - let the form submit naturally
    // Set status to success to show feedback
    setStatus('success')
    setEmail('')
    
    // Reset status after 3 seconds to allow another submission
    setTimeout(() => {
      setStatus('idle')
    }, 3000)
  }

  if (status === 'success') {
    return (
      <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center justify-center gap-2 text-green-800">
          <Check className="w-4 h-4" />
          <p className="text-sm font-medium">Thanks! Please check your email to confirm your subscription.</p>
        </div>
      </div>
    )
  }

  return (
    <form 
      action="https://buttondown.email/api/emails/embed-subscribe/ukanwat"
      method="post"
      target="popupwindow"
      onSubmit={handleSubmit}
      className="space-y-3"
    >
      <div className="relative">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className="w-full px-4 py-2 pl-10 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent bg-white text-slate-900"
          required
        />
        <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
      </div>
      <button
        type="submit"
        disabled={!email}
        className="w-full bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Subscribe to newsletter
      </button>
      <p className="text-xs text-slate-600 text-center font-medium">
        No spam, unsubscribe anytime. I write about AI engineering and development tools.
      </p>
    </form>
  )
}