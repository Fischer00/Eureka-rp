"use client"
import { useState } from "react"
import type React from "react"

import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"
import Link from "next/link"

export function RegistrationPage() {
  const [activeTab, setActiveTab] = useState("company")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/eureca-logo.jpeg"
                alt="Eureka Logo"
                width={80}
                height={80}
                className="h-20 w-20 object-contain"
                style={{ mixBlendMode: "multiply", filter: "contrast(1.1) brightness(1.05)" }}
              />
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Início
              </Link>
              <Link
                href="/problems"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Problemas
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Registration Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Criar Conta</h1>
              <p className="text-lg text-muted-foreground">
                Escolha o tipo de conta que melhor se adequa ao seu perfil
              </p>
            </div>

            <Card className="p-6 md:p-8">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="company" className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
                      <path d="M9 22v-4h6v4" />
                      <path d="M8 6h.01" />
                      <path d="M16 6h.01" />
                      <path d="M12 6h.01" />
                      <path d="M12 10h.01" />
                      <path d="M12 14h.01" />
                      <path d="M16 10h.01" />
                      <path d="M16 14h.01" />
                      <path d="M8 10h.01" />
                      <path d="M8 14h.01" />
                    </svg>
                    <span>Empresa</span>
                  </TabsTrigger>
                  <TabsTrigger value="researcher" className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                    <span>Pesquisador</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="company">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Cadastro de Empresa</h2>
                    <p className="text-sm text-muted-foreground">
                      Publique problemas e conecte-se com pesquisadores qualificados
                    </p>
                  </div>
                  <CompanyForm />
                </TabsContent>

                <TabsContent value="researcher">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Cadastro de Pesquisador</h2>
                    <p className="text-sm text-muted-foreground">
                      Encontre problemas reais e contribua com suas soluções inovadoras
                    </p>
                  </div>
                  <ResearcherForm />
                </TabsContent>
              </Tabs>
            </Card>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Já tem uma conta?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Fazer login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

function CompanyForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    companyName: "",
    cnpj: "",
    industry: "",
    companySize: "",
    website: "",
    description: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/register/company", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao criar conta")
      }

      setSuccess(true)
      setTimeout(() => router.push("/"), 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar conta. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-500 bg-green-50 text-green-900">
          <AlertDescription>Conta criada com sucesso! Redirecionando...</AlertDescription>
        </Alert>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="companyName">
            Nome da Empresa <span className="text-destructive">*</span>
          </Label>
          <Input
            id="companyName"
            placeholder="Ex: Inovação Tech Ltda"
            value={formData.companyName}
            onChange={(e) => handleChange("companyName", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cnpj">
            CNPJ <span className="text-destructive">*</span>
          </Label>
          <Input
            id="cnpj"
            placeholder="00.000.000/0000-00"
            value={formData.cnpj}
            onChange={(e) => handleChange("cnpj", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="industry">
            Setor de Atuação <span className="text-destructive">*</span>
          </Label>
          <Select value={formData.industry} onValueChange={(value) => handleChange("industry", value)}>
            <SelectTrigger id="industry">
              <SelectValue placeholder="Selecione o setor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tecnologia">Tecnologia</SelectItem>
              <SelectItem value="saude">Saúde</SelectItem>
              <SelectItem value="energia">Energia</SelectItem>
              <SelectItem value="agricultura">Agricultura</SelectItem>
              <SelectItem value="manufatura">Manufatura</SelectItem>
              <SelectItem value="financeiro">Financeiro</SelectItem>
              <SelectItem value="educacao">Educação</SelectItem>
              <SelectItem value="outro">Outro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="companySize">
            Porte da Empresa <span className="text-destructive">*</span>
          </Label>
          <Select value={formData.companySize} onValueChange={(value) => handleChange("companySize", value)}>
            <SelectTrigger id="companySize">
              <SelectValue placeholder="Selecione o porte" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="startup">Startup (1-10 funcionários)</SelectItem>
              <SelectItem value="pequena">Pequena (11-50 funcionários)</SelectItem>
              <SelectItem value="media">Média (51-250 funcionários)</SelectItem>
              <SelectItem value="grande">Grande (251+ funcionários)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          type="url"
          placeholder="https://www.suaempresa.com.br"
          value={formData.website}
          onChange={(e) => handleChange("website", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">
          Descrição da Empresa <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="description"
          placeholder="Conte-nos sobre sua empresa, áreas de atuação e principais desafios..."
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={4}
          required
        />
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Dados do Responsável</h3>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="contactName">
              Nome Completo <span className="text-destructive">*</span>
            </Label>
            <Input
              id="contactName"
              placeholder="Ex: João Silva"
              value={formData.contactName}
              onChange={(e) => handleChange("contactName", e.target.value)}
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="contactEmail">
                E-mail <span className="text-destructive">*</span>
              </Label>
              <Input
                id="contactEmail"
                type="email"
                placeholder="joao@empresa.com.br"
                value={formData.contactEmail}
                onChange={(e) => handleChange("contactEmail", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPhone">
                Telefone <span className="text-destructive">*</span>
              </Label>
              <Input
                id="contactPhone"
                type="tel"
                placeholder="(11) 98765-4321"
                value={formData.contactPhone}
                onChange={(e) => handleChange("contactPhone", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="password">
                Senha <span className="text-destructive">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Mínimo 8 caracteres"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                required
                minLength={8}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                Confirmar Senha <span className="text-destructive">*</span>
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Repita a senha"
                value={formData.confirmPassword}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                required
                minLength={8}
              />
            </div>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={isLoading || success}>
        {isLoading ? "Criando conta..." : success ? "Conta criada!" : "Criar Conta de Empresa"}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Ao criar uma conta, você concorda com nossos Termos de Uso e Política de Privacidade
      </p>
    </form>
  )
}

function ResearcherForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    academicTitle: "",
    institution: "",
    department: "",
    researchArea: "",
    expertise: "",
    orcid: "",
    lattes: "",
    bio: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/register/researcher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao criar conta")
      }

      setSuccess(true)
      setTimeout(() => router.push("/"), 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar conta. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-500 bg-green-50 text-green-900">
          <AlertDescription>Conta criada com sucesso! Redirecionando...</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="fullName">
          Nome Completo <span className="text-destructive">*</span>
        </Label>
        <Input
          id="fullName"
          placeholder="Ex: Dr. Maria Santos"
          value={formData.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email">
            E-mail <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="maria.santos@universidade.edu.br"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">
            Telefone <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(11) 98765-4321"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="academicTitle">
            Titulação Acadêmica <span className="text-destructive">*</span>
          </Label>
          <Select value={formData.academicTitle} onValueChange={(value) => handleChange("academicTitle", value)}>
            <SelectTrigger id="academicTitle">
              <SelectValue placeholder="Selecione sua titulação" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="graduacao">Graduação</SelectItem>
              <SelectItem value="especializacao">Especialização</SelectItem>
              <SelectItem value="mestrado">Mestrado</SelectItem>
              <SelectItem value="doutorado">Doutorado</SelectItem>
              <SelectItem value="pos-doutorado">Pós-Doutorado</SelectItem>
              <SelectItem value="professor">Professor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="institution">
            Instituição <span className="text-destructive">*</span>
          </Label>
          <Input
            id="institution"
            placeholder="Ex: Universidade de São Paulo"
            value={formData.institution}
            onChange={(e) => handleChange("institution", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="department">Departamento/Área</Label>
        <Input
          id="department"
          placeholder="Ex: Engenharia de Computação"
          value={formData.department}
          onChange={(e) => handleChange("department", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="researchArea">
          Área de Pesquisa Principal <span className="text-destructive">*</span>
        </Label>
        <Select value={formData.researchArea} onValueChange={(value) => handleChange("researchArea", value)}>
          <SelectTrigger id="researchArea">
            <SelectValue placeholder="Selecione a área" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ciencias-exatas">Ciências Exatas e da Terra</SelectItem>
            <SelectItem value="ciencias-biologicas">Ciências Biológicas</SelectItem>
            <SelectItem value="engenharias">Engenharias</SelectItem>
            <SelectItem value="ciencias-saude">Ciências da Saúde</SelectItem>
            <SelectItem value="ciencias-agrarias">Ciências Agrárias</SelectItem>
            <SelectItem value="ciencias-sociais">Ciências Sociais Aplicadas</SelectItem>
            <SelectItem value="ciencias-humanas">Ciências Humanas</SelectItem>
            <SelectItem value="linguistica">Linguística, Letras e Artes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="expertise">
          Áreas de Expertise <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="expertise"
          placeholder="Liste suas principais áreas de expertise, separadas por vírgula"
          value={formData.expertise}
          onChange={(e) => handleChange("expertise", e.target.value)}
          rows={3}
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="orcid">ORCID iD</Label>
          <Input
            id="orcid"
            placeholder="0000-0000-0000-0000"
            value={formData.orcid}
            onChange={(e) => handleChange("orcid", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lattes">Currículo Lattes</Label>
          <Input
            id="lattes"
            type="url"
            placeholder="http://lattes.cnpq.br/..."
            value={formData.lattes}
            onChange={(e) => handleChange("lattes", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">
          Biografia Profissional <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="bio"
          placeholder="Conte-nos sobre sua trajetória acadêmica, principais projetos e interesses de pesquisa..."
          value={formData.bio}
          onChange={(e) => handleChange("bio", e.target.value)}
          rows={4}
          required
        />
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Segurança da Conta</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="password">
              Senha <span className="text-destructive">*</span>
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Mínimo 8 caracteres"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              required
              minLength={8}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              Confirmar Senha <span className="text-destructive">*</span>
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Repita a senha"
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              required
              minLength={8}
            />
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={isLoading || success}>
        {isLoading ? "Criando conta..." : success ? "Conta criada!" : "Criar Conta de Pesquisador"}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Ao criar uma conta, você concorda com nossos Termos de Uso e Política de Privacidade
      </p>
    </form>
  )
}
