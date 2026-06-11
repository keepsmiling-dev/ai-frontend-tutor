import axios from "axios";
import { showToast } from "vant";

// 创建 axios 实例
let request = axios.create({
  baseURL: "/api", //基础路径,开发时代理到 DeepSeek
  timeout: 15000,
});

// 响应拦截器
request.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.error?.message || error.message || "网络错误";
      showToast(message)
      return Promise.reject(error)
  },
);

export default request
