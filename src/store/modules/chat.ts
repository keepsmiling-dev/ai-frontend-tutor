import { defineStore } from "pinia";
import type { Message } from "./type";

const STORAGE_KEY = 'chat_history'
// 从 localStorage 读取历史消息
const loadFromLocal = (): Message[] => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch (e) {
      console.error('解析聊天记录失败', e)
      return []
    }
  }
  return []
}

// 发送消息的数据仓库
const useChatStore = defineStore('Chat',{
    state:()=>{
        return{
            messages : loadFromLocal() as Message[],
        }
    },
    actions:{
        saveToLocal(){
            localStorage.setItem('chat_history',JSON.stringify(this.messages))
        },
        addMessage(message:Message){
            this.messages.push(message)
            if(this.messages.length > 50)
                this.messages.shift()
            this.saveToLocal()
        },
        resetMessages(){
            this.messages = [
                { role: 'assistant', content: '你好！我是前端学习助手。请问有什么前端问题？' },
            ]
            this.saveToLocal()
        }
    },
    getters:{}
})

export default useChatStore