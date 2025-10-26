"use client"
import { useState } from "react"
import type React from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    companyName: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch("/api/problems/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao enviar problema")
      }

      setSuccess(true)
      setTimeout(() => router.push("/"), 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar problema. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
              <Link href="/" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                Início
              </Link>
              <Link
                href="/problems"
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                Problemas
              </Link>
              <Link
                href="/solutions"
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                Soluções
              </Link>
              <Link
                href="/researchers"
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                Pesquisadores
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Publicar Problema</h1>
              <p className="text-lg text-gray-600">Descreva seu desafio e conecte-se com pesquisadores qualificados</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">{error}</div>
                )}

                {success && (
                  <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                    Problema enviado com sucesso! Redirecionando...
                  </div>
                )}

                <div className="space-y-2">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Título do Problema <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="title"
                    type="text"
                    placeholder="Ex: Otimização de processo de produção"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Descrição Detalhada <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    placeholder="Descreva seu problema em detalhes: contexto, desafios específicos, resultados esperados..."
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    rows={6}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Categoria <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecione a categoria</option>
                    <option value="tecnologia">Tecnologia</option>
                    <option value="saude">Saúde</option>
                    <option value="energia">Energia</option>
                    <option value="agricultura">Agricultura</option>
                    <option value="manufatura">Manufatura</option>
                    <option value="meio-ambiente">Meio Ambiente</option>
                    <option value="educacao">Educação</option>
                    <option value="financeiro">Financeiro</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Informações de Contato</h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                        Nome da Empresa/Organização <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="companyName"
                        type="text"
                        placeholder="Ex: Inovação Tech Ltda"
                        value={formData.companyName}
                        onChange={(e) => handleChange("companyName", e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="contactName" className="block text-sm font-medium text-gray-700">
                        Nome do Responsável <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contactName"
                        type="text"
                        placeholder="Ex: João Silva"
                        value={formData.contactName}
                        onChange={(e) => handleChange("contactName", e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
                          E-mail <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="contactEmail"
                          type="email"
                          placeholder="joao@empresa.com.br"
                          value={formData.contactEmail}
                          onChange={(e) => handleChange("contactEmail", e.target.value)}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">
                          Telefone <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="contactPhone"
                          type="tel"
                          placeholder="(11) 98765-4321"
                          value={formData.contactPhone}
                          onChange={(e) => handleChange("contactPhone", e.target.value)}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || success}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Enviando..." : success ? "Problema enviado!" : "Publicar Problema"}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Ao publicar um problema, você concorda com nossos Termos de Uso e Política de Privacidade
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
