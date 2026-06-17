import request from "@/utils/request";

// 发送消息的数据接口
export interface ChatMessage {
    role:'user' | 'assistant' | 'system'
    content : string 
}


/* export const fetchAIResponse = async (messages: ChatMessage[]): Promise<string> => {
  // 直接使用 request 实例，baseURL 已经是 '/api'
  const response = await request.post('/v1/chat/completions', {
    model: 'deepseek-chat',
    messages: messages,
    stream: false,
  })

  console.log('完整响应:', response)
  return (response as any).choices[0].message.content
}
 */


export const fetchAIResponse = async (messages: ChatMessage[]): Promise<string> => {
  const isProduction = import.meta.env.PROD

  if (isProduction) {
    // ========== 生产环境（Vercel）：调用 Serverless Function ==========
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: messages,
        stream: false,
      })
    })
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`)
    }
    const data = await res.json()
    return data.choices[0].message.content
  } else {
    // ========== 开发环境（本地）：走 Vite 代理 ==========
    const response = await request.post('/v1/chat/completions', {
      model: 'deepseek-chat',
      messages: messages,
      stream: false,
    })
    console.log('完整响应:', response)
    return (response as any).choices[0].message.content
  }
}
