import { defineConfig } from 'vitest/config'; // <-- Changed import here
import react from '@vitejs/plugin-react';
export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./setupTests'], // or wherever you've placed it
    },
});
