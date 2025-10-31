# 🚀 Complete Deployment Guide - Blaupunkt EV to Hostinger

This guide will walk you through deploying your React + PHP application to Hostinger with a fully functional contact form.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Hostinger Setup](#hostinger-setup)
3. [Email Configuration](#email-configuration)
4. [Local Build & Testing](#local-build--testing)
5. [GitHub Actions Deployment](#github-actions-deployment)
6. [Manual FTP Deployment](#manual-ftp-deployment)
7. [Testing the Contact Form](#testing-the-contact-form)
8. [Troubleshooting](#troubleshooting)

---

## 1️⃣ Prerequisites

Before you begin, ensure you have:

- ✅ Hostinger account with active hosting plan
- ✅ Domain configured (blaupunkt-ev.com)
- ✅ GitHub account
- ✅ Node.js 18+ installed locally
- ✅ Git installed
- ✅ FTP client (FileZilla) - optional for manual deployment

---

## 2️⃣ Hostinger Setup

### Step 1: Access Hostinger hPanel

1. Log in to [Hostinger hPanel](https://hpanel.hostinger.com)
2. Select your hosting plan for `blaupunkt-ev.com`

### Step 2: Get FTP Credentials

1. Go to **Files** → **FTP Accounts**
2. Note down your FTP credentials:
   ```
   FTP Server: ftp.yourdomain.com (or IP address)
   FTP Username: u966003410 (example)
   FTP Password: [your password]
   Port: 21
   ```

### Step 3: Verify PHP Version

1. Go to **Advanced** → **PHP Configuration**
2. Ensure PHP version is **7.4 or higher** (PHP 8.x recommended)
3. Click **Save**

### Step 4: Configure File Manager

1. Go to **Files** → **File Manager**
2. Navigate to `/public_html/`
3. This is where your website files will go

---

## 3️⃣ Email Configuration

### Create Email Accounts in Hostinger

1. Go to **Emails** → **Email Accounts**
2. Click **Create Email Account**

#### Create `noreply@blaupunkt-ev.com`:
```
Email Address: noreply@blaupunkt-ev.com
Password: [strong password]
Mailbox Size: 1 GB (minimum)
```
Click **Create**

#### Create `info@blaupunkt-ev.com`:
```
Email Address: info@blaupunkt-ev.com
Password: [strong password]
Mailbox Size: 5 GB (recommended)
```
Click **Create**

### Verify Email Accounts

1. Go to **Webmail** (from hPanel)
2. Log in to both email accounts to verify they work
3. Note: You'll receive contact form submissions at `info@blaupunkt-ev.com`

---

## 4️⃣ Local Build & Testing

### Step 1: Clone Repository

```bash
# Clone your repository
git clone https://github.com/incial/Blaupunkt.git
cd Blaupunkt

# Switch to deployment branch
git checkout deployomentlive
```

### Step 2: Install Dependencies

```bash
# Install all dependencies
npm install

# Or if you're using pnpm
pnpm install
```

### Step 3: Build for Production

```bash
# Create production build
npm run build
```

This creates a `dist/` folder with:
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── images/
├── api/
│   ├── contact.php
│   └── mail.Html
└── .htaccess
```

### Step 4: Test Local Build

```bash
# Preview production build
npm run preview
```

Visit `http://localhost:4173` and test the contact form locally.

---

## 5️⃣ GitHub Actions Deployment (Automated)

### Step 1: Add GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**

Add these 3 secrets:

**Secret 1: FTP_SERVER**
```
Name: FTP_SERVER
Value: ftp.blaupunkt-ev.com
```

**Secret 2: FTP_USERNAME**
```
Name: FTP_USERNAME
Value: u966003410
```

**Secret 3: FTP_PASSWORD**
```
Name: FTP_PASSWORD
Value: [your FTP password from Step 2]
```

### Step 2: Verify GitHub Actions Workflow

Check that `.github/workflows/deploy.yml` exists:

```yaml
name: Deploy to Hostinger

on:
  push:
    branches:
      - main
      - deployomentlive

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build project
        run: npm run build
      
      - name: Deploy to Hostinger via FTP
        uses: SamKirkland/FTP-Deploy-Action@v4.3.4
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: ./dist/
          server-dir: /public_html/
```

### Step 3: Trigger Deployment

```bash
# Commit your changes
git add .
git commit -m "Deploy to Hostinger with PHP backend"

# Push to trigger deployment
git push origin deployomentlive
```

### Step 4: Monitor Deployment

1. Go to GitHub repository → **Actions** tab
2. Click on the latest workflow run
3. Watch the deployment progress
4. Wait for ✅ green checkmark (usually 2-5 minutes)

### Step 5: Verify Deployment

1. Visit `https://blaupunkt-ev.com`
2. Site should load correctly
3. Navigate to contact page

---

## 6️⃣ Manual FTP Deployment (Alternative)

If GitHub Actions fails or you prefer manual deployment:

### Using FileZilla

1. **Download FileZilla**: https://filezilla-project.org/

2. **Connect to Hostinger**:
   ```
   Host: ftp.blaupunkt-ev.com
   Username: u966003410
   Password: [your FTP password]
   Port: 21
   ```

3. **Upload Files**:
   - Local directory: `dist/` (after running `npm run build`)
   - Remote directory: `/public_html/`
   - Upload method: **Overwrite all files**

4. **Verify Upload**:
   - Check that `index.html` exists in `/public_html/`
   - Check that `api/` folder exists with `contact.php` and `mail.Html`
   - Check that `.htaccess` exists

### Using Command Line FTP (PowerShell)

```powershell
# Build the project first
npm run build

# Navigate to dist folder
cd dist

# Connect via FTP (Windows PowerShell)
ftp ftp.blaupunkt-ev.com

# Login with credentials
# Username: u966003410
# Password: [enter password]

# Upload files
cd /public_html
put index.html
mput assets\*
mput api\*
put .htaccess

# Disconnect
bye
```

---

## 7️⃣ Testing the Contact Form

### Step 1: Access Contact Page

Visit: `https://blaupunkt-ev.com/contact`

### Step 2: Fill Out Form

```
Name: Test User
Email: test@example.com
Phone: +1234567890
Message: This is a test message to verify the contact form works.
```

### Step 3: Submit Form

1. Click **Send Message** or **Submit**
2. You should see a success message
3. If there's an error, check browser console (F12)

### Step 4: Check Email

1. Log in to `info@blaupunkt-ev.com` via Hostinger Webmail
2. Look for email with subject: **"New Contact Form Submission from Test User"**
3. Verify the email contains:
   - Name: Test User
   - Email: test@example.com
   - Phone: +1234567890
   - Message: This is a test message...

### Step 5: Test Reply

1. Click **Reply** in the email
2. Reply-to should be: `test@example.com`
3. This allows you to reply directly to customers

---

## 8️⃣ Troubleshooting

### ❌ Problem: Contact Form Not Sending Email

#### Check 1: PHP Error Logs
1. Go to Hostinger hPanel → **Files** → **Error Log**
2. Look for PHP errors related to `contact.php`
3. Common errors:
   ```
   Warning: mail() has been disabled
   Fatal error: Allowed memory size exhausted
   ```

#### Check 2: Email Account Exists
```bash
# Verify noreply@blaupunkt-ev.com exists
# Go to hPanel → Emails → Email Accounts
```

#### Check 3: PHP mail() Function
1. Create test file in `/public_html/test-email.php`:
   ```php
   <?php
   $to = 'info@blaupunkt-ev.com';
   $subject = 'Test Email';
   $message = 'This is a test email from Hostinger PHP';
   $headers = 'From: noreply@blaupunkt-ev.com';
   
   if (mail($to, $subject, $message, $headers)) {
       echo 'Email sent successfully!';
   } else {
       echo 'Email failed to send.';
   }
   ?>
   ```

2. Visit: `https://blaupunkt-ev.com/test-email.php`
3. Check if email arrives at `info@blaupunkt-ev.com`
4. Delete test file after testing

#### Check 4: CORS Issues
1. Open browser console (F12) → Network tab
2. Submit contact form
3. Look for CORS errors:
   ```
   Access-Control-Allow-Origin header is not present
   ```

4. If CORS error, update `public/api/contact.php`:
   ```php
   // Add at the top of contact.php
   header('Access-Control-Allow-Origin: https://blaupunkt-ev.com');
   header('Access-Control-Allow-Methods: POST, OPTIONS');
   header('Access-Control-Allow-Headers: Content-Type');
   
   // Handle preflight
   if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
       http_response_code(200);
       exit();
   }
   ```

#### Check 5: File Permissions
1. Via Hostinger File Manager or FTP
2. Set permissions for `public/api/contact.php`:
   ```
   Permissions: 644 (rw-r--r--)
   ```
3. Set permissions for `public/api/mail.Html`:
   ```
   Permissions: 644 (rw-r--r--)
   ```

---

### ❌ Problem: 404 Error on /api/contact.php

#### Check 1: .htaccess File Exists
```bash
# File: public_html/.htaccess
# Should contain:

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # API routes - serve PHP files directly
  RewriteCond %{REQUEST_URI} ^/api/
  RewriteCond %{REQUEST_FILENAME} -f
  RewriteRule ^ - [L]
  
  # React Router - redirect all other requests to index.html
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### Check 2: File Structure
```bash
public_html/
├── index.html
├── .htaccess
├── api/
│   ├── contact.php
│   └── mail.Html
└── assets/
```

---

### ❌ Problem: GitHub Actions Deployment Fails

#### Check 1: Verify Secrets
```bash
# GitHub → Settings → Secrets → Actions
# Ensure these exist:
FTP_SERVER
FTP_USERNAME
FTP_PASSWORD
```

#### Check 2: Check Workflow Logs
1. GitHub → Actions tab
2. Click failed workflow
3. Expand each step to see errors
4. Common errors:
   ```
   Error: Cannot connect to FTP server
   Error: Authentication failed
   Error: Timeout
   ```

#### Check 3: FTP Firewall
- Hostinger may block GitHub's IP
- Contact Hostinger support to whitelist GitHub Actions IPs

---

### ❌ Problem: React Router Shows 404 on Refresh

#### Solution: Update .htaccess
```apache
# This should already be in your .htaccess
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

---

### ❌ Problem: Styles Not Loading

#### Check 1: Base URL in vite.config.js
```javascript
export default {
  base: '/',  // Should be '/' for root domain
  // ...
}
```

#### Check 2: Clear Browser Cache
```bash
# Hard refresh
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

---

## 🔧 Configuration Files Reference

### vite.config.js
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  publicDir: 'public',  // Important: copies public/ to dist/
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser'
  }
});
```

### public/.htaccess
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # API routes
  RewriteCond %{REQUEST_URI} ^/api/
  RewriteCond %{REQUEST_FILENAME} -f
  RewriteRule ^ - [L]
  
  # React Router
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript
</IfModule>

# Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

### src/config/api.js
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const apiConfig = {
  baseUrl: API_BASE_URL,
  endpoints: {
    contact: `${API_BASE_URL}/api/contact.php`
  }
};
```

---

## 📊 Deployment Checklist

### Pre-Deployment
- [ ] Node.js 18+ installed
- [ ] Repository cloned
- [ ] Dependencies installed (`npm install`)
- [ ] Build successful (`npm run build`)
- [ ] Local preview works (`npm run preview`)

### Hostinger Setup
- [ ] Hostinger account active
- [ ] Domain configured (blaupunkt-ev.com)
- [ ] PHP 7.4+ enabled
- [ ] FTP credentials obtained
- [ ] Email accounts created:
  - [ ] noreply@blaupunkt-ev.com
  - [ ] info@blaupunkt-ev.com

### GitHub Actions
- [ ] GitHub Secrets added:
  - [ ] FTP_SERVER
  - [ ] FTP_USERNAME
  - [ ] FTP_PASSWORD
- [ ] Workflow file exists (`.github/workflows/deploy.yml`)
- [ ] Push to branch triggers deployment
- [ ] Deployment successful (green checkmark)

### Post-Deployment
- [ ] Website loads: https://blaupunkt-ev.com
- [ ] All pages accessible
- [ ] Images loading correctly
- [ ] Contact form accessible
- [ ] Contact form submits successfully
- [ ] Email received at info@blaupunkt-ev.com
- [ ] Reply-to works correctly
- [ ] Mobile responsive
- [ ] No console errors (F12)

---

## 🎯 Quick Commands Reference

```bash
# Local Development
npm install              # Install dependencies
npm run dev             # Start dev server (http://localhost:5173)
npm run build           # Build for production
npm run preview         # Preview production build

# Git Commands
git status              # Check changed files
git add .               # Stage all changes
git commit -m "message" # Commit changes
git push origin deployomentlive  # Push to GitHub (triggers deployment)

# Check Deployment Status
# Visit: https://github.com/incial/Blaupunkt/actions

# Test Contact Form
# Visit: https://blaupunkt-ev.com/contact
```

---

## 📞 Support Resources

### Hostinger Support
- **hPanel**: https://hpanel.hostinger.com
- **Knowledge Base**: https://support.hostinger.com
- **Live Chat**: Available 24/7 in hPanel

### GitHub Actions
- **Workflow Runs**: https://github.com/incial/Blaupunkt/actions
- **Documentation**: https://docs.github.com/en/actions

### Email Issues
- **Webmail**: https://webmail.hostinger.com
- **Email Settings**: hPanel → Emails → Email Accounts

---

## 🚀 Success Criteria

Your deployment is successful when:

1. ✅ Website loads at `https://blaupunkt-ev.com`
2. ✅ All pages are accessible (Home, Products, Company, Contact, etc.)
3. ✅ Images and assets load correctly
4. ✅ Contact form submits without errors
5. ✅ Email arrives at `info@blaupunkt-ev.com` within 1 minute
6. ✅ Email has proper formatting (black & white with light blue accents)
7. ✅ Reply-to header points to customer's email
8. ✅ Mobile version works perfectly
9. ✅ No console errors in browser (F12)
10. ✅ GitHub Actions shows green checkmark

---

## 📝 Next Steps After Deployment

### 1. Set Up SSL Certificate
1. Go to hPanel → **SSL**
2. Enable **Free SSL Certificate**
3. Force HTTPS redirect

### 2. Configure Email Forwarding
1. Forward `info@blaupunkt-ev.com` to your personal email
2. Set up email client (Outlook, Gmail) to receive notifications

### 3. Set Up Analytics
1. Add Google Analytics to track visitors
2. Monitor contact form submissions
3. Track conversion rates

### 4. Regular Backups
1. Use Hostinger's automated backups
2. Download backups monthly
3. Test restore process

### 5. Monitor Performance
1. Use Hostinger's performance tools
2. Enable caching
3. Optimize images

---

**Last Updated**: November 1, 2025  
**Version**: 2.0.0  
**Status**: Production Ready ✅

---

## 🎉 Congratulations!

You've successfully deployed your React + PHP application to Hostinger with a fully functional contact form. Your website is now live and ready to receive customer inquiries!

For any issues, refer to the troubleshooting section or contact Hostinger support.

**Happy Deploying! 🚀**
