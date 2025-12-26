import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  // GitHub Pages için base path ayarı
  // Eğer repository adınız "username.github.io" formatındaysa base: "/" kullanılır
  // Diğer repository adları için base: "/repository-name/" kullanılır
  base: process.env.GITHUB_PAGES === 'true' 
    ? (process.env.REPO_NAME && !process.env.REPO_NAME.includes('.github.io')
        ? `/${process.env.REPO_NAME}/`
        : '/')
    : '/',
});

