# SABLY - Modern e-commerce Platform

<div align="center">
  <img src="public/hero/logo1.png" alt="SABLY Logo" width="400"/>
  <br/>
  <p><strong>Advanced digital subscription e-commerce platform built with Next.js</strong></p>
</div>

## 📋 Overview

SABLY is a comprehensive digital subscription management platform that allows users to discover, purchase, and manage subscriptions for popular services including Apple Music, Spotify, YouTube Premium, Netflix, Adobe Creative Cloud, HBO Max, and more. The platform features a modern, responsive design with Persian language support and advanced e-commerce functionality.

## 🛠️ Tech Stack

- **Framework:** Next.js 15.3.1 (App Router) with Turbopack
- **Frontend:** React 19, Tailwind CSS 4
- **Database:** Supabase (PostgreSQL)
- **State Management:** TanStack Query 5.83.0
- **Authentication:** Supabase Auth with OTP verification
- **PWA:** @ducanh2912/next-pwa for Progressive Web App
- **UI Libraries:** React Icons, Swiper, React CountUp
- **Effects:** React Just Parallax for smooth animations
- **Styling:** Clsx for conditional classes
- **Notifications:** Sonner for toast messages
- **Utilities:** Persian/Arabic number conversion system

## 🎯 Features

### 🔐 Authentication & User Management

- **OTP Authentication** - Secure 4-digit PIN phone verification system
- **Persian/Arabic Digit Support** - Automatic conversion to English digits
- **Custom PIN Input Field** - Enhanced user experience with timer
- **User Profile Management** - Account details, settings, and preferences
- **Session Management** - Persistent authentication with automatic redirects

### 🛒 E-commerce & Shopping

- **Advanced Shopping Cart** - Local storage + server synchronization
- **Smart Cart Management** - Real-time quantity updates and price calculations
- **Checkout System** - Comprehensive order processing with account credentials
- **Dynamic Pricing** - Support for discounts and promotional pricing
- **Account Credentials Input** - For services requiring login information
- **Order Management** - Complete order tracking and history

### 📱 Progressive Web App (PWA)

- **Offline Support** - Service worker implementation
- **App-like Experience** - Installable on mobile and desktop
- **Push Notifications** - Real-time updates and alerts
- **Manifest Configuration** - Custom shortcuts and branding

### 🌐 Multi-language & Accessibility

- **RTL/LTR Support** - Seamless direction switching
- **Persian Language Support** - Full localization with Vazir font
- **Number Conversion** - Persian/Arabic to English digit conversion
- **Responsive Design** - Mobile-first approach with breakpoint optimization

### 🎨 UI/UX Features

- **Modern Design System** - Gradient backgrounds and smooth animations
- **Parallax Effects** - Engaging scroll-based animations
- **Interactive Components** - Hover effects and transitions
- **Search Functionality** - Real-time product search
- **Category Navigation** - Organized product browsing
- **Swiper Integration** - Touch-friendly carousels and galleries

### 📊 Business Features

- **Product Categorization** - Company-based and category-based organization
- **Dynamic Product Pages** - SEO-optimized with static generation
- **Order Success Pages** - Confirmation and receipt management
- **Support System** - Contact and customer service integration
- **Analytics Ready** - Built-in tracking capabilities

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Yarn package manager
- Supabase account

### Installation

```bash
# Clone repository
git clone https://github.com/erfan-mirasadi/SUBLY
cd sub-ly

# Install dependencies
yarn install

# Setup environment variables
cp .env.example .env.local
# Add your Supabase credentials

# Run development server with Turbopack
yarn dev
```

Open [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
# Development with Turbopack
yarn dev

# Production build
yarn build

# Start production server
yarn start

# Lint code
yarn lint
```

## 📁 Project Structure

```
src/
├── app/                   # Next.js App Router
│   ├── category/          # Product categories
│   ├── company/           # Company/brand pages
│   ├── products/          # Product listings & details
│   ├── checkout/          # Shopping cart & checkout flow
│   ├── profile/           # User dashboard
│   │   ├── account/       # Profile information
│   │   ├── orders/        # Order history & tracking
│   │   └── settings/      # User preferences
│   ├── login/             # OTP authentication
│   ├── success/           # Order confirmation
│   ├── support/           # Customer support
│   └── contactUs/         # Contact information
├── components/            # Reusable React components
│   ├── navBar/            # Navigation & cart
│   ├── home/              # Homepage sections
│   ├── products/          # Product-related components
│   ├── section/           # Layout sections
│   └── ui/                # UI primitives
├── hooks/                 # Custom React hooks
│   ├── query/             # TanStack Query hooks
│   └── mutate/            # Mutation hooks
├── lib/                   # Utility functions
│   ├── auth.js            # Authentication helpers
│   ├── persianNumbers.js  # Number conversion
│   └── staticData.js      # Static content
└── services/              # API integrations
    ├── supabase.js        # Database connection
    ├── queryClient.js     # Query configuration
    └── Api*.js            # Service modules
```

## ⚙️ Configuration Files

- **next.config.mjs** - Next.js configuration with PWA
- **tailwind.config.js** - Tailwind CSS customization
- **postcss.config.mjs** - PostCSS configuration
- **eslint.config.mjs** - ESLint rules
- **jsconfig.json** - JavaScript project settings
- **public/manifest.json** - PWA manifest
- **public/sw.js** - Service worker

## 🔧 Environment Variables

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 🔗 Key Components & Features

### Authentication System

- **OTP Verification**: Custom 4-digit PIN field with timer
- **Phone Number Support**: Persian/Arabic digit conversion
- **Session Management**: Persistent login with auto-redirect
- **User Profiles**: Account information and settings management

### Shopping Experience

- **Smart Cart**: Local + server synchronization
- **Product Catalog**: Dynamic filtering and search
- **Checkout Flow**: Multi-step process with account credentials
- **Order Tracking**: Real-time status updates
- **Price Calculation**: Dynamic pricing with discount support

### PWA Features

- **Offline Capability**: Service worker caching
- **Install Prompts**: Native app-like installation
- **Shortcuts**: Quick access to products and profile
- **Performance**: Optimized loading and caching strategies

### Internationalization

- **RTL/LTR Support**: Seamless direction switching
- **Persian Localization**: Complete UI translation
- **Number Conversion**: Automatic digit conversion utilities
- **Font Support**: Vazir font family integration

## 📊 Performance & SEO

- **Next.js App Router** - Server-side rendering and static generation
- **Image Optimization** - Automatic WebP conversion and lazy loading
- **Code Splitting** - Dynamic imports and route-based chunking
- **PWA Optimization** - Caching strategies and offline support
- **Meta Tags** - Dynamic SEO optimization for product pages
- **Analytics Ready** - Google Analytics and conversion tracking

## 🛡️ Security Features

- **OTP Authentication** - Secure phone-based verification
- **Input Sanitization** - XSS protection and data validation
- **CORS Configuration** - Proper API security headers
- **Environment Variables** - Sensitive data protection
- **Supabase RLS** - Row-level security policies

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Development Guidelines

- Use **TypeScript** for new components when possible
- Follow **ESLint** configuration for code style
- Write **responsive** designs with Tailwind CSS
- Add **proper error handling** for API calls
- Include **loading states** for better UX
- Test **Persian number conversion** for numeric inputs

## 🙏 Acknowledgments

- **Next.js** team for the incredible framework
- **Supabase** for backend-as-a-service
- **Tailwind CSS** for utility-first styling
- **TanStack Query** for data fetching
- **React Icons** for icon library

---

<div align="center">
  <p>Built with ❤️ using Next.js, Supabase, and modern web technologies</p>
  <p>Supporting Persian/English languages • PWA Ready • Mobile First</p>
</div>
