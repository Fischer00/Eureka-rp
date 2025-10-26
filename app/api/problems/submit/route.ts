import { NextResponse } from "next/server"
import { randomUUID } from "crypto"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, description, category, contactName, contactEmail, contactPhone, companyName } = body

    // Validate required fields
    if (!title || !description || !category || !contactName || !contactEmail || !contactPhone || !companyName) {
      return NextResponse.json({ error: "Todos os campos obrigatórios devem ser preenchidos" }, { status: 400 })
    }

    // Generate UUID for the problem
    const problemId = randomUUID()

    // Here you would typically save to your database
    // For now, we'll just return success with the generated ID
    const problemData = {
      id: problemId,
      title,
      description,
      category,
      contactName,
      contactEmail,
      contactPhone,
      companyName,
      createdAt: new Date().toISOString(),
    }

    console.log("[v0] Problem submitted:", problemData)

    return NextResponse.json(
      {
        success: true,
        message: "Problema publicado com sucesso!",
        data: problemData,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Error submitting problem:", error)
    return NextResponse.json({ error: "Erro ao processar solicitação" }, { status: 500 })
  }
}
