export default async function middleware(request) {
  const url = new URL(request.url);
  // 只拦截 /api 开头的请求
  if (url.pathname.startsWith("/api/")) {
    // 复制原请求头
    const headers = new Headers(request.headers);
    // 从Vercel环境变量读取DeepSeek密钥
    headers.set("Authorization", `Bearer ${process.env.DEEPSEEK_API_KEY}`);
    // 转发请求
    return NextResponse.rewrite(new URL(url.pathname.replace("/api/", ""), "https://api.deepseek.com"), {
      headers,
    });
  }
  return NextResponse.next();
}