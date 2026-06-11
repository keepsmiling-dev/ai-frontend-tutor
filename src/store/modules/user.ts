import { defineStore } from "pinia"
import { constantRoute } from "@/router/router"

//创建用户小仓库
const useUserStore = defineStore('User',{
    state:()=>{
        return{
            menuRoutes: constantRoute, //仓库存储生成菜单需要路由
        }
    },
    actions:{

    },
    getters:{}
})

export default useUserStore