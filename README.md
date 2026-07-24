# Ossama Majid — Portfolio

My personal portfolio website. Built from scratch with React, TypeScript, and GSAP. Designed to feel premium, load fast, and leave an impression.

Live → **[ossamamajid.vercel.app](https://ossama-majid-portfolio.vercel.app)**

---

## What's Inside

A fully custom dark-mode portfolio with smooth scroll, editorial typography animations, and a working contact form. No templates, no themes — every component written by hand.

**Sections:**
- Hero with animated availability status
- Selected Works with scroll-driven project transitions
- Services & Skills breakdown
- About with full-color portrait
- Contact form (powered by EmailJS — actually sends emails)

---

## Tech Stack

| Layer | Tools |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS v4 |
| Animations | GSAP + Framer Motion (Motion) |
| Smooth Scroll | Lenis |
| Contact | EmailJS |
| Icons | Lucide React |

---

## Running Locally

```bash
git clone https://github.com/Ossamamajid143/OssamaMajid-Portfolio.git
cd OssamaMajid-Portfolio
npm install
```

Create a `.env` file in the root (see `.env.example` for the variable names):

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_CONTACT_TEMPLATE_ID=your_contact_template_id
VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID=your_autoreply_template_id
```

Then start the dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

---

## Contact Form Setup

The contact form uses [EmailJS](https://www.emailjs.com/) — no backend needed. When someone submits the form:
1. You get the inquiry email
2. They get an auto-reply confirmation

Set up a free EmailJS account, create two email templates, and drop the keys into your `.env` file.

---

## Project Structure

```
src/
├── assets/images/      # Project screenshots and profile photo
├── components/         # All page sections as React components
├── hooks/
│   ├── useCurtainScroll.ts   # Lenis smooth scroll + GSAP init
│   └── useContactForm.ts     # Shared EmailJS form hook (used by both forms)
├── utils/
│   ├── scrollAnimations.ts   # GSAP scroll-triggered animations
│   └── curtainAnimation.ts   # Curtain/section reveal logic
├── types.ts            # Shared TypeScript interfaces
├── App.tsx             # Root layout, navigation state, slide-out panel
├── main.tsx            # Entry point
└── index.css           # Global styles and Tailwind config
```

---

## Deployment

Deployed on [Vercel](https://vercel.com). Any push to `main` triggers an automatic redeploy.

Add your EmailJS environment variables in Vercel under **Project → Settings → Environment Variables**.

---

Built by **Ossama Majid** — Frontend Developer & Designer
