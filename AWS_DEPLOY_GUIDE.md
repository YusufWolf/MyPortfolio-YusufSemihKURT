# AWS ile Portfolio Sitesi Deploy Rehberi

Bu rehber, React/Vite portfolio sitenizi AWS'ye deploy etmek için detaylı adımları içerir.

## 📚 AWS Nedir ve Neden Kullanıyoruz?

**Amazon Web Services (AWS)**, bulut bilişim hizmetleri sağlayan bir platformdur. Sitenizi AWS'ye deploy etmek şu avantajları sağlar:

- ✅ **Ölçeklenebilirlik**: Trafik arttıkça otomatik olarak kaynak artırır
- ✅ **Güvenilirlik**: %99.99 uptime garantisi
- ✅ **Hız**: CDN (Content Delivery Network) ile dünya çapında hızlı erişim
- ✅ **Maliyet**: Kullanım bazlı ödeme, küçük siteler için neredeyse ücretsiz
- ✅ **SSL Sertifikası**: Ücretsiz HTTPS sertifikası

---

## 🎯 Yöntem 1: AWS Amplify (Önerilen - En Kolay)

AWS Amplify, frontend uygulamalarınızı deploy etmek için en kolay yöntemdir. GitHub ile entegre çalışır ve her commit'te otomatik deploy yapar.

### Amplify Nedir?

**AWS Amplify**, modern web ve mobil uygulamaları oluşturmak ve deploy etmek için bir platformdur. Özellikle:
- React, Vue, Angular gibi framework'ler için optimize edilmiştir
- GitHub, GitLab, Bitbucket ile entegre çalışır
- Otomatik CI/CD pipeline sağlar
- Ücretsiz SSL sertifikası verir
- CDN ile hızlı içerik dağıtımı yapar

### Adım 1: AWS Hesabı Oluşturma

1. **AWS Console'a gidin**: https://aws.amazon.com/
2. **"Create an AWS Account"** butonuna tıklayın
3. Email, şifre ve kredi kartı bilgilerinizi girin
   - ⚠️ **Önemli**: İlk 12 ay için "Free Tier" kapsamında çoğu hizmet ücretsizdir
   - Küçük bir site için aylık maliyet genellikle $0-5 arasındadır
4. Telefon doğrulaması yapın
5. Hesabınız hazır!

### Adım 2: GitHub Repository Hazırlama

Sitenizin kodu GitHub'da olmalı:

```bash
# Eğer henüz git repository değilse:
git init
git add .
git commit -m "Initial commit - Ready for AWS deployment"

# GitHub'da yeni repository oluşturun, sonra:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Adım 3: AWS Amplify Console'a Giriş

1. **AWS Console'a giriş yapın**: https://console.aws.amazon.com/
2. Arama çubuğuna **"Amplify"** yazın ve seçin
3. **"New app"** > **"Host web app"** seçeneğini tıklayın

### Adım 4: GitHub Bağlantısı

1. **"GitHub"** seçeneğini seçin
2. **"Authorize AWS Amplify"** butonuna tıklayın
   - Bu, AWS'nin GitHub hesabınıza erişmesine izin verir
   - Sadece repository'lerinize erişim verir, tüm hesabınıza değil
3. GitHub'da izin verin

### Adım 5: Repository ve Branch Seçimi

1. **Repository**: Portfolio sitenizin repository'sini seçin
2. **Branch**: `main` (veya `master`) branch'ini seçin
3. **"Next"** butonuna tıklayın

### Adım 6: Build Ayarları

Amplify otomatik olarak Vite projenizi algılar, ama kontrol edelim:

**Build settings** bölümünde şunları görmelisiniz:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
```

Eğer otomatik algılanmadıysa, `amplify.yml` dosyasını manuel olarak ekleyin (zaten oluşturduk).

**Environment variables** (isteğe bağlı):
- `VITE_GITHUB_USERNAME`: GitHub kullanıcı adınız (eğer kullanıyorsanız)

### Adım 7: Deploy

1. **"Save and deploy"** butonuna tıklayın
2. Amplify şunları yapacak:
   - ✅ Repository'yi klonlar
   - ✅ Bağımlılıkları yükler (`npm ci`)
   - ✅ Projeyi build eder (`npm run build`)
   - ✅ Build çıktısını S3'e yükler
   - ✅ CloudFront CDN'i yapılandırır
   - ✅ SSL sertifikası ekler
   - ✅ Siteyi canlıya alır

**Süre**: İlk deploy genellikle 3-5 dakika sürer.

### Adım 8: Site Adresi

Deploy tamamlandıktan sonra:
- Site adresiniz: `https://main.xxxxx.amplifyapp.com` formatında olacak
- Bu adresi özelleştirebilirsiniz (Custom domain)

### Adım 9: Custom Domain (İsteğe Bağlı)

1. Amplify Console'da **"Domain management"** sekmesine gidin
2. **"Add domain"** butonuna tıklayın
3. Domain adınızı girin (örn: `yusufsemihkurt.com`)
4. AWS otomatik olarak:
   - Route 53'te DNS kayıtları oluşturur
   - SSL sertifikası verir
   - Domain'i siteye bağlar

---

## 🎯 Yöntem 2: AWS S3 + CloudFront (Daha Detaylı Öğrenme)

Bu yöntem daha manuel ama AWS'nin temel servislerini öğrenmenizi sağlar.

### S3 Nedir?

**Amazon S3 (Simple Storage Service)**, dosya depolama servisidir. Statik web sitelerini host etmek için kullanılabilir.

### CloudFront Nedir?

**Amazon CloudFront**, bir CDN (Content Delivery Network) servisidir. İçeriğinizi dünya çapındaki sunucularda cache'ler ve hızlı erişim sağlar.

### Adım 1: S3 Bucket Oluşturma

1. AWS Console'da **"S3"** servisini açın
2. **"Create bucket"** butonuna tıklayın
3. Ayarlar:
   - **Bucket name**: `yusufsemihkurt-portfolio` (benzersiz olmalı)
   - **Region**: En yakın bölgeyi seçin (örn: `eu-central-1` - Frankfurt)
   - **Block Public Access**: **KAPATIN** (site public olmalı)
   - **Bucket Versioning**: İsteğe bağlı
4. **"Create bucket"** butonuna tıklayın

### Adım 2: Static Website Hosting Aktif Etme

1. Bucket'ınıza tıklayın
2. **"Properties"** sekmesine gidin
3. En alta scroll edin, **"Static website hosting"** bölümünü bulun
4. **"Edit"** butonuna tıklayın
5. Ayarlar:
   - **Static website hosting**: **Enable**
   - **Index document**: `index.html`
   - **Error document**: `index.html` (React Router için)
6. **"Save changes"** butonuna tıklayın

### Adım 3: Bucket Policy (Public Erişim)

1. **"Permissions"** sekmesine gidin
2. **"Bucket policy"** bölümüne gidin
3. **"Edit"** butonuna tıklayın
4. Şu policy'yi ekleyin (BUCKET_NAME'i değiştirin):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::BUCKET_NAME/*"
    }
  ]
}
```

5. **"Save changes"** butonuna tıklayın

### Adım 4: Build ve Upload

1. **Local'de build yapın**:
```bash
npm run build
```

2. **dist klasöründeki tüm dosyaları S3'e yükleyin**:
   - S3 Console'da bucket'ınıza gidin
   - **"Upload"** butonuna tıklayın
   - `dist` klasöründeki tüm dosyaları seçin
   - **"Upload"** butonuna tıklayın

**Alternatif - AWS CLI ile**:
```bash
# AWS CLI kurulumu gerekir
aws s3 sync dist/ s3://BUCKET_NAME --delete
```

### Adım 5: CloudFront Distribution Oluşturma

1. AWS Console'da **"CloudFront"** servisini açın
2. **"Create distribution"** butonuna tıklayın
3. Ayarlar:
   - **Origin domain**: S3 bucket'ınızı seçin
   - **Origin path**: Boş bırakın
   - **Viewer protocol policy**: **Redirect HTTP to HTTPS**
   - **Allowed HTTP methods**: **GET, HEAD, OPTIONS**
   - **Price class**: En ucuz seçeneği seçin (isteğe bağlı)
4. **"Create distribution"** butonuna tıklayın
5. **15-20 dakika** bekleyin (CloudFront dağıtımı oluşturulur)

### Adım 6: Custom Domain (İsteğe Bağlı)

1. CloudFront distribution'ınızda **"General"** sekmesine gidin
2. **"Edit"** butonuna tıklayın
3. **"Alternate domain names (CNAMEs)"** bölümüne domain'inizi ekleyin
4. **"Custom SSL certificate"** için AWS Certificate Manager'dan sertifika oluşturun

---

## 💰 Maliyet Tahmini

### AWS Amplify:
- **İlk 12 ay**: 1000 build/dakika ücretsiz
- **Sonrası**: $0.01/build dakikası
- **Hosting**: Ücretsiz (küçük siteler için)
- **Tahmini aylık maliyet**: $0-2

### S3 + CloudFront:
- **S3 Storage**: İlk 5GB ücretsiz, sonrası $0.023/GB
- **S3 Requests**: İlk 20,000 GET request ücretsiz
- **CloudFront**: İlk 1TB transfer ücretsiz (12 ay)
- **Tahmini aylık maliyet**: $0-5 (küçük siteler için)

---

## 🔄 Otomatik Deploy (CI/CD)

### Amplify ile:
- Her GitHub push'unda otomatik deploy
- Branch bazlı environment'lar
- Preview deployments

### S3 + CloudFront ile:
- GitHub Actions kullanabilirsiniz
- `.github/workflows/deploy.yml` dosyası oluşturun

---

## 🛠️ Sorun Giderme

### Build Hatası:
- `amplify.yml` dosyasını kontrol edin
- Build loglarını inceleyin
- Node versiyonunu kontrol edin

### 404 Hatası:
- S3'te `index.html` dosyasının olduğundan emin olun
- CloudFront cache'ini temizleyin

### Yavaş Yükleme:
- CloudFront cache ayarlarını kontrol edin
- Görselleri optimize edin

---

## 📝 Özet

**AWS Amplify** → En kolay, otomatik, önerilen
**S3 + CloudFront** → Daha manuel, öğrenmek için iyi

Her iki yöntem de sitenizi canlıya alır. Amplify ile başlamanızı öneririm!



