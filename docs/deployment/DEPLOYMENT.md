# Hostinger Deployment Guide

This project is configured to deploy to Hostinger with a **PHP backend** and **React frontend** in a single hosting environment.

## Architecture

```
Hostinger Server
├── /public_html/          → React Frontend (Static Files)
│   ├── index.html
│   ├── assets/            → JS, CSS, Images
│   ├── api/
│   │   ├── contact-graph.php → PHP Backend API (Microsoft Graph OAuth 2.0)
│   │   └── .env              → Azure AD credentials (TENANT_ID, CLIENT_ID, CLIENT_SECRET)
│   └── .htaccess          → Routing & Config
```

## Features

- ✅ **All-in-One Deployment**: Frontend + Backend on same domain
- ✅ **Automated Deployment**: GitHub Actions with SSH (Secure & Fast)
- ✅ **Microsoft Graph API**: OAuth 2.0 authentication for secure email sending
- ✅ **React Router Support**: Client-side routing with .htaccess
- ✅ **Environment Variables**: Azure credentials stored securely in .env
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

### 5. Configure Azure AD Credentials

Create `public/api/.env` file with your Azure AD credentials:

```env
TENANT_ID=your-tenant-id
CLIENT_ID=your-client-id
CLIENT_SECRET=your-client-secret
SENDER_EMAIL=noreply@blaupunkt-ev.com
RECIPIENT_EMAIL=info@blaupunkt-ev.com
```

**Important**: Never commit the `.env` file to Git! It's already in `.gitignore`.

For detailed Azure setup instructions, see: `docs/email/MICROSOFT_GRAPH_SETUP.md`

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

# API available at: http://localhost:8000/api/contact-graph.php
```

---

## File Structure

```
Blaupunkt/
├── .github/workflows/
│   └── deploy.yml              # GitHub Actions deployment
├── public/
│   ├── api/
│   │   ├── contact-graph.php   # PHP email handler (Microsoft Graph API)
│   │   └── .env                # Azure AD credentials
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

**POST** `/api/contact-graph.php`

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

1. Verify PHP file deployed: `/public_html/api/contact-graph.php`
2. Verify .env file exists: `/public_html/api/.env` (with Azure credentials)
3. Check file permissions (should be 644)
4. Test API directly: `https://yourdomain.com/api/contact-graph.php`
5. Check browser console for CORS errors
6. Verify Azure AD app permissions (Mail.Send must be granted)

---

## Important Notes

- ✅ `.htaccess` handles React Router routing
- ✅ PHP backend uses Microsoft Graph API with OAuth 2.0
- ✅ No Node.js backend needed
- ✅ SSH deployment for security and speed
- ✅ Environment variables for Azure credentials
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
