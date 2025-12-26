## MyPortfolio-YusufSemihKURT

A Vite + React + TypeScript project.

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm (comes with Node)

### Install dependencies

```bash
npm install
```

### Start the dev server

```bash
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
```

The output is generated in the `dist` directory.

### Preview the production build

```bash
npm run preview
```

### Project structure
- `src/`: App source code
- `public/`: Static assets
- `dist/`: Production build output (generated)

### Deploy to GitHub Pages

Sitenizi GitHub Pages'e deploy etmek için:

#### 1. GitHub Repository Oluşturun
- GitHub'da yeni bir repository oluşturun
- Repository adı önemli:
  - **Seçenek 1 (Önerilen)**: Repository adını `username.github.io` yapın (örn: `YusufWolf.github.io`)
    - Bu durumda siteniz `https://username.github.io` adresinde olur
  - **Seçenek 2**: Herhangi bir repository adı kullanın (örn: `MyWebSite`)
    - Bu durumda siteniz `https://username.github.io/MyWebSite/` adresinde olur
    - `vite.config.ts` dosyasındaki `base` değerini repository adınıza göre güncelleyin

#### 2. Kodu GitHub'a Push Edin
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/repository-name.git
git push -u origin main
```

#### 3. GitHub Pages Ayarlarını Yapın
1. GitHub repository'nize gidin
2. **Settings** > **Pages** sekmesine gidin
3. **Source** kısmından **GitHub Actions** seçeneğini seçin
4. Artık her `main` branch'ine push yaptığınızda otomatik olarak deploy edilecek

#### 4. İlk Deploy
- İlk kez deploy etmek için:
  - Repository'de **Actions** sekmesine gidin
  - **Deploy to GitHub Pages** workflow'unu manuel olarak çalıştırabilirsiniz
  - Veya `main` branch'ine bir commit push edin

#### 5. Site Adresiniz
- Repository adı `username.github.io` ise: `https://username.github.io`
- Diğer repository adları için: `https://username.github.io/repository-name/`

#### Notlar
- Deploy işlemi genellikle 1-2 dakika sürer
- İlk deploy'dan sonra site adresiniz **Settings > Pages** bölümünde görünecektir
- Her değişiklik yaptığınızda ve `main` branch'ine push ettiğinizde otomatik olarak güncellenecektir

### Deploy to AWS

Detaylı AWS deploy rehberi için `AWS_DEPLOY_GUIDE.md` dosyasına bakın.

**Hızlı Başlangıç - AWS Amplify:**
1. AWS Console'da Amplify servisini açın
2. "New app" > "Host web app" seçin
3. GitHub repository'nizi bağlayın
4. Build ayarları otomatik algılanır (amplify.yml kullanılır)
5. "Save and deploy" butonuna tıklayın
6. 3-5 dakika içinde siteniz canlıda!

### Troubleshooting
- If `npm run dev` fails, ensure Node 18+ is installed and delete `node_modules` and `package-lock.json`, then run `npm install` again.
- GitHub Pages deploy sorunları için **Actions** sekmesindeki workflow loglarına bakın
- AWS deploy sorunları için `AWS_DEPLOY_GUIDE.md` dosyasındaki "Sorun Giderme" bölümüne bakın


