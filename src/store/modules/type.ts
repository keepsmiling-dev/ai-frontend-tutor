// 定义消息数据类型
export interface Message {
  role: 'user' | 'assistant'
  content: string
}

// 面试题数据类型
export interface InterviewQuestion {
  id: number
  question: string      
  type: '入门' | '高频' | '进阶'
  standardAnswer: string 
}