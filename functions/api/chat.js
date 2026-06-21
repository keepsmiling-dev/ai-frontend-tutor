// functions/api/chat.js
export async function onRequest(context) {
  const { request, env } = context

  // 只允许 POST 请求
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  try {
    // 获取前端传来的消息
    const body = await request.json()

    // 转发请求到 DeepSeek
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.VITE_DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: body.model || 'deepseek-v4-flash',
        messages: body.messages,
        stream: body.stream || false
      })
    })

    const data = await response.json()

    // 返回结果给前端
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'AI service error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}