import { defineConfig, type Plugin } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import sharp from 'sharp'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

/**
 * Cap emitted image dimensions before vite-plugin-image-optimizer re-encodes.
 * Many portfolio photos are multi-megapixel camera originals; quality settings
 * alone left several assets >1MB in production and caused slow / stalled loads.
 */
function maxImageDimension(maxEdge = 1800): Plugin {
  const IMAGE_RE = /\.(jpe?g|png|webp|gif)$/i
  return {
    name: 'max-image-dimension',
    apply: 'build',
    async generateBundle(_options, bundle) {
      for (const asset of Object.values(bundle)) {
        if (asset.type !== 'asset' || !IMAGE_RE.test(asset.fileName)) continue
        const source = asset.source
        if (typeof source === 'string') continue

        const input = Buffer.from(source)
        let meta
        try {
          meta = await sharp(input).metadata()
        } catch {
          continue
        }

        const w = meta.width ?? 0
        const h = meta.height ?? 0
        if (Math.max(w, h) <= maxEdge) continue

        const resized = await sharp(input)
          .rotate()
          .resize({
            width: maxEdge,
            height: maxEdge,
            fit: 'inside',
            withoutEnlargement: true,
          })
          .toBuffer()

        asset.source = resized
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    maxImageDimension(1800),
    ViteImageOptimizer({
      jpg: { quality: 78 },
      jpeg: { quality: 78 },
      png: { quality: 80 },
      webp: { lossless: false, quality: 78 },
    }),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
