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
} */


/* export const fetchAIResponse = async (messages: ChatMessage[]): Promise<string> => {
  // 完整官方地址，不再用 /api 代理
  const response = await request.post("https://api.deepseek.com/v1/chat/completions", {
    model: "deepseek-chat",
    messages: messages,
    stream: false,
  });

  console.log("完整响应:", response);
  return (response as any).choices[0].message.content;
}; */

export const fetchAIResponse = async (messages: ChatMessage[]): Promise<string> => {
  try {
    const response: any = await request.post("https://api.deepseek.com/v1/chat/completions", {
      model: "deepseek-v4-flash",
      messages: messages,
      stream: false,
    });
    console.log("完整响应:", response);
    console.log("choices数组：", response.choices);
    console.log("第一条choice：", response.choices[0]);
    console.log("message对象：", response.choices[0].message);

    // 逐层校验，防止任意一层不存在报错
    if (!response?.choices?.length) throw new Error("无返回结果");
    const msgObj = response.choices[0].message;
    if (!msgObj?.content) throw new Error("返回内容为空");

    const content = msgObj.content;
    console.log("content 值：", content);
    console.log("content 类型：", typeof content);

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