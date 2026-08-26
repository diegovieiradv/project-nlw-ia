import { build } from 'esbuild'

await build({
  entryPoints: ['api/index.ts'],
  bundle: true,
  platform: 'node',
  target: 'node22',
  outfile: 'dist/index.cjs',
  external: ['pg', 'pg-native'],
  format: 'cjs',
})

console.log('Build completed!')
