# ahmedmokireldin - Professional Technical Solutions

## Overview
A modern, bilingual (English/Arabic) landing page for ahmedmokireldin's technical services specializing in WhatsApp Business API, chatbot development, and digital automation solutions.

## Recent Changes
- **2026-01-19**: Updated branding to "ahmedmokireldin" with custom logo
- **2026-01-19**: Migrated from Lovable to Replit environment
- **2026-01-19**: Major design improvements:
  - Added modern Hero section with gradient background and animations
  - Improved Header with scroll effects and transparent navigation
  - Enhanced Services section with modern card design
  - Updated Footer with better layout and visual design

## Project Architecture

### Tech Stack
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui (Radix UI primitives)
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **State Management**: React Query (TanStack Query)
- **Icons**: Lucide React

### File Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn UI components
│   ├── Header.tsx      # Navigation header
│   ├── HeroSection.tsx # Hero section with CTA
│   ├── ServicesSection.tsx
│   ├── PricingSection.tsx
│   ├── ContactForm.tsx
│   └── Footer.tsx
├── contexts/           # React context providers
│   └── LanguageContext.tsx  # Bilingual support (EN/AR)
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
│   ├── Index.tsx       # Main landing page
│   └── NotFound.tsx    # 404 page
└── index.css           # Global styles and Tailwind config
```

### Design System
- **Primary Color**: tech-blue (#4e54c8)
- **Secondary Color**: tech-purple (#8f94fb)
- **Accent Color**: tech-accent (#ff6b6b)
- **Dark Color**: tech-dark (#2c2f4a)
- **Fonts**: Poppins (English), Tajawal (Arabic)

## User Preferences
- Bilingual support (English/Arabic) with RTL layout
- Modern, professional design with gradients and animations
- Responsive design for all devices
- Smooth scrolling navigation

## Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment
Configured for Replit autoscale deployment:
- Build command: `npm run build`
- Output directory: `dist`
