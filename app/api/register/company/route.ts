import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = [
      "companyName",
      "cnpj",
      "industry",
      "companySize",
      "description",
      "contactName",
      "contactEmail",
      "contactPhone",
      "password",
    ]

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Campo obrigatório: ${field}` }, { status: 400 })
      }
    }

    // Validate password match
    if (body.password !== body.confirmPassword) {
      return NextResponse.json({ error: "As senhas não coincidem" }, { status: 400 })
    }

    // Generate UUID for the company
    const companyId = crypto.randomUUID()

    // TODO: Save to database
    // This is where you would save to your backend database
    // using the schema: { id: UUID, company_name, cnpj, industry, etc. }
    console.log("[v0] Company registration:", {
      id: companyId,
      companyName: body.companyName,
      cnpj: body.cnpj,
      industry: body.industry,
      companySize: body.companySize,
      website: body.website,
      description: body.description,
      contactName: body.contactName,
      contactEmail: body.contactEmail,
      contactPhone: body.contactPhone,
      // password should be hashed before storing
    })

    // Return success with the generated UUID
    return NextResponse.json(
      {
        success: true,
        message: "Empresa registrada com sucesso!",
        companyId: companyId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Company registration error:", error)
    return NextResponse.json({ error: "Erro ao processar registro" }, { status: 500 })
  }
}
