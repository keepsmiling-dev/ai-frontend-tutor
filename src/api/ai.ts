import request from "@/utils/request";

// 发送消息的数据接口
export interface ChatMessage {
    role:'user' | 'assistant' | 'system'
    content : string 
}

export const fetchAIResponse = async (messages: ChatMessage[]): Promise<string> => {
  // 直接使用 request 实例，baseURL 已经是 '/api'
  const response = await request.post('/v1/chat/completions', {
    model: 'deepseek-chat',
    messages: messages,
    stream: false,
  })

  console.log('完整响应:', response)
  return (response as any).choices[0].message.content
}

