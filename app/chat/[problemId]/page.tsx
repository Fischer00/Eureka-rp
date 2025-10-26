"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Send, Paperclip, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"

// Mock chat messages
const mockMessages = [
  {
    id: 1,
    sender: "company",
    senderName: "AgroBrasil Pecuária",
    avatar: "/agro-company-logo.jpg",
    message: "Olá! Obrigado pelo interesse no nosso problema. Você tem experiência com controle de parasitas?",
    timestamp: "10:30",
    date: "Hoje",
  },
  {
    id: 2,
    sender: "researcher",
    senderName: "Dr. João Silva",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "Sim, tenho 8 anos de experiência em parasitologia veterinária. Trabalhei em projetos similares na UFRGS.",
    timestamp: "10:35",
    date: "Hoje",
  },
  {
    id: 3,
    sender: "company",
    senderName: "AgroBrasil Pecuária",
    avatar: "/agro-company-logo.jpg",
    message: "Excelente! Poderia nos contar mais sobre os métodos que você utilizou nesses projetos?",
    timestamp: "10:40",
    date: "Hoje",
  },
  {
    id: 4,
    sender: "researcher",
    senderName: "Dr. João Silva",
    avatar: "/placeholder.svg?height=40&width=40",
    message:
      "Claro! Desenvolvi um sistema de aplicação por spray usando nanopartículas que aumentou a eficácia em 40% comparado aos métodos tradicionais. Posso enviar o paper publicado.",
    timestamp: "10:45",
    date: "Hoje",
  },
  {
    id: 5,
    sender: "company",
    senderName: "AgroBrasil Pecuária",
    avatar: "/agro-company-logo.jpg",
    message:
      "Isso seria ótimo! Estamos muito interessados. Quando você estaria disponível para uma reunião mais detalhada?",
    timestamp: "10:50",
    date: "Hoje",
  },
]

export default function ChatPage({ params }: { params: { problemId: string } }) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState(mockMessages)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    const newMessage = {
      id: messages.length + 1,
      sender: "researcher",
      senderName: "Dr. João Silva",
      avatar: "/placeholder.svg?height=40&width=40",
      message: message,
      timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      date: "Hoje",
    }

    setMessages([...messages, newMessage])
    setMessage("")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/eureca-logo.jpeg"
                alt="Eureka Logo"
                width={96}
                height={96}
                className="h-24 w-auto object-contain"
                style={{ mixBlendMode: "multiply", filter: "contrast(1.1) brightness(1.05)" }}
              />
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/problems" className="text-muted-foreground hover:text-foreground transition-colors">
                Problemas
              </Link>
              <Link href="/solutions" className="text-muted-foreground hover:text-foreground transition-colors">
                Soluções
              </Link>
              <Link href="/researchers" className="text-muted-foreground hover:text-foreground transition-colors">
                Pesquisadores
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                Sobre
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              <Button variant="outline">Entrar</Button>
              <Button asChild>
                <Link href="/register">Cadastrar</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Header */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/problems">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <div className="flex items-center gap-3">
                <Image src="/agro-company-logo.jpg" alt="AgroBrasil" width={48} height={48} className="rounded-full" />
                <div>
                  <h2 className="font-semibold">AgroBrasil Pecuária</h2>
                  <p className="text-sm text-muted-foreground">Controle por Spray para Vermes do Gado</p>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-muted/20">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="space-y-6">
            {messages.map((msg, index) => {
              const showDate = index === 0 || messages[index - 1].date !== msg.date

              return (
                <div key={msg.id}>
                  {showDate && (
                    <div className="flex justify-center mb-4">
                      <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">{msg.date}</span>
                    </div>
                  )}

                  <div className={`flex gap-3 ${msg.sender === "researcher" ? "flex-row-reverse" : ""}`}>
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      <Image
                        src={msg.avatar || "/placeholder.svg"}
                        alt={msg.senderName}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </Avatar>

                    <div className={`flex flex-col ${msg.sender === "researcher" ? "items-end" : "items-start"}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">{msg.senderName}</span>
                        <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                      </div>
                      <div
                        className={`rounded-2xl px-4 py-2 max-w-md ${
                          msg.sender === "researcher"
                            ? "bg-primary text-primary-foreground"
                            : "bg-white border shadow-sm"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{msg.message}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="border-t bg-white">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <Button type="button" variant="ghost" size="icon">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={!message.trim()}>
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
