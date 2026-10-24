import { configDefaults, defineConfig } from 'vitest/config';

// One self-contained ES module for HACS (Lit bundled in).
export default defineConfig({
  build: {
    lib: {
      entry: 'src/easy-thermostat-styler-card.ts',
      formats: ['es'],
      fileName: () => 'easy-thermostat-styler-card.js',
    },
    rollupOptions: { output: { inlineDynamicImports: true } },
    outDir: 'dist',
    emptyOutDir: true,
    target: 'es2021',
    minify: 'esbuild',
  },
  test: {
    include: ['test/**/*.test.ts'],
    exclude: [...configDefaults.exclude],
    environment: 'node',
  },
});
