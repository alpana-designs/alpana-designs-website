/**
 * Rewrites og/twitter image meta to absolute URLs on the request host.
 * Share image = HomePage2-og.jpg (1200×630 crop of HomePage2.png).
 * Favicon (/favicon.jpeg from logo.jpeg) is never used for link previews.
 */
export default async (request, context) => {
  const url = new URL(request.url)
  if (/\.(jpe?g|png|gif|webp|svg|ico|js|css|woff2?|map|txt|xml|json)$/i.test(url.pathname)) {
    return context.next()
  }

  const response = await context.next()
  const contentType = response.headers.get("content-type") || ""
  if (!contentType.includes("text/html")) return response

  const origin = url.origin
  const imageUrl = `${origin}/HomePage2-og.jpg?v=5`
  const pageUrl = `${origin}/`

  let html = await response.text()

  html = html.replace(/<meta\s+property="og:url"[^>]*>/gi, "")
  html = html.replace(/<meta\s+property="og:image"[^>]*>/gi, "")
  html = html.replace(/<meta\s+property="og:image:secure_url"[^>]*>/gi, "")
  html = html.replace(/<meta\s+property="og:image:type"[^>]*>/gi, "")
  html = html.replace(/<meta\s+property="og:image:width"[^>]*>/gi, "")
  html = html.replace(/<meta\s+property="og:image:height"[^>]*>/gi, "")
  html = html.replace(/<meta\s+name="twitter:image"[^>]*>/gi, "")
  html = html.replace(/<link\s+rel="image_src"[^>]*>/gi, "")

  const tags = [
    `<meta property="og:url" content="${pageUrl}" />`,
    `<meta property="og:image" content="${imageUrl}" />`,
    `<meta property="og:image:secure_url" content="${imageUrl}" />`,
    `<meta property="og:image:type" content="image/jpeg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:image" content="${imageUrl}" />`,
    `<link rel="image_src" href="${imageUrl}" />`,
  ].join("\n    ")

  if (html.includes("</head>")) {
    html = html.replace("</head>", `    ${tags}\n  </head>`)
  }

  return new Response(html, {
    status: response.status,
    headers: response.headers,
  })
}
