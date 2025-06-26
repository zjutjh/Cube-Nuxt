export default defineEventHandler(async (event) => {
  const target = process.env.VITE_API_URL;
  if (!target) {
    throw createError({ statusCode: 500, message: "VITE_API_URL is not set" });
  }

  // 取请求原始路径，去掉 /api 前缀
  const url = event.node.req.url || "";
  const proxiedPath = url.replace(/^\/api/, "");

  // 拼接目标完整地址
  const proxyUrl = `${target}/api${proxiedPath}`;

  return await proxyRequest(event, proxyUrl);
});
