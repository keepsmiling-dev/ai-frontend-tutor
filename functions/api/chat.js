export async function onRequestPost(context) {
  // PROXY_WORKER 是后面绑定Worker的变量名，保持一致
  const worker = context.env.PROXY_WORKER;
  return worker.fetch(context.request);
}
// 跨域预检
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "https://ai-frontend-tutor.pages.dev",
      "Access-Control-Allow-Methods": "POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}