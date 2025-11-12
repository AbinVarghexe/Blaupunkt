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

### 6. Configure .htaccess Files

The project includes two `.htaccess` files for proper routing and security:

#### Root .htaccess (`public/.htaccess`)

This file handles React Router, API routing, security, and performance optimization.

**Key Features:**

- **React Router Support**: Falls back to `index.html` for all non-file requests
- **API Routing**: Routes `/api/*` requests to PHP backend
- **Static File Serving**: Direct access for assets (images, CSS, JS)
- **CORS Headers**: Enables cross-origin requests
- **Security Headers**:
  - `X-Frame-Options: DENY` (prevents clickjacking)
  - `X-Content-Type-Options: nosniff` (prevents MIME sniffing)
  - `X-XSS-Protection: 1; mode=block` (XSS protection)
  - `Referrer-Policy: strict-origin-when-cross-origin`
- **File Protection**: Blocks direct access to:
  - `.env` files
  - `.git` directory
  - `package.json`, `composer.json`
  - Configuration files
- **Directory Browsing**: Disabled for security
- **Compression**: GZIP compression for all assets (HTML, CSS, JS, images, fonts)
- **Browser Caching**:
  - Images/Fonts: 1 year (`31536000` seconds)
  - CSS/JavaScript: 1 month (`2592000` seconds)
  - HTML: No cache (`0` seconds)
- **Character Encoding**: UTF-8 default
- **HTTPS Redirect**: Optional (commented out by default)

**File Permissions:**
```bash
chmod 644 public/.htaccess
```

#### API .htaccess (`public/api/.htaccess`)

This file configures the PHP backend environment and API-specific security.

**Key Features:**

- **PHP Handler**: Forces PHP execution for contact form files (LiteSpeed compatibility)
  - `contact-graph.php` (primary)
  - `contact-production.php`
  - `contact-debug.php`
  - `phpinfo.php`, `test.php`
- **CORS Configuration**:
  - `Access-Control-Allow-Origin: *` (adjust for production)
  - `Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE`
  - `Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept`
  - `Access-Control-Max-Age: 3600` (1 hour preflight cache)
- **OPTIONS Preflight**: Returns `200 OK` for CORS preflight without executing PHP
- **Environment File Protection**: Blocks all `.env*` files from web access
- **Security**:
  - Blocks backup files (`.bak`, `.backup`, `.old`, `.tmp`)
  - Blocks editor files (`~` suffix)
  - Blocks hidden files (`.` prefix)
  - Blocks PHPMailer source files
  - Disables directory browsing
- **PHP Error Handling**:
  - `display_errors: Off` (production safety)
  - `log_errors: On` (debugging)
  - `max_execution_time: 60` seconds
  - `upload_max_filesize: 10M`
  - `post_max_size: 10M`
- **Compression**: GZIP for JSON responses and text content
- **Character Encoding**: UTF-8 default
- **Rate Limiting**: Optional (commented out)

**File Permissions:**
```bash
chmod 644 public/api/.htaccess
chmod 600 public/api/.env  # More restrictive for sensitive data
```

#### Deployment Verification

After deployment, verify `.htaccess` files are working:

**1. Test React Router:**
```bash
# Visit a React route directly (should not 404)
https://yourdomain.com/products
https://yourdomain.com/company
```

**2. Test API Access:**
```bash
# Should execute PHP (not download)
https://yourdomain.com/api/contact-graph.php
```

**3. Test .env Protection:**
```bash
# Should return 403 Forbidden or 404
https://yourdomain.com/api/.env
```

**4. Test Static Files:**
```bash
# Should load directly without redirect
https://yourdomain.com/assets/logo.png
https://yourdomain.com/index.html
```

**5. Check Security Headers:**
```bash
# Use browser DevTools (Network tab) to verify headers:
curl -I https://yourdomain.com/

# Expected headers:
# X-Frame-Options: DENY
# X-Content-Type-Options: nosniff
# X-XSS-Protection: 1; mode=block
# Access-Control-Allow-Origin: *
```

### 7. Push to GitHub

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
# Start PHP built-in server from project root
php -S localhost:8000 -t public

# API available at: http://localhost:8000/api/contact-graph.php
```

**Important**: When testing locally with PHP's built-in server:
- `.htaccess` files are NOT processed (PHP server doesn't use Apache)
- CORS headers must be handled by PHP code itself
- Start server from project root, not from `public/` directory
- For full .htaccess testing, use Apache/LiteSpeed locally or test on staging server

---

## File Structure

```
Blaupunkt/
├── .github/workflows/
│   └── deploy.yml              # GitHub Actions deployment
├── public/
│   ├── api/
│   │   ├── contact-graph.php   # PHP email handler (Microsoft Graph API)
│   │   ├── .env                # Azure AD credentials (SECRET - Never commit!)
│   │   └── .htaccess           # API security & CORS configuration
│   └── .htaccess               # React Router, security, caching, compression
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
4. Check file permissions: `chmod 644 public/.htaccess`
5. Test with browser DevTools to see if requests reach the server

### .htaccess Not Working

**Symptoms**: Direct routes return 404, API returns downloadable PHP file instead of executing

**Solutions**:

1. **Verify Deployment**:
   ```bash
   # SSH into Hostinger
   ssh -p 65002 username@ssh.yourdomain.com
   
   # Check if files exist
   ls -la ~/public_html/.htaccess
   ls -la ~/public_html/api/.htaccess
   ```

2. **Check File Permissions**:
   ```bash
   # Root .htaccess should be 644
   chmod 644 ~/public_html/.htaccess
   
   # API .htaccess should be 644
   chmod 644 ~/public_html/api/.htaccess
   
   # .env should be 600 (more restrictive)
   chmod 600 ~/public_html/api/.env
   ```

3. **Test .htaccess Syntax**:
   ```bash
   # Check for syntax errors (on server)
   apachectl configtest
   
   # Or check error logs
   tail -f ~/logs/error.log
   ```

4. **Verify .env Protection**:
   ```bash
   # Should return 403 or 404
   curl -I https://yourdomain.com/api/.env
   
   # Should NOT return file contents
   ```

5. **Check Hostinger Settings**:
   - Log in to hPanel
   - Go to **Advanced** → **PHP Configuration**
   - Verify LiteSpeed is enabled
   - Check if mod_rewrite is active

### SSH Deployment Fails

1. Check SSH credentials in GitHub Secrets
2. Verify server path is `/public_html/`
3. Check GitHub Actions logs for errors
4. Test SSH connection manually (see step 3 in setup)

### API Not Working

1. **Verify PHP files deployed**:
   ```bash
   # Check if files exist on server
   ls -la ~/public_html/api/contact-graph.php
   ls -la ~/public_html/api/.env
   ls -la ~/public_html/api/.htaccess
   ```

2. **Check file permissions**:
   ```bash
   # PHP files should be 644
   chmod 644 ~/public_html/api/*.php
   
   # .env should be 600 (restricted)
   chmod 600 ~/public_html/api/.env
   
   # .htaccess should be 644
   chmod 644 ~/public_html/api/.htaccess
   ```

3. **Test API directly**:
   ```bash
   # Should execute PHP (not download file)
   curl -X POST https://yourdomain.com/api/contact-graph.php \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com","phone":"123","message":"Test"}'
   ```

4. **Check CORS configuration**:
   - Open browser DevTools (F12) → Network tab
   - Look for CORS errors in console
   - Verify `Access-Control-Allow-Origin` header in response

5. **Verify Azure AD credentials**:
   - Ensure `.env` file has correct TENANT_ID, CLIENT_ID, CLIENT_SECRET
   - Verify Azure AD app permissions (Mail.Send must be granted and admin consented)
   - Check recipient email matches `RECIPIENT_EMAIL` in `.env`

6. **Check PHP error logs**:
   ```bash
   # On Hostinger server
   tail -f ~/logs/error.log
   
   # Or via hPanel: Advanced → Error Log
   ```

---

## Security Checklist

Before going live, verify these security measures:

- ✅ **Environment Files Protected**: `.env` files return 403/404 when accessed directly
- ✅ **HTTPS Enabled**: Uncomment HTTPS redirect in `public/.htaccess` if SSL is active
- ✅ **Security Headers Active**: Verify X-Frame-Options, X-Content-Type-Options, XSS-Protection
- ✅ **Directory Browsing Disabled**: Directories should not list contents
- ✅ **Sensitive Files Blocked**: `.git`, `package.json`, backup files inaccessible
- ✅ **CORS Properly Configured**: Restrict `Access-Control-Allow-Origin` if needed (change from `*`)
- ✅ **PHP Error Display Off**: `display_errors Off` in production (set in `api/.htaccess`)
- ✅ **File Permissions Correct**:
  - `.htaccess` files: `644`
  - `.env` file: `600`
  - PHP files: `644`
  - Directories: `755`
- ✅ **Azure Secret Not in Git**: Verify `.env` is in `.gitignore` and never committed
- ✅ **API Rate Limiting**: Consider enabling rate limiting in `api/.htaccess` for production
- ✅ **Regular Backups**: Set up automated backups in Hostinger hPanel

**Quick Security Test**:
```bash
# Test .env protection (should return 403/404)
curl -I https://yourdomain.com/api/.env

# Test directory browsing (should not list files)
curl -I https://yourdomain.com/api/

# Test .git blocking (should return 403/404)
curl -I https://yourdomain.com/.git/config
```

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
