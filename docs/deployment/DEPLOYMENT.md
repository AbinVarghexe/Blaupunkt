# Hostinger Deployment Guide

This project is configured to deploy to Hostinger with a **PHP backend** and **React frontend** in a single hosting environment.

## Architecture

```
Hostinger Server
├── /public_html/          → React Frontend (Static Files)
│   ├── index.html
│   ├── assets/            → JS, CSS, Images
│   ├── api/
│   │   └── contact.php    → PHP Backend API
│   └── .htaccess          → Routing & Config
```

## Features

- ✅ **All-in-One Deployment**: Frontend + Backend on same domain
- ✅ **Automated Deployment**: GitHub Actions with SSH (Secure & Fast)
- ✅ **PHP Email Backend**: Uses Hostinger's built-in mail() function
- ✅ **React Router Support**: Client-side routing with .htaccess
- ✅ **No External Services**: Everything runs on Hostinger
- ✅ **Incremental Deployment**: rsync only uploads changed files

---

## Setup Instructions

### 1. Generate SSH Key for Deployment

On your local machine, generate an SSH key pair:

```bash
# Generate SSH key (press Enter for all prompts)
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/hostinger_deploy

# This creates two files:
# ~/.ssh/hostinger_deploy (private key - for GitHub)
# ~/.ssh/hostinger_deploy.pub (public key - for Hostinger)
```

### 2. Add Public Key to Hostinger

1. Log in to **Hostinger hPanel**
2. Go to **Advanced** → **SSH Access**
3. Enable SSH access if not already enabled
4. Copy your **SSH Port** (usually 65002)
5. Copy your **SSH Host** (usually ssh.yourdomain.com or IP address)
6. Click **Manage SSH Keys**
7. Paste the content of `~/.ssh/hostinger_deploy.pub`

**Alternative: Manual upload via terminal**
```bash
# Copy public key to Hostinger (you'll need to enter your Hostinger password)
cat ~/.ssh/hostinger_deploy.pub | ssh -p YOUR_SSH_PORT username@ssh.yourdomain.com "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

### 3. Test SSH Connection

```bash
# Test the connection (replace with your details)
ssh -p 65002 -i ~/.ssh/hostinger_deploy username@ssh.yourdomain.com

# If successful, you should see a shell prompt
# Type 'exit' to close the connection
```

### 4. Add GitHub Secrets

Go to your GitHub repository → **Settings** → **Secrets and variables** → **Actions**

Add these secrets:

```
SSH_PRIVATE_KEY = (paste the ENTIRE content of ~/.ssh/hostinger_deploy file)
SSH_HOST = ssh.yourdomain.com (or IP address from Hostinger)
SSH_USERNAME = your_hostinger_username
SSH_PORT = 65002 (or the port number from Hostinger)
SSH_TARGET_DIR = /home/username/public_html
```

**How to get private key content:**

```bash
# On Windows (PowerShell)
Get-Content ~/.ssh/hostinger_deploy | Set-Clipboard

# On Mac/Linux
cat ~/.ssh/hostinger_deploy | pbcopy  # Mac
cat ~/.ssh/hostinger_deploy | xclip   # Linux
```

### 5. Configure Email in PHP Backend

Edit `public/api/contact.php` and update:

```php
$to = 'info@blaupunkt-ev.com';  // Your email address
```

The email headers are already configured to use:

- **From**: `noreply@blaupunkt-ev.com`
- **Reply-To**: User's email from form

### 6. Push to GitHub

```bash
git add .
git commit -m "Setup SSH deployment"
git push origin main
```

GitHub Actions will automatically:

1. Build your React app
2. Deploy to Hostinger via SSH (secure & fast!)
3. Deploy complete! 🚀

---

## Advantages of SSH over FTP

✅ **More Secure**: Encrypted connection, no plain-text passwords
✅ **Faster**: rsync only uploads changed files
✅ **Reliable**: Better error handling and connection stability
✅ **Efficient**: Compression during transfer
✅ **Professional**: Industry standard for deployments

---

## Local Development

### Run Frontend

```bash
npm install
npm run dev
```

Visit: `http://localhost:3000`

### Test PHP Backend Locally (Optional)

If you have PHP installed:

```bash
# Start PHP built-in server
php -S localhost:8000 -t public

# API available at: http://localhost:8000/api/contact.php
```

---

## File Structure

```
Blaupunkt/
├── .github/workflows/
│   └── deploy.yml              # GitHub Actions deployment
├── public/
│   ├── api/
│   │   └── contact.php         # PHP email handler
│   └── .htaccess               # Routing rules
├── src/
│   ├── config/
│   │   └── api.js              # API configuration
│   ├── components/
│   │   └── ContactUs.jsx       # Contact form
│   └── ...
└── vite.config.js              # Vite config (copies public folder)
```

---

## API Endpoint

**POST** `/api/contact.php`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "message": "Hello!"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message"
}
```

---

## Deployment Workflow

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main

# GitHub Actions automatically:
# 1. Checks out code
# 2. Installs dependencies
# 3. Builds React app (npm run build)
# 4. Deploys dist/ folder to Hostinger /public_html/
# Done! ✅
```

---

## Troubleshooting

### Email Not Sending

1. Check Hostinger email settings in hPanel
2. Verify email address exists: `noreply@blaupunkt-ev.com`
3. Check PHP error logs in hPanel
4. Test mail() function:
   ```php
   <?php
   mail('test@example.com', 'Test', 'Test message');
   ?>
   ```

### React Router 404 Errors

1. Ensure `.htaccess` is deployed to `/public_html/`
2. Check `.htaccess` rules are correct
3. Verify mod_rewrite is enabled (usually is on Hostinger)

### FTP Deployment Fails

1. Check FTP credentials in GitHub Secrets
2. Verify server path is `/public_html/`
3. Check GitHub Actions logs for errors

### API Not Working

1. Verify PHP file deployed: `/public_html/api/contact.php`
2. Check file permissions (should be 644)
3. Test API directly: `https://yourdomain.com/api/contact.php`
4. Check browser console for CORS errors

---

## Important Notes

- ✅ `.htaccess` handles React Router routing
- ✅ PHP backend uses Hostinger's mail() function
- ✅ No Node.js backend needed
- ✅ No SSH access required
- ✅ Works with all Hostinger shared hosting plans

---

## Support

For issues, check:
1. GitHub Actions logs
2. Hostinger error logs (hPanel → Files → Error Log)
3. Browser console (F12)

---

## License

Private project for Blaupunkt EV
