"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Award, BookOpen, Mail, Linkedin, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Researcher {
  id: string
  name: string
  title: string
  institution: string
  location: string
  expertise: string[]
  achievements: string
  image: string
  email: string
  linkedin?: string
  solutionsCount: number
  successRate: number
}

const mockResearchers: Researcher[] = [
  {
    id: "1",
    name: "Dra. Ana Silva",
    title: "Pesquisadora Sênior em Biotecnologia",
    institution: "Universidade de São Paulo",
    location: "São Paulo, Brasil",
    expertise: ["Biotecnologia", "Genética", "Microbiologia"],
    achievements: "15+ anos de experiência, 50+ publicações",
    image: "/professional-woman-scientist.png",
    email: "ana.silva@usp.br",
    linkedin: "anasilva",
    solutionsCount: 12,
    successRate: 85,
  },
  {
    id: "2",
    name: "Dr. Carlos Mendes",
    title: "Professor de Engenharia Química",
    institution: "UNICAMP",
    location: "Campinas, Brasil",
    expertise: ["Química Industrial", "Processos", "Sustentabilidade"],
    achievements: "20+ anos de experiência, Prêmio Nacional de Inovação 2023",
    image: "/professional-scientist.png",
    email: "carlos.mendes@unicamp.br",
    linkedin: "carlosmendes",
    solutionsCount: 18,
    successRate: 92,
  },
  {
    id: "3",
    name: "Dra. Mariana Costa",
    title: "Especialista em Nanotecnologia",
    institution: "UFRJ",
    location: "Rio de Janeiro, Brasil",
    expertise: ["Nanotecnologia", "Materiais Avançados", "Biomedicina"],
    achievements: "10+ anos de experiência, 30+ patentes",
    image: "/professional-woman-researcher.png",
    email: "mariana.costa@ufrj.br",
    linkedin: "marianacosta",
    solutionsCount: 9,
    successRate: 88,
  },
  {
    id: "4",
    name: "Dr. Roberto Oliveira",
    title: "Pesquisador em Inteligência Artificial",
    institution: "USP",
    location: "São Paulo, Brasil",
    expertise: ["IA", "Machine Learning", "Visão Computacional"],
    achievements: "8+ anos de experiência, Fundador de 2 startups",
    image: "/professional-man-ai-researcher.jpg",
    email: "roberto.oliveira@usp.br",
    linkedin: "robertooliveira",
    solutionsCount: 15,
    successRate: 90,
  },
  {
    id: "5",
    name: "Dra. Juliana Santos",
    title: "Pesquisadora em Energia Renovável",
    institution: "UFSC",
    location: "Florianópolis, Brasil",
    expertise: ["Energia Solar", "Sustentabilidade", "Eficiência Energética"],
    achievements: "12+ anos de experiência, Coordenadora de projetos internacionais",
    image: "/professional-woman-energy-researcher.jpg",
    email: "juliana.santos@ufsc.br",
    linkedin: "julianasantos",
    solutionsCount: 11,
    successRate: 87,
  },
  {
    id: "6",
    name: "Dr. Fernando Lima",
    title: "Especialista em Agricultura de Precisão",
    institution: "ESALQ-USP",
    location: "Piracicaba, Brasil",
    expertise: ["Agronomia", "IoT", "Sensoriamento Remoto"],
    achievements: "18+ anos de experiência, Consultor para FAO",
    image: "/professional-man-agriculture-researcher.jpg",
    email: "fernando.lima@usp.br",
    linkedin: "fernandolima",
    solutionsCount: 14,
    successRate: 91,
  },
]

export function ResearchersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedExpertise, setSelectedExpertise] = useState<string | null>(null)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const allExpertise = Array.from(new Set(mockResearchers.flatMap((r) => r.expertise)))

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 50) {
        setIsHeaderVisible(true)
      } else {
        setIsHeaderVisible(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const filteredResearchers = mockResearchers.filter((researcher) => {
    const matchesSearch =
      researcher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      researcher.expertise.some((e) => e.toLowerCase().includes(searchQuery.toLowerCase())) ||
      researcher.institution.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesExpertise = !selectedExpertise || researcher.expertise.includes(selectedExpertise)

    return matchesSearch && matchesExpertise
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header
        className={`border-b border-border bg-card fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${isHeaderVisible ? "translate-y-0" : "-translate-y-full"}`}
      >
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
                  className="text-sm font-medium text-primary border-b-2 border-primary transition-colors"
                >
                  Pesquisadores
                </Link>
              </nav>
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <Link href="/register">Tornar-se Pesquisador</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary via-primary to-secondary text-primary-foreground pt-[104px]">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
              Conecte-se com <span className="text-accent">Pesquisadores</span> de Elite
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 text-pretty">
              Encontre especialistas qualificados prontos para resolver os desafios mais complexos da sua empresa
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar por nome, expertise ou instituição..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg bg-card text-foreground border-0 shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-medium text-muted-foreground">Filtrar por expertise:</span>
            <Button
              variant={selectedExpertise === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedExpertise(null)}
              className="rounded-full"
            >
              Todos
            </Button>
            {allExpertise.map((expertise) => (
              <Button
                key={expertise}
                variant={selectedExpertise === expertise ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedExpertise(expertise)}
                className="rounded-full"
              >
                {expertise}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-muted/50 border-b border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Pesquisadores Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">1,200+</div>
              <div className="text-muted-foreground">Soluções Entregues</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">89%</div>
              <div className="text-muted-foreground">Taxa de Sucesso</div>
            </div>
          </div>
        </div>
      </div>

      {/* Researchers Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            {filteredResearchers.length} Pesquisador{filteredResearchers.length !== 1 ? "es" : ""} Encontrado
            {filteredResearchers.length !== 1 ? "s" : ""}
          </h2>
          <p className="text-muted-foreground">Explore perfis de especialistas prontos para colaborar</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResearchers.map((researcher) => (
            <Card key={researcher.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-gradient-to-br from-primary/10 to-secondary/10">
                <Image
                  src={researcher.image || "/placeholder.svg"}
                  alt={researcher.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{researcher.name}</CardTitle>
                <CardDescription className="text-sm">{researcher.title}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2 text-sm">
                  <BookOpen className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{researcher.institution}</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{researcher.location}</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <Award className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{researcher.achievements}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {researcher.expertise.map((exp) => (
                    <Badge key={exp} variant="secondary" className="text-xs">
                      {exp}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div>
                    <div className="text-2xl font-bold text-primary">{researcher.solutionsCount}</div>
                    <div className="text-xs text-muted-foreground">Soluções</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary">{researcher.successRate}%</div>
                    <div className="text-xs text-muted-foreground">Taxa de Sucesso</div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button variant="outline" size="sm" className="flex-1 gap-2 bg-transparent" asChild>
                    <a href={`mailto:${researcher.email}`}>
                      <Mail className="h-4 w-4" />
                      Contato
                    </a>
                  </Button>
                  {researcher.linkedin && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={`https://linkedin.com/in/${researcher.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredResearchers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Nenhum pesquisador encontrado com os filtros selecionados.</p>
            <Button
              variant="outline"
              className="mt-4 bg-transparent"
              onClick={() => {
                setSearchQuery("")
                setSelectedExpertise(null)
              }}
            >
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-primary via-primary to-secondary text-primary-foreground">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Você é um Pesquisador?</h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Junte-se à nossa rede de especialistas e conecte-se com empresas que precisam das suas soluções
            </p>
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2" asChild>
              <Link href="/register">
                Cadastre-se Gratuitamente
                <ExternalLink className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
