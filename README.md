# SABLY - Subscription Management Platform

<div align="center">
  <img src="/hero/logo1.png" alt="SABLY Logo" width="400"/>
  <br/>
  <p><strong>Modern subscription management platform built with Next.js</strong></p>
</div>

## 📋 Overview

SABLY is a modern e-commerce platform specializing in digital subscription management. The platform enables users to discover, purchase, and manage digital subscriptions for popular services like Apple Music, Spotify, YouTube, Nuke, and other entertainment platforms. Built with a mobile-first approach and featuring a comprehensive shopping cart system with secure OTP-based authentication.

### 🎯 Key Features

- **🛒 Full E-commerce System** - Complete shopping cart with local/server synchronization
- **📱 OTP Authentication** - Secure phone number-based authentication with Supabase
- **💳 Checkout Process** - Comprehensive order management and payment integration
- **📦 Product Management** - Dynamic pricing with outlet/discount system
- **🎨 Responsive Design** - Mobile-first design with Tailwind CSS
- **🔄 Real-time Updates** - TanStack Query for efficient data management
- **🏢 Company & Category Navigation** - Advanced dropdown menus with hover effects
- **🎭 Dynamic UI** - Gradient effects, smooth animations, and modern design

## 🏗️ Architecture

### Tech Stack

- **Framework:** Next.js 15.0.3 (App Router)
- **Frontend:** React 19, Tailwind CSS 4
- **Database:** Supabase with PostgreSQL
- **Authentication:** Supabase Auth + NextAuth.js
- **State Management:** TanStack Query 5.83.0
- **Icons:** React Icons (Lucide, FontAwesome)
- **Notifications:** Sonner
- **Development:** ESLint, PostCSS

### Project Structure

```
sub-ly/
├── public/                 # Static assets
│   ├── hero/              # Hero section images & company logos
│   ├── benefits/          # Feature icons & cards
│   ├── pricing/           # Pricing assets
│   ├── socials/           # Social media icons
│   └── videos/            # Video content
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── globals.css    # Global styles with Tailwind
│   │   ├── layout.js      # Root layout with providers
│   │   ├── page.js        # Homepage
│   │   ├── category/      # Category pages with [slug]
│   │   ├── company/       # Company pages with [slug]
│   │   ├── products/      # Product pages with [slug]
│   │   ├── checkout/      # Checkout page
│   │   ├── contactUs/     # Contact page
│   │   ├── login/         # Authentication pages
│   │   └── profile/       # User profile pages
│   ├── components/        # Reusable components
│   │   ├── navBar/        # Navigation & cart components
│   │   ├── home/          # Homepage components
│   │   ├── products/      # Product components
│   │   ├── productPrice/  # Pricing components
│   │   ├── section/       # Layout sections
│   │   └── ui/            # UI utilities
│   ├── hooks/             # Custom React hooks
│   │   ├── useCart.js     # Cart management
│   │   ├── query/         # TanStack Query hooks
│   │   └── mutate/        # Mutation hooks
│   ├── services/          # API and external services
│   │   ├── supabase.js    # Supabase client
│   │   ├── queryClient.js # React Query client
│   │   └── ApiCartItmes.js # Cart API
│   └── lib/               # Utilities and configurations
│       ├── auth.js        # Authentication utilities
│       ├── checkout.js    # Checkout utilities
│       └── staticData.js  # Static navigation data
└── config files           # Configuration files
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Yarn package manager
- Supabase account

### Installation

1. **Clone the repository**

   ```bash
    git clone https://github.com/erfanmirasadi/SUBLY
   cd sub-ly
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   NEXTAUTH_SECRET=your_nextauth_secret
   ```

4. **Database Setup**

   - Create a new Supabase project
   - Set up required tables: categories, companies, products, product_entries, product_plans, cart_items, orders
   - Configure Row Level Security (RLS) policies
   - Enable authentication with phone providers

5. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to [https://subly-virid.vercel.app/](http://localhost:3000)

## 🧩 Core Components

### 🛒 E-commerce System

#### `Cart.jsx`

Advanced shopping cart with overlay functionality:

- **Overlay Design** - Click-outside-to-close with backdrop blur
- **Mobile Optimization** - Responsive X button positioning
- **Local/Server Sync** - Handles both guest and authenticated users
- **Real-time Updates** - Quantity changes with loading states
- **Price Display** - Shows discounts, outlets, and original prices

```jsx
// Cart overlay with proper z-indexing
<>
  <div
    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
    onClick={() => setIsCartOpen(false)}
  />
  <div className="fixed top-0 right-0 max-w-[400px] z-50">
    {/* Cart content */}
  </div>
</>
```

#### `useCart.js`

Custom hook for cart state management:

- **Local Storage** - Persistent cart for guest users
- **Server Sync** - Automatic synchronization for logged-in users
- **Quantity Management** - Add, remove, and update quantities
- **Price Calculations** - Total price with discounts

### 🔐 Authentication System

#### OTP-Based Authentication

Secure phone number authentication using Supabase:

- **Phone Verification** - OTP sent via SMS
- **Session Management** - NextAuth.js integration
- **Profile Management** - User profile updates and settings
- **Protected Routes** - Authentication-based access control

```jsx
// OTP verification flow
const verifyOTP = async (phone, otp) => {
  const { data, error } = await supabase.auth.verifyOtp({
    phone,
    token: otp,
    type: "sms",
  });
};
```

### 🎯 Navigation System

#### `NavBar.jsx`

Main navigation with cart integration:

- **Responsive Design** - Desktop and mobile layouts
- **Cart Icon** - Shows item count with animation
- **Authentication** - Login/logout buttons
- **Company Branding** - SABLY logo and styling

#### `DropdownNavigator.jsx`

Desktop dropdown navigation:

- **Hover-based** - Opens on mouse hover
- **Tab switching** - Categories and Companies
- **Grid layout** - Organized content display
- **Smooth animations** - Gradient effects
  const createGridLayout = (items) => {
  const grid = [];
  for (let i = 0; i < 5; i++) {
  const row = [];
  for (let j = 0; j < 4; j++) {
  const index = i \* 4 + j;
  row.push(items[index] || null);
  }
  grid.push(row);
  }
  return grid;
  };

````

#### `MobileDropdown.jsx`

Mobile navigation dropdown:

- **Full-screen overlay** - Immersive mobile experience
- **Tab switcher** - Categories/Companies toggle
- **Background effects** - Robot image with decorative elements
- **Smooth transitions** - Animated opening/closing

### 📦 Product Management

#### `PriceSection.jsx`

Responsive pricing layout:

- **Grid System** - 2/3/4 cards per row (mobile/tablet/desktop)
- **Plan Cards** - Individual subscription plans
- **Responsive Design** - Optimized for all screen sizes

```jsx
// Responsive grid layout
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {plans.map((plan, index) => (
    <PlanCards key={plan.id} plan={plan} index={index} />
  ))}
</div>
````

#### `PlanCards.jsx`

Individual plan cards with:

- **Sequential Colors** - Non-random color assignment using index
- **Pricing Display** - Shows original and discounted prices
- **Feature Lists** - Detailed plan features
- **Mobile Optimization** - Responsive heights and spacing

```jsx
// Sequential color assignment
const colors = ["bg-gradient-1", "bg-gradient-2", "bg-gradient-3"];
const colorClass = colors[index % colors.length];
```

#### `ProductCard.jsx`

Product display cards:

- **Dynamic Pricing** - Outlet/discount price calculations
- **Image Optimization** - Next.js Image component
- **Hover Effects** - Interactive states
- **Company Branding** - Logo integration

### 🎨 Homepage Components

#### `HeroProductCarousel.jsx`

Hero section carousel featuring:

- **Popular Products** - Apple Music, Spotify, YouTube, Nuke
- **Smooth Animations** - Swiper.js integration
- **Hover Effects** - Product details on hover
- **Responsive Design** - Mobile-optimized carousel

#### `CompanyLogos.jsx`

Company partner showcase:

- **Logo Grid** - Partner company logos
- **Hover Effects** - Interactive logo display
- **Brand Recognition** - Popular service providers

### 🔄 Data Management

#### TanStack Query Integration

Efficient data fetching and caching:

- **Query Hooks** - Product, category, and company queries
- **Mutation Hooks** - Cart operations and user actions
- **Cache Management** - Automatic data synchronization
- **Loading States** - Optimistic updates and error handling

```jsx
// Product query hook
export const useProductsQuery = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProductsQuery,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
```

#### Supabase Integration

Database operations and real-time updates:

- **Product Management** - Dynamic product listings
- **Cart Operations** - Server-side cart persistence
- **User Authentication** - Secure OTP-based auth
- **Order Processing** - Complete checkout workflow

### 💳 Checkout System

#### `checkout/page.jsx`

Complete checkout process:

- **Order Summary** - Cart items and pricing
- **User Information** - Contact and delivery details
- **Payment Processing** - Secure payment integration
- **Order Confirmation** - Success and error handling

### 📱 Responsive Design

#### Mobile-First Approach

Tailwind CSS breakpoints:

- **Mobile (default)** - Optimized for small screens
- **Tablet (md:)** - Medium screen adaptations
- **Desktop (lg:)** - Large screen enhancements
- **Wide (xl:)** - Extra large screen optimizations

```css
/* Example responsive classes */
.grid-cols-2 md:grid-cols-3 lg:grid-cols-4
.min-h-[200px] md:min-h-[300px]
.text-sm md:text-base lg:text-lg
```

## 🛠️ Development

### Project Configuration

#### `next.config.mjs`

Next.js configuration with optimizations:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["your-supabase-url.supabase.co"],
  },
  experimental: {
    appDir: true,
  },
};

export default nextConfig;
```

#### `tailwind.config.mjs`

Tailwind CSS configuration:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#DD734F",
        secondary: "#B9AEDF",
        background: "#0E0C15",
        surface: "#1B1B2E",
        border: "#252134",
      },
      fontFamily: {
        grotesk: ["Space Grotesk", "sans-serif"],
        vazirmatn: ["Vazirmatn", "sans-serif"],
      },
      backgroundImage: {
        "conic-gradient": "conic-gradient(from 180deg, #DD734F, #B9AEDF)",
      },
    },
  },
  plugins: [],
};
```

#### `eslint.config.mjs`

ESLint configuration for code quality:

```javascript
import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@next/next": nextPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
    },
  },
];
```

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Dependencies
npm install          # Install dependencies
npm audit            # Check for vulnerabilities
```

## 🗄️ Database Schema

### Core Tables

#### Products Table

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  image_small_url TEXT,
  image_big_url TEXT,
  category_id INTEGER REFERENCES categories(id),
  company_id INTEGER REFERENCES companies(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Product Plans Table

```sql
CREATE TABLE product_plans (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  discount_price DECIMAL(10,2),
  state VARCHAR(50), -- 'active', 'outlet'
  features TEXT[],
  product_entry_id INTEGER REFERENCES product_entries(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Cart Items Table

```sql
CREATE TABLE cart_items (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  plan_id INTEGER REFERENCES product_plans(id),
  quantity INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Orders Table

```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  order_items JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Authentication Tables

#### Users (Supabase Auth)

Built-in Supabase authentication with:

- Phone number verification
- OTP-based login
- Session management
- Profile data

## 🚀 Deployment

### Vercel Deployment

1. **Connect Repository**

   ```bash
   git push origin main
   ```

2. **Environment Variables**
   Set up in Vercel dashboard:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=https://your-domain.vercel.app
   ```

3. **Build Settings**
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": ".next",
     "installCommand": "npm install"
   }
   ```

### Performance Optimizations

- **Image Optimization** - Next.js Image component
- **Code Splitting** - App Router automatic splitting
- **Caching** - TanStack Query cache management
- **Bundle Analysis** - Use `@next/bundle-analyzer`

## 📈 Features Overview

### ✅ Completed Features

- 🛒 **Shopping Cart System** - Full e-commerce functionality
- 📱 **Mobile-First Design** - Responsive across all devices
- 🔐 **OTP Authentication** - Secure phone-based login
- 💳 **Checkout Process** - Complete order management
- 🎨 **Modern UI/UX** - Gradient effects and animations
- 📦 **Product Management** - Dynamic pricing and categorization
- 🔄 **Real-time Updates** - TanStack Query integration
- 📊 **Admin Dashboard** - Product and order management

### 🎯 Target Users

- **End Users** - Subscription service buyers
- **Administrators** - Platform managers
- **Developers** - Open source contributors

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit changes** (`git commit -m 'Add amazing feature'`)
4. **Push to branch** (`git push origin feature/amazing-feature`)
5. **Open Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:

- **Issues** - [GitHub Issues](https://github.com/your-username/subly/issues)
- **Discussions** - [GitHub Discussions](https://github.com/your-username/subly/discussions)
- **Email** - support@subly.com

---

<div align="center">
  <p>Built with ❤️ using Next.js and Supabase</p>
  <p><strong>SABLY - Modern Subscription Management Platform</strong></p>
</div>
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  category_id INTEGER REFERENCES categories(id),
  company_id INTEGER REFERENCES companies(id),
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🎨 Design System

### Color Palette

- **Primary:** `#DD734F` (Orange)
- **Secondary:** `#B9AEDF` (Purple)
- **Background:** `#0E0C15` (Dark)
- **Surface:** `#1B1B2E` (Medium Dark)
- **Border:** `#252134` (Light Dark)

### Typography

- **Primary Font:** Space Grotesk
- **Weights:** 400, 500, 600, 700
- **Sizes:** 12px, 14px, 16px, 18px, 24px, 32px, 48px

### Spacing

- **Base Unit:** 4px
- **Common Spacings:** 4px, 8px, 16px, 24px, 32px, 48px, 64px

### Code Style

- **ESLint** for code linting
- **Prettier** for code formatting

### Git Workflow

1. **Feature branches** for new development
2. **Pull requests** for code review
3. **Main branch** for production releases

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email erfan.mirasadi@gmail.com or create an issue in the repository.

---

<div align="center">
  <p>Built with ❤️</p>
</div>
