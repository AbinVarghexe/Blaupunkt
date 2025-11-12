# SSH Deployment Setup Guide

Complete guide to set up automatic SSH deployment for your Blaupunkt project on Hostinger.

---

## 🚀 Quick Setup (5 Steps)

### Step 1: Generate SSH Key

```bash
# Generate a new SSH key pair
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/hostinger_deploy

# Press Enter for all prompts (no passphrase needed for automation)
```

This creates:
- `~/.ssh/hostinger_deploy` (private key - keep secret!)
- `~/.ssh/hostinger_deploy.pub` (public key - safe to share)

---

### Step 2: Get Hostinger SSH Details

1. Log in to **Hostinger hPanel**
2. Go to **Advanced** → **SSH Access**
3. Note down:
   - ✅ SSH Host (e.g., `ssh.yourdomain.com` or IP address)
   - ✅ SSH Port (usually `65002`)
   - ✅ SSH Username (your hosting username)
4. Ensure SSH access is **Enabled**

---

### Step 3: Add Public Key to Hostinger

**Option A: Via Hostinger Panel (Recommended)**

1. In Hostinger hPanel → **SSH Access**
2. Click **Manage SSH Keys**
3. Click **Add New SSH Key**
4. Copy the content of your public key:
   ```bash
   # Windows PowerShell
   Get-Content ~/.ssh/hostinger_deploy.pub
   
   # Mac/Linux
   cat ~/.ssh/hostinger_deploy.pub
   ```
5. Paste the key and save

**Option B: Via Terminal**

```bash
# Replace with your actual Hostinger details
cat ~/.ssh/hostinger_deploy.pub | ssh -p 65002 username@ssh.yourdomain.com "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
```

---

### Step 4: Test SSH Connection

```bash
# Test the connection (replace with your actual details)
ssh -p 65002 -i ~/.ssh/hostinger_deploy username@ssh.yourdomain.com

# Expected output: You should see the Hostinger shell prompt
# Type 'pwd' to see your home directory
# Type 'ls' to see your files
# Type 'exit' to close the connection
```

If the connection works, you're ready for Step 5! 🎉

---

### Step 5: Add Secrets to GitHub

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add these 5 secrets:

#### SSH_PRIVATE_KEY

Copy the **entire** private key content:

```bash
# Windows PowerShell
Get-Content ~/.ssh/hostinger_deploy -Raw | Set-Clipboard

# Mac
cat ~/.ssh/hostinger_deploy | pbcopy

# Linux
cat ~/.ssh/hostinger_deploy | xclip -selection clipboard
```

Paste the entire key including:
```
-----BEGIN OPENSSH PRIVATE KEY-----
...entire key content...
-----END OPENSSH PRIVATE KEY-----
```

#### SSH_HOST
```
ssh.yourdomain.com
```
(or your server IP address)

#### SSH_USERNAME
```
your_hostinger_username
```

#### SSH_PORT
```
65002
```
(or your actual SSH port from Hostinger)

#### SSH_TARGET_DIR
```
/home/your_username/public_html
```

**To find your exact path:**
```bash
# Connect via SSH and run:
ssh -p 65002 username@ssh.yourdomain.com
pwd  # This shows your home directory
ls   # You should see 'public_html' folder
```

---

## ✅ Verify Setup

### Test Deployment

1. Make a small change to your code
2. Commit and push:
   ```bash
   git add .
   git commit -m "Test SSH deployment"
   git push origin main
   ```
3. Go to GitHub → **Actions** tab
4. Watch the deployment workflow run
5. Check your website to see changes live!

---

## 🔧 Troubleshooting

### "Permission denied (publickey)"

**Problem**: Private key not recognized

**Solutions**:
1. Ensure you copied the **entire** private key including header/footer
2. Check the public key is in Hostinger's authorized_keys
3. Verify SSH_PRIVATE_KEY secret has no extra spaces/newlines

### "Connection timeout"

**Problem**: Cannot connect to server

**Solutions**:
1. Verify SSH_HOST is correct (try ping)
2. Check SSH_PORT matches Hostinger's SSH port
3. Ensure Hostinger firewall allows GitHub Actions IPs

### "Permission denied" on target directory

**Problem**: Cannot write to deployment directory

**Solutions**:
1. Check SSH_TARGET_DIR path is correct
2. Verify user has write permissions:
   ```bash
   ssh -p 65002 username@host "ls -la ~/public_html"
   ```
3. Fix permissions if needed:
   ```bash
   ssh -p 65002 username@host "chmod 755 ~/public_html"
   ```

### Deployment succeeds but site shows old content

**Problem**: Browser cache or CDN caching

**Solutions**:
1. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Clear browser cache
3. Check deployment logs to verify files were uploaded
4. SSH into server and verify files are updated

---

## 🆚 SSH vs FTP Comparison

| Feature | SSH (Current) | FTP (Old) |
|---------|---------------|-----------|
| Security | ✅ Encrypted | ❌ Plain text |
| Speed | ✅ Fast (rsync) | ⚠️ Slower |
| Efficiency | ✅ Only changed files | ❌ All files |
| Reliability | ✅ Very reliable | ⚠️ Connection issues |
| Industry Standard | ✅ Yes | ❌ Legacy |
| Setup Complexity | ⚠️ Moderate | ✅ Simple |

---

## 📚 Additional Configuration

### Add Multiple Deploy Targets

You can deploy to staging and production:

```yaml
# .github/workflows/deploy.yml
on:
  push:
    branches:
      - main          # Production
      - staging       # Staging environment

jobs:
  deploy:
    steps:
      - name: Deploy to Production
        if: github.ref == 'refs/heads/main'
        uses: easingthemes/ssh-deploy@main
        with:
          SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
          REMOTE_HOST: ${{ secrets.SSH_HOST }}
          # ... production settings
      
      - name: Deploy to Staging
        if: github.ref == 'refs/heads/staging'
        uses: easingthemes/ssh-deploy@main
        with:
          SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY_STAGING }}
          REMOTE_HOST: ${{ secrets.SSH_HOST_STAGING }}
          # ... staging settings
```

### Custom Deployment Script

Add custom commands before/after deployment:

```yaml
SCRIPT_BEFORE: |
  echo "Starting deployment..."
  whoami
  pwd
  ls -la

SCRIPT_AFTER: |
  echo "Deployment completed!"
  cd ${{ secrets.SSH_TARGET_DIR }}
  ls -la
  # Optional: Clear cache, restart services, etc.
  # php artisan cache:clear
  # pm2 restart app
```

---

## 🔒 Security Best Practices

1. ✅ **Never commit** private keys to Git
2. ✅ **Use separate** SSH keys for different purposes
3. ✅ **Rotate keys** periodically (every 6-12 months)
4. ✅ **Monitor** GitHub Actions logs for suspicious activity
5. ✅ **Enable** 2FA on GitHub and Hostinger accounts
6. ✅ **Limit** SSH key access to specific IPs if possible

---

## 📞 Support

- **GitHub Actions**: [GitHub Actions Documentation](https://docs.github.com/actions)
- **Hostinger SSH**: [Hostinger SSH Guide](https://support.hostinger.com/en/articles/1583245-how-to-use-ssh)
- **ssh-deploy Action**: [GitHub Repository](https://github.com/easingthemes/ssh-deploy)

---

## ✨ Next Steps

Once SSH deployment is working:

1. ✅ Set up automatic database backups
2. ✅ Add deployment notifications (Slack, Email)
3. ✅ Implement rollback mechanism
4. ✅ Add deployment status badge to README
5. ✅ Set up staging environment

Happy deploying! 🚀
