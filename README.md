# 🚗 Blaupunkt EV Systems - Official Website

Modern, responsive website for Blaupunkt EV charging solutions built with React, Vite, and Tailwind CSS.

**Live Site:** [https://blaupunkt-ev.com](https://blaupunkt-ev.com)

---

## 📋 Table of Contents

- [Project Structure](#-project-structure)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Deployment](#-deployment)
- [Documentation](#-documentation)
- [Contact](#-contact)

---

## 📁 Project Structure

```
blaupunkt/
├── 📄 README.md                    # Project overview
├── 📄 package.json                 # Dependencies & scripts
├── 📄 vite.config.js              # Vite configuration
├── 📄 tailwind.config.js          # Tailwind CSS configuration
├── 📄 .env.example                # Environment variables template
│
├── 📁 .github/workflows/          # GitHub Actions
│   └── deploy.yml                 # Auto-deployment to Hostinger
│
├── 📁 src/                        # Frontend source code
│   ├── 📁 Components/             # React components
│   │   ├── 📁 Common/            # Reusable components (Navbar, Footer, etc.)
│   │   ├── 📁 CommonPages/       # Shared page components
│   │   ├── 📁 Products/          # Product listing components
│   │   ├── 📁 Admin/             # Admin panel components
│   │   └── 📁 Loading/           # Loading states
│   │
│   ├── 📁 Pages/                 # Page components (routes)
│   ├── 📁 Data/                  # Product data & configurations
│   ├── 📁 assets/                # Static assets (images, PDFs, videos)
│   ├── 📁 config/                # Configuration files
│   ├── 📁 hooks/                 # Custom React hooks
│   ├── 📁 lib/                   # Utility libraries
│   └── 📁 utils/                 # Utility functions
│
├── 📁 public/                     # Static files & backend
│   ├── 📁 api/                   # PHP backend
│   │   ├── contact.php           # Contact form handler
│   │   └── mail.Html             # Email template
│   └── .htaccess                 # Apache rewrite rules
│
└── 📁 docs/                       # Documentation
    ├── SETUP_COMPLETE.md          # Quick start guide
    └── DEPLOYMENT.md              # Deployment documentation
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS 4
- **Routing:** React Router 7
- **Icons:** Lucide React

### Backend
- **Language:** PHP 8.x
- **Email:** Hostinger mail() function
- **Server:** Apache (Hostinger)

### Deployment
- **Hosting:** Hostinger
- **CI/CD:** GitHub Actions
- **Method:** FTP Deploy

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git
- GitHub account (for automated deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/AbinVarghexe/Blaupunkt.git
   cd Blaupunkt
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   ```
   http://localhost:5173
   ```

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Lint code with ESLint
```

---

## 🌐 Deployment

### Automated Deployment (GitHub Actions)

The project uses **GitHub Actions** for automatic deployment to Hostinger using **SSH** (secure & fast).

#### Quick Setup:

**Option 1: Automated Script (Recommended)**

```bash
# Windows PowerShell
.\scripts\setup-ssh-deployment.ps1

# Mac/Linux
chmod +x scripts/setup-ssh-deployment.sh
./scripts/setup-ssh-deployment.sh
```

**Option 2: Manual Setup**

1. **Generate SSH Key**
   ```bash
   ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/hostinger_deploy
   ```

2. **Add Public Key to Hostinger**
   - Log in to Hostinger hPanel
   - Go to Advanced → SSH Access
   - Add your public key (`~/.ssh/hostinger_deploy.pub`)

3. **Add GitHub Secrets** (Settings → Secrets → Actions):
   ```
   SSH_PRIVATE_KEY = (content of ~/.ssh/hostinger_deploy)
   SSH_HOST = ssh.yourdomain.com
   SSH_USERNAME = your_hostinger_username
   SSH_PORT = 65002
   SSH_TARGET_DIR = /home/username/public_html
   ```

4. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

5. **Automatic Deployment**
   - GitHub Actions builds your React app
   - Deploys to Hostinger via SSH (secure & efficient!)
   - Site is live! 🎉

**Full deployment guides:**
- **[SSH Deployment Setup](SSH_DEPLOYMENT_SETUP.md)** - Complete SSH setup guide
- **[General Deployment Guide](DEPLOYMENT.md)** - All deployment options

---

## 📧 Contact Form Setup

The contact form uses a **PHP backend** hosted on Hostinger.

### How It Works:

```
User fills form → React frontend → POST to /api/contact.php → 
PHP validates & sends email → info@blaupunkt-ev.com
```

### Email Template Features:
- ✅ Modern black & white design with light blue accents
- ✅ Mobile-responsive
- ✅ HTML formatted
- ✅ Auto-reply-to customer email

### Configuration:

Edit [`public/api/contact.php`](public/api/contact.php):
```php
$to = 'info@blaupunkt-ev.com';  // Your email
$from = 'noreply@blaupunkt-ev.com';  // Sender email
```

**Note:** Ensure `noreply@blaupunkt-ev.com` is created in Hostinger Email.

---

## 📖 Documentation

**📚 [Complete Documentation](docs/README.md)** - Comprehensive guide to all documentation

### Quick Links

#### 🚀 Getting Started
- **[Setup Complete](docs/setup/SETUP_COMPLETE.md)** - Project setup status

#### 🌐 Deployment
- **[Deployment Guide](docs/deployment/DEPLOYMENT_GUIDE.md)** - Comprehensive deployment instructions
- **[Hostinger Deployment](docs/deployment/HOSTINGER_DEPLOYMENT.md)** - Hostinger-specific guide
- **[SSH Setup](docs/deployment/SSH_DEPLOYMENT_SETUP.md)** - SSH deployment configuration

#### 📧 Email Configuration
- **[Microsoft Graph Setup](docs/email/MICROSOFT_GRAPH_SETUP.md)** - OAuth 2.0 email with Microsoft Graph API
- **[Office 365 Implementation](docs/email/OFFICE365_IMPLEMENTATION_SUMMARY.md)** - Office 365 overview
- **[Azure Permissions Request](docs/email/REQUEST_AZURE_PERMISSIONS.txt)** - Template for IT team

#### 🧪 Testing
- **[Postman Test Guide](docs/testing/POSTMAN_TEST_GUIDE.md)** - API testing with Postman
- **[Postman Collection](docs/testing/POSTMAN_CONTACT_API_TEST.json)** - Import-ready test collection

### Features
- **Modern UI/UX** - Clean, minimal design
- **Responsive** - Works on all devices
- **Fast** - Optimized with Vite
- **SEO Friendly** - Meta tags & sitemap
- **Contact Form** - Microsoft Graph API email integration with OAuth 2.0
- **Auto Deploy** - GitHub Actions CI/CD

---

## 🔧 Configuration

### Environment Variables

Create `.env.local` for local development:
```bash
VITE_API_URL=http://localhost:5173/api  # Local API endpoint
```

Production uses `/api` (same domain).

### Hostinger Configuration

**Required Email Account:**
- Email: `noreply@blaupunkt-ev.com`
- Used by: PHP mail() function
- Setup: Hostinger hPanel → Email

**Apache .htaccess:**
- Handles React Router
- Routes API requests to PHP
- Enables compression & caching

---

## 🚦 Project Status

- ✅ Frontend: Complete
- ✅ Backend: Complete (PHP)
- ✅ Email System: Complete
- ✅ Deployment: Automated (GitHub Actions)
- ✅ Mobile Responsive: Yes
- ✅ Production Ready: Yes

---

## 📞 Contact & Support

**Website:** [https://blaupunkt-ev.com](https://blaupunkt-ev.com)  
**Email:** info@blaupunkt-ev.com  
**Repository:** [GitHub - Blaupunkt](https://github.com/AbinVarghexe/Blaupunkt)

### Support Channels:
- GitHub Issues: For bugs and feature requests
- Email: For general inquiries

---

## 📄 License

This project is proprietary and confidential.  
© 2025 Blaupunkt EV Systems. All rights reserved.

---

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Hostinger** - Reliable hosting platform

---

**Version 2.0.0** | Last Updated: October 31, 2025

**Changelog:**
- Migrated from Node.js backend to PHP
- Simplified deployment with GitHub Actions
- Optimized email templates for mobile
- All-in-one Hostinger hosting solution