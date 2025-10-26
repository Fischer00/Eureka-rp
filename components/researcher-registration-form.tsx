"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function ResearcherRegistrationForm() {
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

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/register/researcher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao criar conta")
      }

      console.log("[v0] Researcher registered successfully with ID:", data.researcherId)
      setSuccess(true)

      // Redirect to success page or login after 2 seconds
      setTimeout(() => {
        router.push("/")
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar conta. Tente novamente.")
      console.error("[v0] Registration error:", err)
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
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-500 bg-green-50 text-green-900">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
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
          placeholder="Liste suas principais áreas de expertise, separadas por vírgula (ex: Inteligência Artificial, Machine Learning, Processamento de Linguagem Natural)"
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
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Criando conta...
          </>
        ) : success ? (
          <>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Conta criada!
          </>
        ) : (
          "Criar Conta de Pesquisador"
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Ao criar uma conta, você concorda com nossos Termos de Uso e Política de Privacidade
      </p>
    </form>
  )
}
