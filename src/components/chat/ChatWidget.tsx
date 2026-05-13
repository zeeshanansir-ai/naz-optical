'use client'

import { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Send, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Message {
  id:        string
  sender:    string
  message:   string
  created_at: string
}

export function ChatWidget() {
  const [open, setOpen]           = useState(false)
  const [step, setStep]           = useState<'name' | 'chat'>('name')
  const [name, setName]           = useState('')
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [messages, setMessages]   = useState<Message[]>([])
  const [text, setText]           = useState('')
  const [sending, setSending]     = useState(false)
  const bottomRef                 = useRef<HTMLDivElement>(null)

  // Restore session from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('naz_chat_session')
    if (saved) {
      const { id, name: n } = JSON.parse(saved)
      setSessionId(id)
      setName(n)
      setStep('chat')
    }
  }, [])

  // Subscribe to new messages
  useEffect(() => {
    if (!sessionId) return
    const supabase = createClient()

    supabase.from('chat_messages').select('*').eq('session_id', sessionId).order('created_at').then(({ data }) => {
      if (data) setMessages(data as Message[])
    })

    const channel = supabase
      .channel(`chat:${sessionId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages', filter: `session_id=eq.${sessionId}` },
        payload => setMessages(prev => [...prev, payload.new as Message])
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [sessionId])

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  async function startChat() {
    if (!name.trim()) return
    const supabase = createClient()
    const { data } = await supabase.from('chat_sessions').insert({ visitor_name: name.trim() }).select().single()
    if (data) {
      setSessionId(data.id)
      setStep('chat')
      localStorage.setItem('naz_chat_session', JSON.stringify({ id: data.id, name: name.trim() }))
      const greet = `Hi ${name.trim()}! 👋 Welcome to Naz Optical. How can we help you today?`
      await supabase.from('chat_messages').insert({ session_id: data.id, sender: 'admin', message: greet })
      setMessages([{ id: crypto.randomUUID(), sender: 'admin', message: greet, created_at: new Date().toISOString() }])
    }
  }

  async function sendMessage() {
    if (!text.trim() || !sessionId) return
    setSending(true)
    const msg = text.trim()
    setText('')
    // Optimistic update — show immediately without waiting for Realtime
    const tempMsg: Message = { id: crypto.randomUUID(), sender: 'visitor', message: msg, created_at: new Date().toISOString() }
    setMessages(prev => [...prev, tempMsg])
    const supabase = createClient()
    await supabase.from('chat_messages').insert({ session_id: sessionId, sender: 'visitor', message: msg })
    setSending(false)
  }

  function endChat() {
    localStorage.removeItem('naz_chat_session')
    setSessionId(null)
    setStep('name')
    setName('')
    setMessages([])
    setOpen(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* Chat panel */}
      {open && (
        <div className="w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden" style={{ height: 440 }}>
          {/* Header */}
          <div className="bg-[#0a1931] text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-semibold">Naz Optical Support</span>
            </div>
            <div className="flex items-center gap-2">
              {step === 'chat' && (
                <button onClick={endChat} className="text-white/60 hover:text-white text-xs">End</button>
              )}
              <button onClick={() => setOpen(false)}>
                <X className="w-4 h-4 text-white/70 hover:text-white" />
              </button>
            </div>
          </div>

          {step === 'name' ? (
            /* Name entry */
            <div className="flex flex-col flex-1 items-center justify-center p-6 gap-4">
              <div className="text-center">
                <p className="font-semibold text-gray-800">Start a conversation</p>
                <p className="text-xs text-gray-400 mt-1">We usually reply within a few minutes</p>
              </div>
              <input
                autoFocus
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && startChat()}
                placeholder="Your name"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#0a1931]"
              />
              <button
                onClick={startChat}
                disabled={!name.trim()}
                className="w-full bg-[#0a1931] text-white rounded-lg py-2 text-sm font-semibold disabled:opacity-40 hover:bg-[#0a1931]/90 transition-colors"
              >
                Start Chat
              </button>
            </div>
          ) : (
            /* Chat messages */
            <>
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.sender === 'visitor' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === 'visitor'
                        ? 'bg-[#0a1931] text-white rounded-br-sm'
                        : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                    }`}>
                      {msg.message}
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="border-t border-gray-100 p-3 flex gap-2 flex-shrink-0">
                <input
                  value={text}
                  onChange={e => setText(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 border border-gray-200 rounded-full px-3 py-1.5 text-sm focus:outline-none focus:border-[#0a1931]"
                />
                <button
                  onClick={sendMessage}
                  disabled={!text.trim() || sending}
                  className="w-8 h-8 bg-[#0a1931] rounded-full flex items-center justify-center disabled:opacity-40 flex-shrink-0"
                >
                  {sending ? <Loader2 className="w-3.5 h-3.5 text-white animate-spin" /> : <Send className="w-3.5 h-3.5 text-white" />}
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-14 h-14 bg-[#0a1931] rounded-full shadow-lg flex items-center justify-center hover:bg-[#0a1931]/90 transition-colors"
      >
        {open ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
      </button>
    </div>
  )
}
