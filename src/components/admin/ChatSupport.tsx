'use client'

import { useState, useEffect, useRef } from 'react'
import { Send, Loader2, CheckCheck } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Session {
  id:           string
  visitor_name: string
  status:       string
  created_at:   string
}

interface Message {
  id:        string
  sender:    string
  message:   string
  created_at: string
}

export function ChatSupport() {
  const [sessions, setSessions]   = useState<Session[]>([])
  const [active, setActive]       = useState<Session | null>(null)
  const [messages, setMessages]   = useState<Message[]>([])
  const [reply, setReply]         = useState('')
  const [sending, setSending]     = useState(false)
  const bottomRef                 = useRef<HTMLDivElement>(null)

  // Load sessions + subscribe to new ones
  useEffect(() => {
    const supabase = createClient()

    supabase.from('chat_sessions').select('*').eq('status', 'open').order('created_at', { ascending: false }).then(({ data }) => {
      if (data) setSessions(data as Session[])
    })

    const channel = supabase
      .channel('admin:sessions')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_sessions' },
        payload => setSessions(prev => [payload.new as Session, ...prev])
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  // Load messages for active session + subscribe
  useEffect(() => {
    if (!active) return
    const supabase = createClient()

    supabase.from('chat_messages').select('*').eq('session_id', active.id).order('created_at').then(({ data }) => {
      if (data) setMessages(data as Message[])
    })

    const channel = supabase
      .channel(`admin:chat:${active.id}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages', filter: `session_id=eq.${active.id}` },
        payload => setMessages(prev => [...prev, payload.new as Message])
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [active])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendReply() {
    if (!reply.trim() || !active) return
    setSending(true)
    const msg = reply.trim()
    setReply('')
    const tempMsg: Message = { id: crypto.randomUUID(), sender: 'admin', message: msg, created_at: new Date().toISOString() }
    setMessages(prev => [...prev, tempMsg])
    const supabase = createClient()
    await supabase.from('chat_messages').insert({ session_id: active.id, sender: 'admin', message: msg })
    setSending(false)
  }

  async function closeSession(id: string) {
    const supabase = createClient()
    await supabase.from('chat_sessions').update({ status: 'closed' }).eq('id', id)
    setSessions(prev => prev.filter(s => s.id !== id))
    if (active?.id === id) { setActive(null); setMessages([]) }
  }

  function formatTime(iso: string) {
    return new Date(iso).toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="flex gap-0 h-[560px] rounded-xl border border-gray-200 overflow-hidden">

      {/* Sessions sidebar */}
      <div className="w-56 border-r border-gray-100 flex flex-col flex-shrink-0">
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Live Chats</p>
          <p className="text-xs text-gray-400 mt-0.5">{sessions.length} open</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {sessions.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-8 px-3">No active chats yet</p>
          ) : (
            sessions.map(s => (
              <button
                key={s.id}
                onClick={() => setActive(s)}
                className={`w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${active?.id === s.id ? 'bg-blue-50 border-l-2 border-l-[#0a1931]' : ''}`}
              >
                <p className="text-sm font-semibold text-gray-800 truncate">{s.visitor_name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{formatTime(s.created_at)}</p>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Chat area */}
      {active ? (
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
            <div>
              <p className="text-sm font-semibold text-gray-800">{active.visitor_name}</p>
              <p className="text-xs text-green-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block" /> Active
              </p>
            </div>
            <button
              onClick={() => closeSession(active.id)}
              className="text-xs text-red-500 hover:text-red-700 font-medium border border-red-200 rounded-lg px-3 py-1 transition-colors"
            >
              Close Chat
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'admin'
                    ? 'bg-[#0a1931] text-white rounded-br-sm'
                    : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                }`}>
                  <p>{msg.message}</p>
                  <p className={`text-xs mt-1 ${msg.sender === 'admin' ? 'text-white/50' : 'text-gray-400'}`}>{formatTime(msg.created_at)}</p>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Reply input */}
          <div className="border-t border-gray-100 p-3 flex gap-2 flex-shrink-0">
            <input
              value={reply}
              onChange={e => setReply(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendReply()}
              placeholder={`Reply to ${active.visitor_name}…`}
              className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#0a1931]"
            />
            <button
              onClick={sendReply}
              disabled={!reply.trim() || sending}
              className="w-9 h-9 bg-[#0a1931] rounded-full flex items-center justify-center disabled:opacity-40 flex-shrink-0"
            >
              {sending ? <Loader2 className="w-4 h-4 text-white animate-spin" /> : <Send className="w-4 h-4 text-white" />}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <CheckCheck className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Select a chat to reply</p>
          </div>
        </div>
      )}
    </div>
  )
}
