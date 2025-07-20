# SUBLY - Subscription Management Platform

<div align="center">
  <img src="public/hero/robot.jpg" alt="Subly Logo" width="200"/>
  <br/>
  <p><strong>Modern subscription management platform built with Next.js</strong></p>
</div>

## 📋 Overview

SUBLY is a comprehensive subscription management platform that helps users discover, compare, and manage their digital subscriptions. The platform provides a modern, responsive interface for browsing categories, companies, and products with advanced filtering and search capabilities.

### 🎯 Key Features

- **Dynamic Category & Company Navigation** - Interactive dropdown menus with hover effects
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Real-time Data Fetching** - Integration with Supabase for dynamic content
- **Modern UI/UX** - Clean, gradient-based design with smooth animations
- **Product Management** - Comprehensive product browsing and filtering
- **User Authentication** - Secure sign-in and account management
- **Shopping Cart** - Full e-commerce functionality

## 🏗️ Architecture

### Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Database:** Supabase
- **Authentication:** Supabase Auth
- **Deployment:** Vercel (recommended)
- **Package Manager:** Yarn

### Project Structure

```
sub-ly/
├── public/                 # Static assets
│   ├── hero/              # Hero section images
│   ├── benefits/          # Feature icons
│   ├── pricing/           # Pricing assets
│   └── videos/            # Video content
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── api/           # API routes
│   │   ├── category/      # Category pages
│   │   ├── compony/       # Company pages
│   │   ├── products/      # Product pages
│   │   ├── signin/        # Authentication
│   │   ├── sub/           # Subscription pages
│   │   └── userProfile/   # User account pages
│   ├── components/        # Reusable components
│   │   ├── navBar/        # Navigation components
│   │   ├── home/          # Homepage components
│   │   ├── products/      # Product components
│   │   └── ui/            # UI utilities
│   ├── hooks/             # Custom React hooks
│   └── services/          # API and external services
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
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Database Setup**

   - Create a new Supabase project
   - Set up the required tables (categories, companies, products)
   - Configure authentication settings

5. **Run the development server**

   ```bash
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧩 Core Components

### Navigation System

#### `NavBar.jsx`

Main navigation component that includes:

- Logo and branding
- Desktop navigation menu
- Mobile menu integration
- Category/Company dropdown

#### `DropdownNavigator.jsx`

Advanced dropdown component for desktop:

- **Hover-based navigation** - Opens on mouse hover
- **Tab switching** - Switch between Categories and Companies
- **Grid layout** - 5×4 grid for organized content display
- **Smooth animations** - Gradient lines and hover effects
- **Full-width dropdown** - Spans entire page width

**Key Features:**

```javascript
// Hover detection with mouse events
const handleMouseEnter = (tabKey) => {
  setHoveredTab(tabKey);
  setActiveTab(tabKey);
  setDropdownOpen(true);
};

// Grid layout generation
const createGridLayout = (items) => {
  const grid = [];
  for (let i = 0; i < 5; i++) {
    const row = [];
    for (let j = 0; j < 4; j++) {
      const index = i * 4 + j;
      row.push(items[index] || null);
    }
    grid.push(row);
  }
  return grid;
};
```

#### `MobileDropdown.jsx`

Mobile-specific dropdown with:

- **Full-screen overlay** - Immersive mobile experience
- **Tab switcher** - Categories/Companies toggle
- **Background effects** - Robot image with decorative elements
- **Smooth transitions** - Animated opening/closing

### Homepage Components

#### `Hero.jsx`

Main hero section featuring:

- **Animated background** - Dynamic circles and gradients
- **Company logos** - Partner brand showcase
- **Call-to-action** - Primary user engagement
- **Responsive design** - Optimized for all screen sizes

#### `Products.jsx`

Product showcase component:

- **Product cards** - Individual product displays
- **Filtering system** - Category and company filters
- **Grid layout** - Responsive product grid
- **Hover effects** - Interactive product cards

### Product Management

#### `ProductCard.jsx`

Individual product display:

- **Product images** - High-quality product photos
- **Pricing information** - Dynamic price display
- **Subscription details** - Plan information
- **Action buttons** - Add to cart, view details

#### `AllProducts.jsx`

Product listing page:

- **Search functionality** - Product search
- **Filtering options** - Multiple filter criteria
- **Pagination** - Load more functionality
- **Sorting options** - Price, popularity, etc.

### `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
      },
    },
  },
  plugins: [],
};
```

### `eslint.config.mjs`

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

## 🗄️ Database Schema

### Categories Table

```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Companies Table

```sql
CREATE TABLE companies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  logo_url TEXT,
  website_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Products Table

```sql
CREATE TABLE products (
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
  <p>Built with ❤️ using Next.js and Supabase</p>
</div>
