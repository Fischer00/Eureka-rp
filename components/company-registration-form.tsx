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

export function CompanyRegistrationForm() {
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

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/register/company", {
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

      console.log("[v0] Company registered successfully with ID:", data.companyId)
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
          "Criar Conta de Empresa"
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Ao criar uma conta, você concorda com nossos Termos de Uso e Política de Privacidade
      </p>
    </form>
  )
}
