import request from "@/utils/request";

// 发送消息的数据接口
export interface ChatMessage {
    role:'user' | 'assistant' | 'system'
    content : string 
}

export const fetchAIResponse = async (messages: ChatMessage[]): Promise<string> => {
  try {
    const response: any = await request.post("https://api.deepseek.com/v1/chat/completions", {
      model: "deepseek-v4-flash",
      messages: messages,
      stream: false,
    });

    // 逐层校验，防止任意一层不存在报错
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
    // 直接抛出错误，页面统一弹窗展示
    throw err;
  }
};