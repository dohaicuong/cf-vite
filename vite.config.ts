import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { ValidateEnv } from "@julr/vite-plugin-validate-env";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ValidateEnv(),
  ],
})
