const OPEN_WEBUI_BASE = "https://chat.ingarena.net";

export async function POST(req: Request) {
  const { messages, model } = await req.json();
  const token = req.headers.get("authorization");

  if (!token) {
    return Response.json(
      { error: "未提供 Token，请在设置中配置 JWT Token" },
      { status: 401 }
    );
  }

  const upstream = await fetch(`${OPEN_WEBUI_BASE}/api/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      model: model || "gpt-5-mini",
      messages,
      stream: true,
    }),
  });

  if (!upstream.ok) {
    const text = await upstream.text().catch(() => "Unknown error");
    return Response.json(
      { error: `上游 API 错误 (${upstream.status}): ${text}` },
      { status: upstream.status }
    );
  }

  return new Response(upstream.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
