/**
 * Rewrites og/twitter image meta tags to absolute URLs on the request host.
 * Needed so WhatsApp/Facebook/Instagram previews work on every domain alias:
 * alpanas.design, www.alpanas.design, alpana-designs.netlify.app,
 * tranquil-dragon-7cc89f.netlify.app, etc.
 */
export default async (request, context) => {
  const url = new URL(request.url)
  // Never rewrite static share assets / binary files
  if (/\.(jpe?g|png|gif|webp|svg|ico|js|css|woff2?|map|txt|xml|json)$/i.test(url.pathname)) {
    return context.next()
  }

  const response = await context.next()
  const contentType = response.headers.get("content-type") || ""
  if (!contentType.includes("text/html")) return response

  const origin = url.origin
  const imageUrl = `${origin}/og-image.jpg`
  const pageUrl = `${origin}/`

  let html = await response.text()

  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/gi, "")
  html = html.replace(/<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/gi, "")
  html = html.replace(/<meta\s+property="og:image:secure_url"\s+content="[^"]*"\s*\/?>/gi, "")
  html = html.replace(/<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/gi, "")

  const tags = [
    `<meta property="og:url" content="${pageUrl}" />`,
    `<meta property="og:image" content="${imageUrl}" />`,
    `<meta property="og:image:secure_url" content="${imageUrl}" />`,
    `<meta name="twitter:image" content="${imageUrl}" />`,
  ].join("\n    ")

  if (html.includes("</head>")) {
    html = html.replace("</head>", `    ${tags}\n  </head>`)
  }

  return new Response(html, {
    status: response.status,
    headers: response.headers,
  })
}
