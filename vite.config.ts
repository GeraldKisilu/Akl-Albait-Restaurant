import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

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

export default defineConfig({
  // 1. ADD THIS: 'base' set to './' forces assets to load via 
  // relative paths, which prevents "File Not Found" errors on most servers.
  base: './', 

  plugins: [
    figmaAssetResolver(),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
  
  // 2. OPTIONAL: Add a build configuration to ensure proper output
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Set to false to reduce file sizes in production
  }
})