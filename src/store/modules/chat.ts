import { defineStore } from "pinia";
import type { Message } from "./type";


// 发送消息的数据仓库
const useChatStore = defineStore('Chat',{
    state:()=>{
        return{
            messages : [] as Message[],
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
                { role: 'assistant', content: '对话已清空，有什么可以帮你的？' },
            ]
            this.saveToLocal()
        }
    },
    getters:{}
})

export default useChatStore