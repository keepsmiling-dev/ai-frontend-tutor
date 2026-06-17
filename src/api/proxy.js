export default async function handler(req) {
  const apiKey = process.env.VITE_DEEPSEEK_KEY;
  const targetUrl = `https://api.deepseek.com${req.url.replace("/api", "")}`;

  const res = await fetch(targetUrl, {
    method: req.method,
    headers: {
      ...Object.fromEntries(req.headers),
      Authorization: `Bearer ${apiKey}`,
    },
    body: req.body,
  });
  return res;
}