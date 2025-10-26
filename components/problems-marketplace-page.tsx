"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, ChevronDown, ChevronUp, Building2, Calendar, DollarSign, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for problems
const mockProblems = [
  {
    id: 1,
    title: "Controle por Spray para Vermes do Gado",
    company: "AgroBrasil Pecuária",
    companyLogo: "/agro-company-logo.jpg",
    category: ["Tecnologia Novel", "Melhoria de Processo"],
    partnershipModel: ["Pesquisa Patrocinada", "Co-desenvolvimento"],
    budget: "R$ 150.000 - R$ 300.000",
    deadline: "15 de Março, 2025",
    description: "Buscamos solução inovadora para controle de parasitas em bovinos através de aplicação por spray.",
    status: "Aberto",
  },
  {
    id: 2,
    title: "Otimização de Processos de Fermentação Industrial",
    company: "BioTech Solutions",
    companyLogo: "/biotech-company-logo.jpg",
    category: ["Melhoria de Processo", "Análise e Testes"],
    partnershipModel: ["Pesquisa Patrocinada", "Consultoria"],
    budget: "R$ 200.000 - R$ 400.000",
    deadline: "30 de Abril, 2025",
    description: "Necessitamos de expertise para otimizar nossos processos de fermentação e aumentar a eficiência.",
    status: "Aberto",
  },
  {
    id: 3,
    title: "Desenvolvimento de Embalagem Biodegradável",
    company: "EcoPackaging Ltda",
    companyLogo: "/eco-packaging-logo.jpg",
    category: ["Tecnologia Novel", "Co-desenvolvimento"],
    partnershipModel: ["Co-desenvolvimento", "Licenciamento"],
    budget: "R$ 100.000 - R$ 250.000",
    deadline: "20 de Maio, 2025",
    description: "Procuramos parceiros para desenvolver materiais de embalagem 100% biodegradáveis e sustentáveis.",
    status: "Aberto",
  },
  {
    id: 4,
    title: "Sistema de Monitoramento de Qualidade da Água",
    company: "AquaTech Monitoring",
    companyLogo: "/water-tech-logo.jpg",
    category: ["Tecnologia Novel", "Expertise"],
    partnershipModel: ["Pesquisa Patrocinada", "Investimento"],
    budget: "R$ 300.000 - R$ 500.000",
    deadline: "10 de Junho, 2025",
    description: "Desenvolvimento de sensores IoT para monitoramento em tempo real da qualidade da água.",
    status: "Aberto",
  },
  {
    id: 5,
    title: "Inteligência Artificial para Diagnóstico Médico",
    company: "MedAI Innovations",
    companyLogo: "/medical-ai-logo.jpg",
    category: ["Tecnologia Novel", "Expertise"],
    partnershipModel: ["Co-desenvolvimento", "Investimento"],
    budget: "R$ 500.000+",
    deadline: "15 de Julho, 2025",
    description: "Buscamos especialistas em IA para desenvolver sistema de diagnóstico assistido por computador.",
    status: "Aberto",
  },
  {
    id: 6,
    title: "Energia Solar para Áreas Rurais",
    company: "SolarRural Energia",
    companyLogo: "/solar-energy-logo.png",
    category: ["Melhoria de Processo", "Tecnologia Novel"],
    partnershipModel: ["Pesquisa Patrocinada", "Fornecimento"],
    budget: "R$ 250.000 - R$ 450.000",
    deadline: "25 de Agosto, 2025",
    description: "Desenvolvimento de soluções de energia solar adaptadas para comunidades rurais isoladas.",
    status: "Aberto",
  },
]

const filterCategories = {
  "Empresas Buscam": ["Tecnologia Novel", "Melhoria de Processo", "Análise e Testes", "Expertise"],
  "Modelos de Parceria": [
    "Pesquisa Patrocinada",
    "Co-desenvolvimento",
    "Licenciamento",
    "Consultoria",
    "Investimento",
    "Fornecimento",
  ],
  "Parceiros Elegíveis": ["Pesquisadores Acadêmicos", "Startups", "Fornecedores", "Consultores"],
}

export function ProblemsMarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [expandedFilters, setExpandedFilters] = useState<Record<string, boolean>>({
    "Empresas Buscam": true,
    "Modelos de Parceria": true,
    "Parceiros Elegíveis": false,
  })
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    "Empresas Buscam": [],
    "Modelos de Parceria": [],
    "Parceiros Elegíveis": [],
  })
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

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

  const toggleFilter = (category: string) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  const toggleFilterOption = (category: string, option: string) => {
    setSelectedFilters((prev) => {
      const current = prev[category] || []
      const updated = current.includes(option) ? current.filter((item) => item !== option) : [...current, option]
      return { ...prev, [category]: updated }
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header
        className={`border-b bg-white fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${isHeaderVisible ? "translate-y-0" : "-translate-y-full"}`}
      >
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
              <Link href="/problems" className="text-primary font-medium border-b-2 border-primary pb-1">
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

      <div className="pt-[104px]">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                Marketplace de Problemas
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Explore desafios reais de empresas buscando soluções inovadoras. Conecte-se com oportunidades de
                pesquisa e desenvolvimento.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Sort */}
        <section className="border-b bg-white">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-xl w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar problemas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Ordenar por:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded-md px-3 py-2 text-sm bg-white"
                >
                  <option value="recent">Mais Recentes</option>
                  <option value="deadline">Prazo Final</option>
                  <option value="budget">Orçamento</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-4">
                <h2 className="font-semibold text-lg">Filtros</h2>

                {Object.entries(filterCategories).map(([category, options]) => (
                  <div key={category} className="border rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleFilter(category)}
                      className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <span className="font-medium text-sm">{category}</span>
                      {expandedFilters[category] ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>

                    {expandedFilters[category] && (
                      <div className="p-4 space-y-2 bg-white">
                        {options.map((option) => (
                          <label key={option} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedFilters[category]?.includes(option) || false}
                              onChange={() => toggleFilterOption(category, option)}
                              className="rounded border-gray-300"
                            />
                            <span className="text-sm">{option}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </aside>

            {/* Problems Grid */}
            <main className="flex-1">
              <div className="mb-6">
                <p className="text-sm text-muted-foreground">Mostrando {mockProblems.length} problemas</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {mockProblems.map((problem) => (
                  <Card key={problem.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start gap-4 mb-4">
                        <Image
                          src={problem.companyLogo || "/placeholder.svg"}
                          alt={problem.company}
                          width={60}
                          height={60}
                          className="rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{problem.company}</span>
                          </div>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {problem.status}
                          </Badge>
                        </div>
                      </div>
                      <CardTitle className="text-xl mb-2 text-balance">{problem.title}</CardTitle>
                      <CardDescription className="text-pretty">{problem.description}</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {problem.category.map((cat) => (
                          <Badge key={cat} variant="outline" className="text-xs">
                            {cat}
                          </Badge>
                        ))}
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <DollarSign className="h-4 w-4" />
                          <span>{problem.budget}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>Prazo: {problem.deadline}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>{problem.partnershipModel.join(", ")}</span>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link href={`/problems/${problem.id}`}>Ver Detalhes</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
