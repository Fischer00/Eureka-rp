import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = [
      "fullName",
      "email",
      "phone",
      "academicTitle",
      "institution",
      "researchArea",
      "expertise",
      "bio",
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

    // Generate UUID for the researcher (researcher_id)
    const researcherId = crypto.randomUUID()

    // TODO: Save to database
    // This is where you would save to your backend database
    // using the schema: { id: UUID (researcher_id), full_name, email, etc. }
    console.log("[v0] Researcher registration:", {
      id: researcherId, // This is the researcher_id UUID
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      academicTitle: body.academicTitle,
      institution: body.institution,
      department: body.department,
      researchArea: body.researchArea,
      expertise: body.expertise,
      orcid: body.orcid,
      lattes: body.lattes,
      bio: body.bio,
      // password should be hashed before storing
    })

    // Return success with the generated UUID
    return NextResponse.json(
      {
        success: true,
        message: "Pesquisador registrado com sucesso!",
        researcherId: researcherId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Researcher registration error:", error)
    return NextResponse.json({ error: "Erro ao processar registro" }, { status: 500 })
  }
}
