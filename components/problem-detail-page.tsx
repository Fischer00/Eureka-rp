"use client"

import type React from "react"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  Building2,
  Calendar,
  DollarSign,
  Clock,
  Beaker,
  FileText,
  CheckCircle2,
  XCircle,
  Send,
  Upload,
  Lightbulb,
  Target,
  AlertCircle,
  ChevronDown,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Problem {
  id: string
  title: string
  company: string
  budget: number
  deadline: string
  area: string
  description: string
  lookingFor: string[]
  notLookingFor: string[]
  submissionGuide: string
  proposalsCount: number
  status: "open" | "closed"
  publishedDate: string
}

const mockProblem: Problem = {
  id: "1",
  title: "Controle por Spray para Vermes do Gado",
  company: "AgroBrasil Pecuária",
  budget: 250000,
  deadline: "6 meses",
  area: "Biotecnologia Veterinária",
  description:
    "A mosca-varejeira (Cochliomyia hominivorax) é um parasita destrutivo do gado e outros animais de sangue quente. As fêmeas depositam ovos em feridas abertas, e as larvas se alimentam de tecido vivo, causando danos graves, infecções secundárias, perda de peso e morte potencial. Em situações de surto, inspeções e tratamentos diários são necessários, colocando um grande fardo sobre os produtores.\n\nO controle atual depende de sprays de feridas que combinam ativos inseticidas com corantes violeta. O corante permite o rastreamento visual de animais tratados, o que é crítico em rebanhos grandes ou extensivos. No entanto, muitos produtos disponíveis dependem de químicas que levantam preocupações. Formulações mais antigas à base de organofosforados carregam riscos significativos de toxicidade para animais, humanos e o meio ambiente, e seu uso é cada vez mais restrito. Outros contêm violeta de genciana, que está sob escrutínio devido a preocupações de resíduos e segurança em animais produtores de alimentos. Essas desvantagens destacam a necessidade de abordagens mais seguras para o tratamento de feridas e controle de vermes.\n\nAtivos alternativos estão disponíveis para controle de parasitas em gado, mas não foram formulados em tratamentos seguras, eficazes e visivelmente rastreáveis poderia reduzir a dependência de compostos problemáticos, melhorar o bem-estar animal e fortalecer a capacidade de responder efetivamente a infestações de vermes, seja em contenção de surtos ou manejo rotineiro de rebanhos.",
  lookingFor: [
    "Formulação spray usando doramectina",
    "Formulação spray usando moxidectina",
    "Formulação spray usando fipronil",
    "Formulação spray usando espinosade",
    "Formulação combinada usando dois ou mais ativos aprovados",
  ],
  notLookingFor: [
    "Soluções que não incluam marcador visual para rastreamento",
    "Produtos que não sejam aplicáveis por spray",
    "Formulações que usem organofosforados ou violeta de genciana",
    "Soluções que não sejam seguras para uso em animais produtores de alimentos",
    "Abordagens que não tenham eficácia comprovada contra larvas de mosca-varejeira",
  ],
  submissionGuide:
    "Para enviar sua solução, preencha o formulário ao lado com uma descrição detalhada de sua abordagem. Inclua informações sobre a formulação proposta, mecanismo de ação, dados de eficácia (se disponíveis), perfil de segurança e viabilidade de implementação. Anexe documentos técnicos, estudos de caso ou publicações relevantes que suportem sua proposta. Nossa equipe técnica revisará todas as submissões e entrará em contato com os pesquisadores selecionados para discussões mais detalhadas.",
  proposalsCount: 12,
  status: "open",
  publishedDate: "15 de Janeiro, 2025",
}

export function ProblemDetailPage() {
  const [isContentExpanded, setIsContentExpanded] = useState(false)
  const [isProblemExpanded, setIsProblemExpanded] = useState(false)
  const [isLookingForExpanded, setIsLookingForExpanded] = useState(false)
  const [isNotLookingForExpanded, setIsNotLookingForExpanded] = useState(false)
  const [isSubmissionExpanded, setIsSubmissionExpanded] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    institution: "",
    description: "",
    files: null as FileList | null,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitting solution:", formData)
    // Handle form submission
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/eureca-logo.jpeg"
                  alt="Eureka Logo"
                  width={96}
                  height={96}
                  className="h-24 w-auto object-contain"
                  style={{
                    mixBlendMode: "multiply",
                    filter: "contrast(1.1) brightness(1.05)",
                  }}
                  priority
                />
              </Link>

              <nav className="hidden md:flex items-center gap-6">
                <Link
                  href="/problems"
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  Problemas
                </Link>
                <Link
                  href="/solutions"
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  Soluções
                </Link>
                <Link
                  href="/researchers"
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  Pesquisadores
                </Link>
              </nav>
            </div>
            <Link href="/register">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Publicar Problema</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Back Navigation */}
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-3">
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Todos os problemas
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <button
        onClick={() => setIsContentExpanded(!isContentExpanded)}
        className="w-full bg-gradient-to-br from-primary via-primary to-secondary text-primary-foreground hover:opacity-95 transition-opacity"
      >
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <Badge className="mb-4 bg-accent text-accent-foreground hover:bg-accent/90">Problema Aberto</Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{mockProblem.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-primary-foreground/90">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    <span className="text-sm font-medium">{mockProblem.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{mockProblem.publishedDate}</span>
                  </div>
                </div>
              </div>
              <ChevronDown
                className={`h-8 w-8 text-primary-foreground/80 transition-transform shrink-0 mt-2 ${
                  isContentExpanded ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>
        </div>
      </button>

      {/* Main Content */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isContentExpanded ? "max-h-[10000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Background Section */}
              <section>
                <button
                  onClick={() => setIsProblemExpanded(!isProblemExpanded)}
                  className="flex items-center gap-3 mb-6 w-full group"
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    <AlertCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">O Problema</h2>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground transition-transform ml-auto ${
                      isProblemExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isProblemExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="prose prose-lg max-w-none">
                    <p className="text-foreground/80 leading-relaxed whitespace-pre-line">{mockProblem.description}</p>
                  </div>
                </div>
              </section>

              {/* What We're Looking For */}
              <section>
                <button
                  onClick={() => setIsLookingForExpanded(!isLookingForExpanded)}
                  className="flex items-center gap-3 mb-6 w-full group"
                >
                  <div className="p-2 rounded-lg bg-secondary/10">
                    <Target className="h-6 w-6 text-secondary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">O Que Procuramos</h2>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground transition-transform ml-auto ${
                      isLookingForExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isLookingForExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <Card className="border-secondary/20 bg-secondary/5">
                    <CardContent className="pt-6">
                      <p className="text-foreground/80 mb-4">
                        Estamos procurando por um tratamento de feridas aplicável por spray para gado que combine um
                        ativo inseticida seguro e eficaz com um marcador de corante visível para controle de vermes.
                        Idealmente, este seria um produto comercial existente disponível na América Latina (com
                        prioridade para o Brasil), mas também consideraremos oportunidades comerciais globais ou
                        candidatos de desenvolvimento em estágio avançado.
                      </p>
                      <p className="text-sm font-semibold text-foreground mb-3">Soluções de interesse incluem:</p>
                      <ul className="space-y-2">
                        {mockProblem.lookingFor.map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                            <span className="text-foreground/80">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* What We're Not Looking For */}
              <section>
                <button
                  onClick={() => setIsNotLookingForExpanded(!isNotLookingForExpanded)}
                  className="flex items-center gap-3 mb-6 w-full group"
                >
                  <div className="p-2 rounded-lg bg-destructive/10">
                    <XCircle className="h-6 w-6 text-destructive" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">O Que Não Procuramos</h2>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground transition-transform ml-auto ${
                      isNotLookingForExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isNotLookingForExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <Card className="border-destructive/20 bg-destructive/5">
                    <CardContent className="pt-6">
                      <ul className="space-y-2">
                        {mockProblem.notLookingFor.map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                            <span className="text-foreground/80">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* How to Submit */}
              <section>
                <button
                  onClick={() => setIsSubmissionExpanded(!isSubmissionExpanded)}
                  className="flex items-center gap-3 mb-6 w-full group"
                >
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Lightbulb className="h-6 w-6 text-accent" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Como Enviar</h2>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground transition-transform ml-auto ${
                      isSubmissionExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isSubmissionExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-foreground/80 leading-relaxed">{mockProblem.submissionGuide}</p>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </div>

            {/* Right Column - Sticky Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Metadata Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Detalhes do Problema</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <DollarSign className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Orçamento</p>
                        <p className="text-lg font-semibold text-foreground">
                          R$ {mockProblem.budget.toLocaleString("pt-BR")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-secondary/10">
                        <Clock className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Prazo</p>
                        <p className="text-lg font-semibold text-foreground">{mockProblem.deadline}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-accent/10">
                        <Beaker className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Área</p>
                        <p className="text-lg font-semibold text-foreground">{mockProblem.area}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-muted">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Propostas Recebidas</p>
                        <p className="text-lg font-semibold text-foreground">{mockProblem.proposalsCount}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Submission Form Card */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Enviar Solução</CardTitle>
                    <CardDescription>Preencha o formulário abaixo para enviar sua proposta</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input
                          id="name"
                          placeholder="Seu nome"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="seu@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="institution">Instituição</Label>
                        <Input
                          id="institution"
                          placeholder="Universidade ou empresa"
                          value={formData.institution}
                          onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Descrição da Solução</Label>
                        <Textarea
                          id="description"
                          placeholder="Descreva sua abordagem em detalhes..."
                          rows={6}
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          required
                        />
                        <p className="text-xs text-muted-foreground">{formData.description.length} caracteres</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="files">Documentos Anexos</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id="files"
                            type="file"
                            multiple
                            onChange={(e) => setFormData({ ...formData, files: e.target.files })}
                            className="cursor-pointer"
                          />
                          <Upload className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <p className="text-xs text-muted-foreground">PDF, DOC, ou DOCX (máx. 10MB)</p>
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                      >
                        <Send className="h-4 w-4" />
                        Enviar Proposta
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
