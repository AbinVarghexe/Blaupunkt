# 🔐 SSH Deployment - Quick Reference

Your Blaupunkt project is now configured for **automatic SSH deployment** to Hostinger!

---

## 📦 What's Included

### ✅ GitHub Actions Workflows

1. **`.github/workflows/deploy.yml`** (Primary)
   - Uses `easingthemes/ssh-deploy` action
   - Fast rsync-based deployment
   - Only uploads changed files

2. **`.github/workflows/deploy-ssh-alt.yml`** (Alternative)
   - Manual rsync commands
   - Use if primary workflow has issues
   - More control over deployment process

### 📚 Documentation

1. **`SSH_DEPLOYMENT_SETUP.md`**
   - Complete setup guide
   - Troubleshooting tips
   - Security best practices

2. **`DEPLOYMENT.md`**
   - General deployment overview
   - Both SSH and FTP options
   - Email configuration

3. **`README.md`**
   - Updated with SSH deployment info
   - Quick start commands

### 🛠️ Setup Scripts

1. **`scripts/setup-ssh-deployment.ps1`** (Windows)
   - Interactive PowerShell script
   - Generates SSH keys
   - Guides through entire setup

2. **`scripts/setup-ssh-deployment.sh`** (Mac/Linux)
   - Interactive bash script
   - Same functionality as PowerShell version

---

## 🚀 Quick Start

### Windows Users

```powershell
# Run the automated setup script
.\scripts\setup-ssh-deployment.ps1

# Follow the interactive prompts
```

### Mac/Linux Users

```bash
# Make script executable
chmod +x scripts/setup-ssh-deployment.sh

# Run the script
./scripts/setup-ssh-deployment.sh

# Follow the interactive prompts
```

---

## 📋 Required GitHub Secrets

After running the setup script, add these to GitHub:

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `SSH_PRIVATE_KEY` | Your private SSH key | `-----BEGIN OPENSSH...` |
| `SSH_HOST` | Hostinger SSH hostname | `ssh.yourdomain.com` |
| `SSH_USERNAME` | Your Hostinger username | `u123456789` |
| `SSH_PORT` | SSH port (usually 65002) | `65002` |
| `SSH_TARGET_DIR` | Deployment directory | `/home/u123456789/public_html` |

**Add secrets at:** `GitHub Repo → Settings → Secrets and variables → Actions`

---

## 🎯 How It Works

1. **You push code** to `main` or `hostinger-deployment` branch
2. **GitHub Actions triggers** automatically
3. **Builds** your React app (`npm run build`)
4. **Deploys** via SSH to Hostinger
5. **Your site** is updated! ✨

---

## 🔄 Using Alternative Workflow

If the primary workflow doesn't work:

1. Disable `deploy.yml`:
   ```bash
   git mv .github/workflows/deploy.yml .github/workflows/deploy.yml.disabled
   ```

2. Enable alternative:
   ```bash
   git mv .github/workflows/deploy-ssh-alt.yml .github/workflows/deploy.yml
   ```

3. Commit and push:
   ```bash
   git add .
   git commit -m "Switch to alternative SSH deployment"
   git push
   ```

---

## 🆚 SSH vs FTP

| Feature | SSH (New) | FTP (Old) |
|---------|-----------|-----------|
| **Security** | 🟢 Encrypted | 🔴 Plain text |
| **Speed** | 🟢 Fast | 🟡 Moderate |
| **Efficiency** | 🟢 Only changes | 🔴 All files |
| **Reliability** | 🟢 Very reliable | 🟡 Connection issues |
| **Setup** | 🟡 Moderate | 🟢 Simple |

**Recommendation:** Use SSH for production deployments!

---

## 🔍 Verify Deployment

### Check GitHub Actions

1. Go to your GitHub repository
2. Click **Actions** tab
3. See the latest workflow run
4. Click to view logs

### Check Your Server

```bash
# Connect via SSH
ssh -p 65002 username@ssh.yourdomain.com

# Check deployed files
ls -la ~/public_html

# Exit
exit
```

### Check Your Website

Visit your domain and verify the changes are live!

---

## ⚠️ Common Issues

### "Permission denied (publickey)"

**Fix:** Ensure SSH_PRIVATE_KEY includes the entire key with headers:
```
-----BEGIN OPENSSH PRIVATE KEY-----
...key content...
-----END OPENSSH PRIVATE KEY-----
```

### "rsync: connection timed out"

**Fix:** 
1. Verify SSH_HOST and SSH_PORT are correct
2. Check Hostinger firewall settings
3. Ensure SSH access is enabled in hPanel

### Deployment succeeds but site shows old content

**Fix:**
1. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Clear browser cache
3. Check deployment logs

---

## 📞 Need Help?

1. Check **SSH_DEPLOYMENT_SETUP.md** for detailed troubleshooting
2. Review GitHub Actions logs
3. Test SSH connection manually
4. Verify all GitHub secrets are set correctly

---

## 🎉 Next Steps

Once SSH deployment is working:

- [ ] Test a deployment by making a small code change
- [ ] Set up deployment notifications
- [ ] Configure staging environment (optional)
- [ ] Add deployment status badge to README
- [ ] Document your custom deployment process

---

**Happy deploying with SSH! 🚀**
