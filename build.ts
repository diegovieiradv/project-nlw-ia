import { build } from 'esbuild'

await build({
  entryPoints: ['src/server.ts'],
  bundle: true,
  platform: 'node',
  target: 'node22',
  outfile: 'api/index.js',
  format: 'cjs',
  banner: {
    js: `const require = (await import("node:module")).createRequire(import.meta.url);`,
  },
})

console.log('Build completed!')
