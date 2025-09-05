# SABLY - Subscription Management Platform

<div align="center">
  <img src="public/hero/logo1.png" alt="SABLY Logo" width="400"/>
  <br/>
  <p><strong>Modern subscription management platform built with Next.js</strong></p>
</div>

## 📋 Overview

SABLY is a modern e-commerce platform for digital subscription management. Users can discover, purchase, and manage subscriptions for services like Apple Music, Spotify, YouTube, and more.

## �️ Tech Stack

- **Framework:** Next.js 15.3.1 (App Router)
- **Frontend:** React 19, Tailwind CSS 4
- **Database:** Supabase (PostgreSQL)
- **State Management:** TanStack Query 5.83.0
- **Authentication:** Supabase Auth (OTP)
- **Icons:** React Icons
- **Notifications:** Sonner

## 🎯 Features

- 🛒 **Shopping Cart** - Complete e-commerce system
- 📱 **OTP Authentication** - Secure phone verification
- 💳 **Checkout Process** - Order management
- 🎨 **Responsive Design** - Mobile-first approach
- 🔄 **Real-time Updates** - TanStack Query integration
- 📦 **Product Management** - Dynamic pricing system

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

# Run development server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000)

## � Project Structure

```
src/
├── app/                   # Next.js App Router
│   ├── category/          # Category pages
│   ├── company/           # Company pages
│   ├── products/          # Product pages
│   ├── checkout/          # Checkout flow
│   └── profile/           # User profile
├── components/            # React components
│   ├── navBar/            # Navigation
│   ├── home/              # Homepage
│   └── products/          # Product components
├── hooks/                 # Custom hooks
├── services/              # API services
└── lib/                   # Utilities
```

## � Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/name`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/name`)
5. Open Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file

---

<div align="center">
  <p>Built with ❤️ using Next.js and Supabase</p>
</div>
