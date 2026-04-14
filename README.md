# Yufor uz - Tibbiy Kiyimlar Do'koni

Ushbu loyiha shifokorlar va hamshiralar uchun tibbiy formalar sotuvchi Telegram Mini App (Vue.js) va Bot (Python) dan tashkil topgan.

## Loyiha Tarkibi

- `frontend/`: Vue 3 + Vite da yozilgan Mini App.
- `bot/`: aiogram 3.x da yozilgan Telegram Bot.

## O'rnatish va Ishga Tushirish

### 1. Frontend (GitHub Pages ga yuklash)

Mini Appni GitHub Pages ga bepul joylashtirish mumkin.

1.  GitHub-da yangi repozitoriya oching (masalan: `Yufor_uz`).
2.  `frontend/` papkasiga kiring:
    ```bash
    cd frontend
    ```
3.  `vite.config.js` faylini quyidagicha o'zgartiring (repozitoriya nomini yozing):
    ```javascript
    export default defineConfig({
      base: '/Yufor_uz/', // Repozitoriya nomi
      plugins: [vue()],
    })
    ```
4.  Loyiha yig'ing (build):
    ```bash
    npm run build
    ```
5.  `dist` papkasi ichidagi barcha fayllarni GitHub repozitoriyangizning `gh-pages` branchiga yoki asosiy branchga yuklang.

### 2. Bot (Python)

1.  `bot/` papkasiga kiring:
    ```bash
    cd bot
    ```
2.  Bog'liqliklarni o'rnating:
    ```bash
    pip install -r requirements.txt
    ```
3.  `.env.example` faylini `.env` deb o'zgartiring va o'z ma'lumotlaringizni (Token, Channel ID va h.k.) kiriting.
4.  Botni ishga tushiring:
    ```bash
    python main.py
    ```

## Xususiyatlar

- **Uzum Market uslubi:** Mahsulot rasmiga bosganda alohida oyna ochiladi, rasmlar va o'lcham tanlovi mavjud.
- **JSON Buyurtma:** Barcha buyurtmalar siz ko'rsatgan kanalga JSON formatida yuboriladi.
- **Premium Dizayn:** Tibbiy sohaga mos keladigan oq va och ko'k ranglar uyg'unligi.

---
Yaratuvchi: **Antigravity (Google DeepMind)**
# yufor-uz
