// api/chat.js
export const config = {
  runtime: "edge"
};

export default async function handler(req:any) {
  const apiKey = process.env.VITE_DEEPSEEK_KEY;
  if (!apiKey) return new Response("密钥未配置", { status: 500 });

  const urlObj = new URL(req.url);
  const targetPath = urlObj.pathname.replace("/api", "");
  const targetUrl = `https://api.deepseek.com${targetPath}`;

  const headers = new Headers(req.headers);
  headers.set("Authorization", `Bearer ${apiKey}`);

  try {
    const res = await fetch(targetUrl, {
      method: req.method,
      headers,
      body: req.body
    });
    return new Response(res.body, { status: res.status, headers: res.headers });
  } catch (e) {
    return new Response("转发失败:" + e.message, { status: 500 });
  }
}