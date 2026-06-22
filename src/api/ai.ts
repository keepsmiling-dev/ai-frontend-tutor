import request from "@/utils/request";

// 发送消息的数据接口
export interface ChatMessage {
    role:'user' | 'assistant' | 'system'
    content : string 
}

export const fetchAIResponse = async (messages: ChatMessage[]): Promise<string> => {
  try {
    // 判断环境：生产环境走 /api/chat，开发环境走 Vite 代理
    const isDEV = import.meta.env.DEV
    const url = isDEV ? '/deepseek/chat/completions' : '/api/chat'

    const response: any = await request.post(url,  {
      model: "deepseek-v4-flash",
      messages: messages,
      stream: false,
    });

    // 逐层校验
    if (!response?.choices?.length) throw new Error("无返回结果");
    const msgObj = response.choices[0].message;
    if (!msgObj?.content) throw new Error("返回内容为空");

    const content = msgObj.content;

    // 检测限流/Token超限提示，提示清空对话
    if (content.includes("Token耗尽") || content.includes("AI服务暂时无法使用")) {
      throw new Error("对话内容过长或访问受限，请清空历史对话后重试");
    }
    return content;
  } catch (err) {
    console.error("AI接口捕获错误详情：", err);
    throw err;
  }
};