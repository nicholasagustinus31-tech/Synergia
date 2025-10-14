# Rencana Implementasi Synergia Company Profile

## Ringkasan
Website landing page Synergia dirancang untuk mempresentasikan perjalanan perusahaan media publisher, memperkenalkan tim inti, menampilkan jaringan klien dan partner, serta menyoroti studi kasus unggulan. Desain mengutamakan nuansa modern dan profesional dengan warna brand `#2287ff` dan tipografi Helvetica.

## Struktur Halaman
- **Home / Our Journey**: hero section, highlight statistik, dan timeline perjalanan.
- **People**: kartu profil tim utama.
- **Media**: logo klien sebagai bukti kredibilitas.
- **Others (Partners)**: daftar kategori kolaborasi strategis.
- **Case Studies**: contoh proyek unggulan dengan CTA.
- **Contact**: formulir konsultasi dan informasi kontak.

## Fitur Interaktif & Animasi
- Navigasi sticky dengan transisi mobile.
- Animasi scroll-in menggunakan `IntersectionObserver` dan kelas `.reveal`.
- Hero globe dengan animasi orbit CSS untuk menambah daya tarik visual.
- Dialog modal native untuk login SSO dan jadwal konsultasi.

## Integrasi SSO
Untuk memenuhi kebutuhan akses portal klien, login SSO disiapkan melalui modal yang dapat diintegrasikan ke penyedia autentikasi enterprise:

1. **Google Workspace**: OAuth 2.0 dengan OpenID Connect. Redirect URI mengarah ke portal klien (`/auth/callback/google`).
2. **Microsoft Entra ID**: Gunakan Authorization Code Flow dengan PKCE. Pastikan aplikasi terdaftar dan domain diverifikasi.
3. **Okta**: Manfaatkan Okta Hosted Sign-In. Endpoint `/oauth2/default/v1/authorize` dengan scope `openid profile email`.

Langkah implementasi backend:
- Membuat service `auth-gateway` (Node.js atau Go) yang menangani callback dan manajemen session (JWT HttpOnly).
- Menghubungkan service dengan database pengguna (misal PostgreSQL) untuk mapping role dan akses asset campaign.
- Menyediakan endpoint `/api/auth/status` agar front-end dapat memeriksa status login.

## Infrastruktur & Kebutuhan Teknis
- **Hosting**: Static front-end dapat ditempatkan di Vercel/Netlify, backend auth dan portal kampanye di container (Docker + Kubernetes).
- **CDN**: Gunakan CDN untuk aset statis (Cloudflare) agar latensi rendah.
- **Monitoring**: Integrasi Google Analytics 4 atau Plausible untuk insight, serta Sentry untuk error tracking.
- **Keamanan**:
  - Implementasi HTTPS end-to-end.
  - CSP dan header keamanan (Strict-Transport-Security, X-Frame-Options).
  - Validasi form di client dan server.
- **Aksesibilitas**: Navigasi keyboard, warna kontras tinggi, aria-label pada elemen interaktif.

## Roadmap Pengembangan
1. **Sprint 1**: Desain high-fidelity, setup repositori, komponen UI dasar, navigasi responsif.
2. **Sprint 2**: Integrasi konten People, Media, Partners, Case Studies, animasi scroll, hero interaction.
3. **Sprint 3**: Implementasi backend portal klien & SSO (auth gateway), setup database.
4. **Sprint 4**: QA, performance optimization (Lighthouse), dan deployment production.

## Dependensi & Tooling
- **Front-end**: HTML5, CSS3, JavaScript modular (dapat di-upgrade ke React atau Astro jika dibutuhkan).
- **Backend Auth**: Node.js + Express + Passport.js atau NextAuth jika menggunakan Next.js.
- **Design Handoff**: Figma untuk mockup, Lottie jika ingin menambahkan animasi lanjutan.
- **Automation**: GitHub Actions untuk CI/CD (lint, test, build, deploy).

## Konten yang Diperlukan
- Copywriting final untuk hero, studi kasus, dan testimoni.
- Logo klien dan partner dengan format SVG.
- Foto tim resolusi tinggi (dapat menggantikan placeholder SVG saat produksi).

## Langkah Berikutnya
- Validasi konten dengan stakeholder klien.
- Implementasi integrasi SSO sesuai provider yang disepakati.
- Siapkan halaman tambahan seperti newsroom/blog jika dibutuhkan ke depan.
