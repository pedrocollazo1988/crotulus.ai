import { NextResponse } from "next/server";

const MODEL = "gemini-3.5-flash-lite";

const SCENARIOS: Record<string, string> = {
  dental: `
    Eres un agente de atención al cliente de una clínica dental.
    Responde en español, con amabilidad y profesionalidad.
    Puedes explicar servicios habituales y orientar al paciente.
    No diagnostiques enfermedades ni prescribas tratamientos.
    Puedes simular la solicitud de una cita, pero no confirmes
    reservas reales porque esta demostración no tiene una agenda conectada.
  `,

  restaurant: `
    Eres un asistente virtual de un restaurante.
    Responde en español de forma amable y clara.
    Puedes explicar cómo atender consultas sobre menú, horarios,
    servicios y reservas.
    No inventes precios, horarios ni platos específicos.
    Puedes simular una solicitud de reserva, pero no confirmes
    reservas reales porque no hay un sistema de reservas conectado.
  `,

  realestate: `
    Eres un asistente virtual de una inmobiliaria.
    Responde en español de forma profesional y cercana.
    Ayuda a identificar las preferencias de una persona que busca
    comprar o alquilar una propiedad.
    Pregunta por la zona, el presupuesto y el tipo de inmueble
    cuando sea pertinente.
    No inventes propiedades disponibles ni confirmes operaciones reales.
  `,

  administration: `
    Eres un asistente especializado en automatización administrativa.
    Responde en español de forma clara y profesional.
    Ayuda a identificar tareas repetitivas que una empresa puede
    automatizar, como organizar datos, preparar informes,
    clasificar solicitudes y gestionar documentos.
    Propón soluciones prácticas sin afirmar que has ejecutado
    acciones en sistemas externos.
  `,
};

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "El servicio de demostración no está configurado." },
        { status: 503 }
      );
    }

    const body = await request.json();

    const scenario =
      typeof body.scenario === "string" ? body.scenario : "";

    const message =
      typeof body.message === "string" ? body.message.trim() : "";

    const history = Array.isArray(body.history) ? body.history : [];

    if (!SCENARIOS[scenario]) {
      return NextResponse.json(
        { error: "El escenario seleccionado no es válido." },
        { status: 400 }
      );
    }

    if (!message || message.length > 1500) {
      return NextResponse.json(
        { error: "Escribe un mensaje de hasta 1500 caracteres." },
        { status: 400 }
      );
    }

    const contents = [
      ...history
        .filter(
          (item: { role?: string; text?: string }) =>
            (item.role === "user" || item.role === "model") &&
            typeof item.text === "string" &&
            item.text.length > 0 &&
            item.text.length <= 1500
        )
        .slice(-10)
        .map((item: { role: "user" | "model"; text: string }) => ({
          role: item.role,
          parts: [{ text: item.text }],
        })),
      {
        role: "user",
        parts: [{ text: message }],
      },
    ];

    const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SCENARIOS[scenario] }],
          },
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          },
        }),
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error("Gemini API respondió con error:", response.status);

      return NextResponse.json(
        { error: "No se pudo generar una respuesta. Inténtalo de nuevo." },
        { status: 502 }
      );
    }

    const data = await response.json();

    const answer = data.candidates?.[0]?.content?.parts
      ?.map((part: { text?: string }) => part.text ?? "")
      .join("")
      .trim();

    if (!answer) {
      return NextResponse.json(
        { error: "No se recibió una respuesta. Inténtalo de nuevo." },
        { status: 502 }
      );
    }

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Error en la demostración de IA:", error);

    return NextResponse.json(
      { error: "Ha ocurrido un error. Inténtalo de nuevo." },
      { status: 500 }
    );
  }
}
