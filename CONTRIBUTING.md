# Katkı Rehberi

Katkıda bulunmak istediğiniz için teşekkürler!

## Kurulum

1. Repository'yi fork'layıp klonlayın.
2. Kurulacak bir bağımlılık yoktur. Siteyi yerelde görmek için: `python3 -m http.server 8000` ve <http://localhost:8000>.
3. Testler için Node.js 22 veya üzeri gerekir.

## Testleri çalıştırma

```sh
node --test "tests/**/*.test.mjs"
```

Yeni bir sayfa eklerseniz `sitemap.xml` dosyasına da ekleyin; testler sitemap'teki her adresin gerçek bir sayfaya karşılık geldiğini kontrol eder. Sayfaya `data-i18n` anahtarı eklerseniz `script.js` içindeki Türkçe çeviri tablosuna da ekleyin.

## Pull request beklentileri

- `main` dalına doğrudan push yapmayın; ayrı bir dal açıp pull request gönderin.
- Pull request'i tek bir konuya odaklı tutun ve ne değiştiğini kısaca açıklayın.
- `.editorconfig` ayarlarına uyun (UTF-8, LF, 2 boşluk girinti).
- Testler yerelde geçmeli; GitHub Actions iş akışı (CI) yeşil olmalıdır.
- Gizli bilgi (anahtar, parola vb.) eklemeyin.
