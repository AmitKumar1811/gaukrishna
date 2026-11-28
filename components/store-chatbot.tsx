'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, ExternalLink, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/lib/cart-context'

interface ChatProduct {
  name: string
  price: number
  inStock: boolean
  href: string
}

interface ChatLink {
  label: string
  href: string
}

interface ChatMessage {
  id: string
  sender: 'user' | 'bot'
  text: string
  products?: ChatProduct[]
  links?: ChatLink[]
  suggestions?: string[]
}

const INITIAL_SUGGESTIONS = [
  'Chyawanprash Price',
  'A2 Ghee Benefits',
  'COD & Shipping',
  'Coconut Oil for Face',
  'Track Order',
]

function renderFormattedText(text: string) {
  return text.split('\n').map((line, lineIdx) => {
    const parts = line.split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
    return (
      <p key={lineIdx} className={lineIdx > 0 ? 'mt-1.5' : ''}>
        {parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i}>{part.slice(2, -2)}</strong>
          }
          if (part.startsWith('`') && part.endsWith('`')) {
            return (
              <code key={i} className="rounded bg-black/5 px-1 py-0.5 text-xs font-mono">
                {part.slice(1, -1)}
              </code>
            )
          }
          return <span key={i}>{part}</span>
        })}
      </p>
    )
  })
}

export function StoreChatbot() {
  const pathname = usePathname()
  const { totalItems } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Namaste! I am **Gau Krishna Sahayak**.\nAsk me about our **A2 Bilona Ghee**, **Chyawanprash**, **Oils**, **COD**, or paste your **Order ID (GK-...)** to track your delivery.',
      suggestions: INITIAL_SUGGESTIONS,
    },
  ])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isOpen])

  if (pathname?.startsWith('/login')) {
    return null
  }

  const isFloatingCartVisible =
    totalItems > 0 &&
    !pathname?.startsWith('/cart') &&
    !pathname?.startsWith('/checkout') &&
    !pathname?.startsWith('/order-success')

  const sendMessage = async (textToSend?: string) => {
    const query = (textToSend ?? input).trim()
    if (!query || isLoading) return

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
    }

    setMessages((prev) => [...prev, userMsg])
    if (!textToSend) setInput('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      })
      const data = await res.json()
      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: data.reply || 'How can I help you today?',
        products: data.products,
        links: data.links,
        suggestions: data.suggestions,
      }
      setMessages((prev) => [...prev, botMsg])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `b-err-${Date.now()}`,
          sender: 'bot',
          text: 'Connection issue. Please call **+91 97289 30001** or visit our Contact page.',
          links: [{ label: 'Contact Us', href: '/contact' }],
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[370px] h-[470px] max-h-[70vh] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200 ${
            isFloatingCartVisible ? 'bottom-52 sm:bottom-40' : 'bottom-36 sm:bottom-24'
          }`}
        >
          {/* Header */}
          <div className="bg-[#1a5f48] text-white px-4 py-3.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                <Bot className="h-5 w-5 text-[#d0c689]" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                  Gau Krishna Sahayak
                  <Sparkles className="h-3.5 w-3.5 text-[#d0c689]" />
                </h3>
                <p className="text-[11px] text-white/80">Instant Store &amp; Order Assistant</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="p-1.5 rounded-lg hover:bg-white/15 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f8faf7]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-[#1a5f48] text-white rounded-br-sm'
                      : 'bg-white text-gray-800 border border-gray-100 rounded-bl-sm'
                  }`}
                >
                  {renderFormattedText(msg.text)}
                </div>

                {/* Product Recommendations */}
                {msg.products && msg.products.length > 0 && (
                  <div className="mt-2 space-y-1.5 w-[88%]">
                    {msg.products.map((prod, idx) => (
                      <Link
                        key={idx}
                        href={prod.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white border border-gray-200 hover:border-[#1a5f48] transition-colors shadow-sm"
                      >
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-gray-900 truncate">{prod.name}</p>
                          <p className="text-xs text-[#1a5f48] font-bold">
                            ₹{prod.price.toLocaleString()}
                            {!prod.inStock && (
                              <span className="ml-2 text-red-600 font-normal">Out of stock</span>
                            )}
                          </p>
                        </div>
                        <ExternalLink className="h-3.5 w-3.5 text-[#1a5f48] shrink-0" />
                      </Link>
                    ))}
                  </div>
                )}

                {/* Action Links */}
                {msg.links && msg.links.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {msg.links.map((link, idx) => (
                      <Link
                        key={idx}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#dcf0e8] text-[#1a5f48] text-xs font-semibold hover:bg-[#1a5f48] hover:text-white transition-colors"
                      >
                        {link.label}
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    ))}
                  </div>
                )}

                {/* Quick Suggestions */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5 max-w-[95%]">
                    {msg.suggestions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => sendMessage(s)}
                        className="px-2.5 py-1 rounded-full bg-white border border-[#1a5f48]/30 text-[#1a5f48] text-xs font-medium hover:bg-[#dcf0e8] transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-start">
                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-3.5 py-2 text-xs text-gray-500 shadow-sm">
                  Typing...
                </div>
              </div>
            )}
          </div>

          {/* Direct Agent / WhatsApp Bar */}
          <div className="px-3 py-2 bg-[#f0f7f4] border-t border-gray-200 flex items-center justify-between gap-2 shrink-0">
            <a
              href="https://wa.me/919996990290?text=Namaste%20Gau%20Krishna%2C%20I%20need%20help%20with%20an%20order%20or%20product."
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs font-semibold transition-colors shadow-sm"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              WhatsApp Agent
            </a>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 hover:border-[#1a5f48] hover:text-[#1a5f48] text-xs font-semibold transition-colors"
            >
              Contact Us
            </Link>
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              sendMessage()
            }}
            className="p-3 bg-white border-t border-gray-200 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Ghee, COD, Order ID..."
              className="flex-1 text-sm px-3.5 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-[#1a5f48]"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
              className="p-2.5 rounded-full bg-[#1a5f48] text-white hover:bg-[#154d3b] disabled:opacity-50 transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close assistant' : 'Open Gau Krishna Assistant'}
        className={`fixed right-4 sm:right-6 z-50 flex items-center gap-2 bg-[#1a5f48] hover:bg-[#154d3b] text-white px-4 py-3 rounded-full shadow-2xl border-2 border-white/20 transition-all hover:scale-105 ${
          isFloatingCartVisible ? 'bottom-36 sm:bottom-24' : 'bottom-20 sm:bottom-6'
        }`}
      >
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <>
            <MessageCircle className="h-5 w-5 text-[#d0c689]" />
            <span className="text-xs sm:text-sm font-bold hidden sm:inline">Ask Us</span>
          </>
        )}
      </button>
    </>
  )
}
