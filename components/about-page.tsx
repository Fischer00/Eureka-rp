"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Lightbulb, Target, Rocket, CheckCircle2, Building2, GraduationCap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function AboutPage() {
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
              <Link
                href="/problems"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Problemas
              </Link>
              <Link
                href="/solutions"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Soluções
              </Link>
              <Link
                href="/researchers"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Pesquisadores
              </Link>
              <Button asChild>
                <Link href="/problems">Começar</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="pt-[104px]">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary py-24 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Lightbulb className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium">Conectando Inovação e Pesquisa</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
                A Plataforma Completa para Resolver Desafios Científicos
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 text-pretty leading-relaxed">
                Conectamos empresas com problemas complexos a pesquisadores com soluções inovadoras. Acelere a inovação,
                encontre expertise especializada e transforme desafios em oportunidades.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="text-lg">
                  <Link href="/problems">
                    Explorar Problemas <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                >
                  <Link href="/register">Cadastrar como Pesquisador</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Problemas Resolvidos</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">1,200+</div>
                <div className="text-sm text-muted-foreground">Pesquisadores Ativos</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">85%</div>
                <div className="text-sm text-muted-foreground">Taxa de Sucesso</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">30+</div>
                <div className="text-sm text-muted-foreground">Áreas de Expertise</div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Como Funciona</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Um processo simples e eficiente para conectar problemas a soluções
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="p-8 text-center border-2 hover:border-primary transition-colors">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">1. Empresas Publicam</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Empresas compartilham seus desafios científicos e técnicos, definindo critérios e orçamento
                </p>
              </Card>
              <Card className="p-8 text-center border-2 hover:border-primary transition-colors">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <GraduationCap className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-3">2. Pesquisadores Respondem</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Pesquisadores qualificados analisam os problemas e submetem suas propostas de solução
                </p>
              </Card>
              <Card className="p-8 text-center border-2 hover:border-primary transition-colors">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Rocket className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3">3. Inovação Acontece</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Colaboração entre empresa e pesquisador resulta em soluções inovadoras e impactantes
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Value Propositions */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* For Companies */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold">Para Empresas</h2>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold mb-1">Acesso a Expertise Global</div>
                      <div className="text-muted-foreground text-sm">
                        Conecte-se com pesquisadores especializados de todo o mundo
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold mb-1">Soluções Inovadoras</div>
                      <div className="text-muted-foreground text-sm">
                        Receba propostas criativas baseadas em pesquisa de ponta
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold mb-1">Processo Transparente</div>
                      <div className="text-muted-foreground text-sm">
                        Acompanhe propostas, avalie candidatos e gerencie projetos facilmente
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold mb-1">Flexibilidade de Parceria</div>
                      <div className="text-muted-foreground text-sm">
                        Escolha entre diversos modelos de colaboração e investimento
                      </div>
                    </div>
                  </li>
                </ul>
                <Button asChild className="mt-8" size="lg">
                  <Link href="/problems">
                    Publicar um Problema <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              {/* For Researchers */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold">Para Pesquisadores</h2>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold mb-1">Problemas Reais do Mercado</div>
                      <div className="text-muted-foreground text-sm">
                        Trabalhe em desafios concretos com impacto direto na indústria
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold mb-1">Financiamento para Pesquisa</div>
                      <div className="text-muted-foreground text-sm">
                        Receba recursos para desenvolver suas ideias e projetos
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold mb-1">Networking Estratégico</div>
                      <div className="text-muted-foreground text-sm">
                        Construa relacionamentos valiosos com líderes da indústria
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold mb-1">Visibilidade Profissional</div>
                      <div className="text-muted-foreground text-sm">
                        Destaque sua expertise e construa sua reputação científica
                      </div>
                    </div>
                  </li>
                </ul>
                <Button asChild className="mt-8" size="lg" variant="secondary">
                  <Link href="/register">
                    Cadastrar como Pesquisador <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Target className="h-16 w-16 text-primary mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossa Missão</h2>
              </div>
              <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 to-secondary/5 border-2">
                <p className="text-lg md:text-xl text-center leading-relaxed text-muted-foreground mb-6">
                  O EURECA nasceu da visão de criar uma ponte entre o mundo acadêmico e o empresarial, democratizando o
                  acesso à inovação científica e tecnológica.
                </p>
                <p className="text-lg md:text-xl text-center leading-relaxed text-muted-foreground">
                  Acreditamos que os maiores avanços acontecem quando problemas reais encontram mentes brilhantes. Nossa
                  plataforma facilita essas conexões, acelerando a inovação e criando valor para empresas, pesquisadores
                  e sociedade.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-secondary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para Começar?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
              Junte-se a centenas de empresas e pesquisadores que já estão transformando desafios em oportunidades
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg">
                <Link href="/problems">
                  Explorar Problemas <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              >
                <Link href="/register">Cadastrar como Pesquisador</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-muted/30 py-12 border-t">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-3">
                <Image
                  src="/eureca-logo.jpeg"
                  alt="Eureka Logo"
                  width={60}
                  height={60}
                  className="h-15 w-15 object-contain"
                  style={{ mixBlendMode: "multiply" }}
                />
                <div className="text-sm text-muted-foreground">© 2025 EURECA. Conectando inovação e pesquisa.</div>
              </div>
              <nav className="flex gap-6">
                <Link href="/problems" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Problemas
                </Link>
                <Link href="/solutions" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Soluções
                </Link>
                <Link
                  href="/researchers"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Pesquisadores
                </Link>
              </nav>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
