// 定义消息数据类型
export interface Message {
  role: 'user' | 'assistant'
  content: string
}

// 学习路线类型
export interface Stage {
  id: number;
  name: string;
  icon: string;
  learnTime: string;
  level: string;
  target: string;
  htmlText?: string;
  cssText?: string;
  jsText?: string;
  tags: string[];
  docs: Array<{ name: string; url: string }>;
  videos: Array<{ name: string; url: string }>;
  tips: string;
  desc?: string;
  content?: string;
}

// 面试题数据类型
export interface InterviewQuestion {
  id: number
  question: string      
  standardAnswer: string 
}

