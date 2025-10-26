"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Heart, MessageCircle, Share2, Bookmark, Beaker, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for solution posts
const mockPosts = [
  {
    id: 1,
    researcher: {
      name: "Dra. Ana Silva",
      photo: "/professional-woman-scientist.png",
      institution: "USP",
      title: "Pesquisadora em Biotecnologia",
    },
    timestamp: "Há 2 horas",
    content:
      "Estou animada em compartilhar o progresso do nosso Sistema de Spray Inteligente para Controle de Parasitas! 🎯\n\nApós 3 meses de desenvolvimento intenso, alcançamos 65% de conclusão. O sistema utiliza sensores IoT e Machine Learning para detectar infestações precocemente e aplicar antiparasitários de forma automatizada.\n\nPrincipais conquistas até agora:\n✅ Algoritmo de detecção com 92% de precisão\n✅ Redução de 40% no uso de produtos químicos\n✅ Integração bem-sucedida com sistemas de gestão de fazendas\n\nEm parceria com AgroBrasil Pecuária. Previsão de conclusão: Junho 2025.",
    problem: "Controle por Spray para Vermes do Gado",
    company: "AgroBrasil Pecuária",
    technologies: ["IoT", "Machine Learning", "Biotecnologia"],
    category: "Agropecuária",
    progress: 65,
    currentStage: 2,
    totalStages: 4,
    stages: ["Pesquisa", "Desenvolvimento", "Testes", "Implementação"],
    likes: 127,
    comments: 23,
    shares: 8,
    isLiked: false,
    image: "/smart-spray-system-iot-sensors-cattle-farm.jpg",
  },
  {
    id: 2,
    researcher: {
      name: "Dr. Carlos Mendes",
      photo: "/professional-scientist.png",
      institution: "UNICAMP",
      title: "Especialista em Automação Industrial",
    },
    timestamp: "Há 5 horas",
    content:
      "Grande marco alcançado! 🚀\n\nNosso sistema de controle adaptativo para fermentação industrial entrou em fase de testes com resultados impressionantes:\n\n📊 Aumento de 40% na eficiência\n⚡ Redução de 30% no tempo de processo\n💰 Economia de 25% em custos operacionais\n\nA IA está aprendendo e se adaptando em tempo real aos parâmetros de fermentação. Estamos a 85% da conclusão e os testes em escala industrial começam na próxima semana!\n\nObrigado à equipe da BioTech Solutions pela confiança neste projeto.",
    problem: "Otimização de Processos de Fermentação Industrial",
    company: "BioTech Solutions",
    technologies: ["IA", "Automação Industrial", "Bioquímica"],
    category: "Biotecnologia",
    progress: 85,
    currentStage: 3,
    totalStages: 4,
    stages: ["Pesquisa", "Desenvolvimento", "Testes", "Implementação"],
    likes: 243,
    comments: 45,
    shares: 19,
    isLiked: true,
    image: "/industrial-fermentation-control-system-ai-automati.jpg",
  },
  {
    id: 3,
    researcher: {
      name: "Dra. Mariana Costa",
      photo: "/professional-woman-researcher.png",
      institution: "UFRJ",
      title: "Pesquisadora em Biomateriais",
    },
    timestamp: "Há 1 dia",
    content:
      "Protótipo concluído! 🌊♻️\n\nApós meses de pesquisa, finalmente desenvolvemos um bioplástico de algas marinhas com propriedades mecânicas superiores aos plásticos convencionais!\n\nCaracterísticas do material:\n🌱 100% biodegradável em 90 dias\n💪 Resistência 30% superior ao plástico comum\n🌊 Produzido a partir de algas cultivadas sustentavelmente\n🔬 Processamento usando nanotecnologia verde\n\nEstamos a 90% da conclusão e já iniciamos conversas para produção em escala com a EcoPackaging. O futuro é sustentável!",
    problem: "Desenvolvimento de Embalagem Biodegradável",
    company: "EcoPackaging Ltda",
    technologies: ["Nanotecnologia", "Biomateriais", "Química Verde"],
    category: "Sustentabilidade",
    progress: 90,
    currentStage: 3,
    totalStages: 4,
    stages: ["Pesquisa", "Desenvolvimento", "Testes", "Implementação"],
    likes: 389,
    comments: 67,
    shares: 34,
    isLiked: false,
    image: "/biodegradable-seaweed-bioplastic-sustainable-packa.jpg",
  },
  {
    id: 4,
    researcher: {
      name: "Dr. Roberto Oliveira",
      photo: "/professional-man-ai-researcher.jpg",
      institution: "USP",
      title: "Especialista em IoT e Edge Computing",
    },
    timestamp: "Há 2 dias",
    content:
      "Progresso empolgante no nosso projeto de monitoramento de qualidade da água! 💧\n\nDesenvolvemos uma rede de sensores IoT de baixo custo (menos de R$ 200 por unidade) com análise em tempo real usando edge computing.\n\nO sistema já está detectando contaminantes com precisão de 96% e enviando alertas preditivos 48h antes de problemas críticos.\n\nPróximos passos: expandir a rede para 50 pontos de monitoramento e integrar com sistemas municipais de tratamento.\n\nEm parceria com AquaTech Monitoring.",
    problem: "Sistema de Monitoramento de Qualidade da Água",
    company: "AquaTech Monitoring",
    technologies: ["IoT", "Edge Computing", "Análise de Dados"],
    category: "Meio Ambiente",
    progress: 55,
    currentStage: 2,
    totalStages: 4,
    stages: ["Pesquisa", "Desenvolvimento", "Testes", "Implementação"],
    likes: 156,
    comments: 31,
    shares: 12,
    isLiked: true,
  },
  {
    id: 5,
    researcher: {
      name: "Dra. Juliana Santos",
      photo: "/professional-woman-energy-researcher.jpg",
      institution: "UFSC",
      title: "Pesquisadora em IA Médica",
    },
    timestamp: "Há 3 dias",
    content:
      "Resultados da validação clínica são extraordinários! 🏥🤖\n\nNosso sistema de IA para diagnóstico de imagens médicas alcançou:\n\n✨ 94% de precisão na detecção de anomalias\n⚡ 60% de redução no tempo de análise\n🎯 Zero falsos negativos em casos críticos\n\nJá analisamos mais de 10.000 exames em ambiente hospitalar real. Os médicos estão impressionados com a capacidade do sistema de identificar padrões sutis que passariam despercebidos.\n\nA tecnologia está salvando vidas! Próximo passo: aprovação regulatória.\n\nParceria: MedAI Innovations",
    problem: "Inteligência Artificial para Diagnóstico Médico",
    company: "MedAI Innovations",
    technologies: ["Deep Learning", "Visão Computacional", "Medicina"],
    category: "Saúde",
    progress: 75,
    currentStage: 3,
    totalStages: 4,
    stages: ["Pesquisa", "Desenvolvimento", "Testes", "Implementação"],
    likes: 512,
    comments: 89,
    shares: 45,
    isLiked: false,
    image: "/medical-ai-diagnosis-deep-learning-xray-analysis.jpg",
  },
  {
    id: 6,
    researcher: {
      name: "Dr. Fernando Lima",
      photo: "/professional-man-agriculture-researcher.jpg",
      institution: "ESALQ-USP",
      title: "Engenheiro de Energia Renovável",
    },
    timestamp: "Há 4 dias",
    content:
      "Piloto em campo superou todas as expectativas! ☀️⚡\n\nNossos painéis solares flexíveis para áreas rurais estão gerando 30% mais energia que os painéis convencionais, com custo 40% menor!\n\nInstalamos 50 unidades em comunidades rurais e os resultados são:\n\n🔋 Autonomia energética completa para 15 famílias\n💡 Redução de 100% nos custos com energia\n🌱 Economia de 12 toneladas de CO2/ano\n📱 Possibilidade de carregar dispositivos e bombas d'água\n\nA tecnologia está transformando vidas. Próxima fase: escalar para 500 instalações.\n\nParceria: SolarRural Energia",
    problem: "Energia Solar para Áreas Rurais",
    company: "SolarRural Energia",
    technologies: ["Energia Solar", "Materiais Avançados", "Engenharia"],
    category: "Energia",
    progress: 80,
    currentStage: 3,
    totalStages: 4,
    stages: ["Pesquisa", "Desenvolvimento", "Testes", "Implementação"],
    likes: 298,
    comments: 52,
    shares: 27,
    isLiked: true,
    image: "/flexible-solar-panels-rural-areas-renewable-energy.jpg",
  },
]

export function SolutionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [posts, setPosts] = useState(mockPosts)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const categories = Array.from(new Set(mockPosts.map((p) => p.category)))

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

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.researcher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = !selectedCategory || post.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          }
        }
        return post
      }),
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header
        className={`border-b bg-white fixed top-0 left-0 right-0 z-50 shadow-sm transition-transform duration-300 ${isHeaderVisible ? "translate-y-0" : "-translate-y-full"}`}
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
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Sobre
              </Link>
              <Link href="/problems" className="text-muted-foreground hover:text-foreground transition-colors">
                Problemas
              </Link>
              <Link href="/solutions" className="text-primary font-medium border-b-2 border-primary pb-1">
                Soluções
              </Link>
              <Link href="/researchers" className="text-muted-foreground hover:text-foreground transition-colors">
                Pesquisadores
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
        <section className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-12 border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
                <Beaker className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Feed de Inovação</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-balance">
                Soluções em Desenvolvimento
              </h1>
              <p className="text-muted-foreground text-pretty mb-6">
                Acompanhe atualizações em tempo real dos pesquisadores trabalhando em soluções inovadoras
              </p>

              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar posts, pesquisadores ou tecnologias..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-5 shadow-md"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="py-4 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="rounded-full"
              >
                Todos
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Feed */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-6">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    {/* Post Header */}
                    <div className="p-4 flex items-start gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={post.researcher.photo || "/placeholder.svg"} alt={post.researcher.name} />
                        <AvatarFallback>{post.researcher.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm">{post.researcher.name}</div>
                        <div className="text-xs text-muted-foreground">{post.researcher.title}</div>
                        <div className="text-xs text-muted-foreground">{post.researcher.institution}</div>
                        <div className="text-xs text-muted-foreground mt-1">{post.timestamp}</div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {post.category}
                      </Badge>
                    </div>

                    {/* Post Content */}
                    <div className="px-4 pb-4">
                      <p className="text-sm whitespace-pre-line leading-relaxed">{post.content}</p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {post.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      {/* Stages */}
                      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center justify-between text-sm mb-3">
                          <span className="text-muted-foreground font-medium">Etapa do Projeto</span>
                          <span className="font-bold text-primary">
                            {post.currentStage} de {post.totalStages}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {post.stages.map((stage, index) => (
                            <div key={stage} className="flex-1 flex flex-col items-center gap-1">
                              <div
                                className={`w-full h-2 rounded-full ${
                                  index < post.currentStage
                                    ? "bg-primary"
                                    : index === post.currentStage
                                      ? "bg-primary/50"
                                      : "bg-muted"
                                }`}
                              />
                              <span
                                className={`text-xs ${
                                  index < post.currentStage
                                    ? "text-primary font-medium"
                                    : index === post.currentStage
                                      ? "text-primary/70 font-medium"
                                      : "text-muted-foreground"
                                }`}
                              >
                                {stage}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Post Image */}
                    {post.image && (
                      <div className="relative w-full aspect-[2/1] bg-muted">
                        <Image src={post.image || "/placeholder.svg"} alt="Post image" fill className="object-cover" />
                      </div>
                    )}

                    {/* Engagement Stats */}
                    <div className="px-4 py-3 border-t flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                          {post.likes}
                        </span>
                        <span>{post.comments} comentários</span>
                        <span>{post.shares} compartilhamentos</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="px-4 py-2 border-t flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`flex-1 gap-2 ${post.isLiked ? "text-red-500" : ""}`}
                        onClick={() => handleLike(post.id)}
                      >
                        <Heart className={`h-5 w-5 ${post.isLiked ? "fill-red-500" : ""}`} />
                        <span className="hidden sm:inline">Curtir</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1 gap-2">
                        <MessageCircle className="h-5 w-5" />
                        <span className="hidden sm:inline">Comentar</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1 gap-2">
                        <Share2 className="h-5 w-5" />
                        <span className="hidden sm:inline">Compartilhar</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1 gap-2">
                        <Bookmark className="h-5 w-5" />
                        <span className="hidden sm:inline">Salvar</span>
                      </Button>
                      <Button size="sm" className="flex-1 gap-2 bg-accent hover:bg-accent/90 text-white">
                        <TrendingUp className="h-5 w-5" />
                        <span className="hidden sm:inline">Investir</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredPosts.length === 0 && (
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground text-lg mb-4">
                    Nenhum post encontrado com os filtros selecionados.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedCategory(null)
                    }}
                  >
                    Limpar Filtros
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary to-secondary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Faça Parte da Comunidade</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
              Compartilhe suas soluções, conecte-se com outros pesquisadores e empresas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/register">Cadastrar como Pesquisador</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              >
                <Link href="/problems">Ver Problemas Abertos</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
