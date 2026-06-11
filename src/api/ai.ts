import request from "@/utils/request";

const API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY  

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
  // 因为你的响应拦截器返回的是 response.data，所以 response 已经是后端返回的完整对象
  return response.choices[0].message.content
}

/* export const fetchAIResponse = async (messages: ChatMessage[]): Promise<string> => {
  const response = await fetch("/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: messages,
      stream: false,
    }),
  });

  if (!response.ok) {
    console.error("API错误", response.status);
    throw new Error("AI 服务异常");
  }

  const data = await response.json();
  return data.choices[0].message.content;
}; */