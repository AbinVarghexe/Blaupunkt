# 🔐 Microsoft Graph API Setup Guide (OAuth 2.0)

## Why This Approach is Better

✅ **No Security Defaults Disabled** - Keep your tenant secure  
✅ **No App Passwords** - Use modern OAuth 2.0 authentication  
✅ **Token-Based Auth** - More secure than storing passwords  
✅ **Microsoft Recommended** - Best practice for app authentication  
✅ **Granular Permissions** - Only grant what's needed (Mail.Send)

---

## 📋 Prerequisites

- Office 365 tenant with admin access
- Azure AD admin permissions to register apps
- Valid email account in your tenant (e.g., `noreply@blaupunkt-ev.com`)

---

## 🚀 Step 1: Register Azure AD Application

### 1.1 Access Azure Portal
1. Go to [Azure Portal](https://portal.azure.com)
2. Sign in with your admin account
3. Navigate to **Azure Active Directory**

### 1.2 Create App Registration
1. Click **App registrations** in the left menu
2. Click **+ New registration**
3. Fill in the details:
   ```
   Name: Blaupunkt Contact Form API
   Supported account types: Accounts in this organizational directory only
   Redirect URI: Leave blank (not needed for client credentials flow)
   ```
4. Click **Register**

### 1.3 Note Your App Details
After registration, you'll see:
- **Application (client) ID** - Copy this (you'll need it)
- **Directory (tenant) ID** - Copy this (you'll need it)

---

## 🔑 Step 2: Create Client Secret

### 2.1 Generate Secret
1. In your app registration, click **Certificates & secrets** (left menu)
2. Click **+ New client secret**
3. Add description: `Contact Form Secret`
4. Set expiration: **24 months** (recommended)
5. Click **Add**

### 2.2 Copy the Secret Value
⚠️ **CRITICAL**: Copy the **Value** immediately!  
You cannot see it again after leaving this page.

```
Example: xYz9Q~ABcDeFgHiJkLmNoPqRsTuVwXyZ123456
```

---

## 🔐 Step 3: Configure API Permissions

### 3.1 Add Permission
1. Click **API permissions** (left menu)
2. Click **+ Add a permission**
3. Select **Microsoft Graph**
4. Select **Application permissions** (NOT Delegated)
5. Search for: `Mail.Send`
6. Check the box for **Mail.Send**
7. Click **Add permissions**

### 3.2 Grant Admin Consent
⚠️ **Required**: An admin must consent to these permissions

1. Click **Grant admin consent for [Your Organization]**
2. Click **Yes** to confirm
3. Status should show green checkmarks

**Final state should show:**
```
✅ Mail.Send (Application) - Granted for [Organization]
```

---

## 📧 Step 4: Configure Mailbox Permissions

The application needs permission to send emails from a specific mailbox.

### 4.1 Install Exchange Online PowerShell Module

Open PowerShell as Administrator:

```powershell
# Install module (one-time)
Install-Module -Name ExchangeOnlineManagement -Force

# Connect to Exchange Online
Connect-ExchangeOnline -UserPrincipalName admin@yourdomain.com
```

### 4.2 Grant Application Permissions

Replace values with your own:

```powershell
# Your app's Client ID (Application ID from Azure)
$appId = "YOUR_CLIENT_ID_HERE"

# The mailbox to send from
$mailbox = "noreply@blaupunkt-ev.com"

# Grant Send-As permission
Add-MailboxPermission -Identity $mailbox -User $appId -AccessRights FullAccess -InheritanceType All

# Alternative: Grant ApplicationImpersonation (if above doesn't work)
New-ManagementRoleAssignment -Role "Application Mail.Send" -App $appId
```

### 4.3 Verify Permissions

```powershell
# Check mailbox permissions
Get-MailboxPermission -Identity "noreply@blaupunkt-ev.com" | Format-Table User, AccessRights

# Disconnect when done
Disconnect-ExchangeOnline
```

---

## ⚙️ Step 5: Update PHP Configuration

Open `public/api/contact-graph.php` and update these values:

```php
// Line 51-54: Azure AD Application Configuration
define('TENANT_ID', 'YOUR_TENANT_ID');           // From Step 1.3
define('CLIENT_ID', 'YOUR_CLIENT_ID');           // From Step 1.3
define('CLIENT_SECRET', 'YOUR_CLIENT_SECRET');   // From Step 2.2

// Line 57-58: Email Configuration
define('SENDER_EMAIL', 'noreply@blaupunkt-ev.com');      // From Step 4.2
define('RECIPIENT_EMAIL', 'info@blaupunkt-ev.com');      // Where to receive submissions
```

### Example with Real Values:

```php
define('TENANT_ID', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890');
define('CLIENT_ID', 'f9e8d7c6-b5a4-3210-9876-543210fedcba');
define('CLIENT_SECRET', 'xYz9Q~ABcDeFgHiJkLmNoPqRsTuVwXyZ123456');

define('SENDER_EMAIL', 'noreply@blaupunkt-ev.com');
define('RECIPIENT_EMAIL', 'info@blaupunkt-ev.com');
```

---

## 📤 Step 6: Update React Frontend

### 6.1 Update API Endpoint

Open `src/config/api.js` or wherever your API URL is configured:

```javascript
// Change from:
const API_URL = '/api/contact.php';

// To:
const API_URL = '/api/contact-graph.php';
```

### 6.2 Or Update Contact Form Component

If API URL is hardcoded in component:

```javascript
// In src/Pages/Contact.jsx or similar
const response = await fetch('/api/contact-graph.php', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData)
});
```

---

## 🧪 Step 7: Test the Implementation

### 7.1 Test OAuth Token (PowerShell)

```powershell
$tenantId = "YOUR_TENANT_ID"
$clientId = "YOUR_CLIENT_ID"
$clientSecret = "YOUR_CLIENT_SECRET"

$body = @{
    client_id     = $clientId
    scope         = "https://graph.microsoft.com/.default"
    client_secret = $clientSecret
    grant_type    = "client_credentials"
}

$tokenResponse = Invoke-RestMethod -Method Post -Uri "https://login.microsoftonline.com/$tenantId/oauth2/v2.0/token" -Body $body

Write-Host "Access Token: $($tokenResponse.access_token.Substring(0, 50))..."
Write-Host "Token Type: $($tokenResponse.token_type)"
Write-Host "Expires In: $($tokenResponse.expires_in) seconds"
```

**Expected output:**
```
Access Token: eyJ0eXAiOiJKV1QiLCJub25jZSI6IkRhZjVaVGc0bnR...
Token Type: Bearer
Expires In: 3599 seconds
```

### 7.2 Test with Postman

1. Import your existing `POSTMAN_CONTACT_API_TEST.json`
2. Update the request URL to use `/api/contact-graph.php`
3. Run the "Contact Form - Success Test"

**Expected response:**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

### 7.3 Check Email Delivery

1. Check `info@blaupunkt-ev.com` inbox
2. Check spam/junk folder (first email might go there)
3. Check Sent Items of `noreply@blaupunkt-ev.com`

---

## 🛠️ Step 8: Deploy to Production

### 8.1 Build Your Project

```bash
npm run build
# or
pnpm run build
```

### 8.2 Upload Files to Hostinger

Upload these files from `dist/` folder:
- All files and folders
- **Important**: `dist/api/contact-graph.php`

### 8.3 Security: Lock Down CORS

In `contact-graph.php` line 67, change:

```php
// FROM:
header('Access-Control-Allow-Origin: *');

// TO:
header('Access-Control-Allow-Origin: https://yourdomain.com');
```

### 8.4 Verify on Production

1. Visit your live website
2. Submit a test form
3. Check email inbox
4. Verify reply-to works correctly

---

## 🔍 Troubleshooting

### Error: "Authentication failed" (401)

**Possible causes:**
- Wrong Tenant ID, Client ID, or Client Secret
- Client secret expired
- App not granted admin consent

**Solutions:**
1. Double-check all IDs in `contact-graph.php`
2. Verify client secret hasn't expired (Azure Portal → App Registration → Certificates & secrets)
3. Ensure admin consent was granted (Step 3.2)

### Error: "Failed to send email via Graph API" (500)

**Possible causes:**
- Application doesn't have permission to send from mailbox
- Sender email doesn't exist in tenant
- Missing Mail.Send API permission

**Solutions:**
1. Verify mailbox permissions (Step 4.3)
2. Ensure `SENDER_EMAIL` is valid Office 365 account
3. Check API permissions have green checkmarks in Azure Portal

### Error: "Recipient address rejected"

**Possible causes:**
- MX records still pointing to wrong server
- DNS not propagated yet

**Solutions:**
1. Fix MX records (see `DEPLOYMENT_CHECKLIST_OFFICE365.md` Step 1)
2. Wait 5-30 minutes for DNS propagation
3. Test with `nslookup -type=mx blaupunkt-ev.com`

### Email Not Received

**Check these locations:**
1. Recipient inbox (info@blaupunkt-ev.com)
2. Spam/junk folder
3. Quarantine (Office 365 Security Center → Review → Quarantine)
4. Hostinger error logs
5. Graph API response (check server logs)

### Token Request Returns 400

**Possible causes:**
- Invalid client secret format
- Wrong tenant ID
- App deleted or disabled

**Solutions:**
1. Generate new client secret (Step 2)
2. Verify tenant ID is correct GUID format
3. Check app status in Azure Portal

---

## 🔐 Security Best Practices

### 1. Use Environment Variables (Recommended)

Instead of hardcoding secrets, use `.env` file:

```php
// Install vlucas/phpdotenv via Composer
require 'vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

define('TENANT_ID', $_ENV['AZURE_TENANT_ID']);
define('CLIENT_ID', $_ENV['AZURE_CLIENT_ID']);
define('CLIENT_SECRET', $_ENV['AZURE_CLIENT_SECRET']);
```

`.env` file (do NOT commit to Git):
```env
AZURE_TENANT_ID=a1b2c3d4-e5f6-7890-abcd-ef1234567890
AZURE_CLIENT_ID=f9e8d7c6-b5a4-3210-9876-543210fedcba
AZURE_CLIENT_SECRET=xYz9Q~ABcDeFgHiJkLmNoPqRsTuVwXyZ123456
```

### 2. Rotate Client Secrets Regularly

- Set expiration to 24 months maximum
- Add calendar reminder to rotate before expiry
- Keep old secret active during transition period

### 3. Monitor Application Usage

Check Azure AD logs:
1. Azure Portal → Azure Active Directory
2. **Monitoring** → **Sign-in logs**
3. Filter by Application: "Blaupunkt Contact Form API"
4. Review for unusual activity

### 4. Implement Rate Limiting

Add to `contact-graph.php` before processing:

```php
// Simple rate limiting (5 requests per IP per minute)
$ip = $_SERVER['REMOTE_ADDR'];
$cacheKey = "contact_form_$ip";
$attempts = apcu_fetch($cacheKey) ?: 0;

if ($attempts >= 5) {
    http_response_code(429);
    echo json_encode(['success' => false, 'error' => 'Too many requests']);
    exit();
}

apcu_store($cacheKey, $attempts + 1, 60);
```

### 5. Add CAPTCHA Protection

Consider adding Google reCAPTCHA v3:
- Frontend: Add reCAPTCHA token to form submission
- Backend: Verify token before sending email

---

## 📊 Comparison: OAuth vs SMTP

| Feature | OAuth 2.0 (Graph API) | SMTP (PHPMailer) |
|---------|----------------------|------------------|
| **Security Defaults** | ✅ Keep enabled | ❌ Must disable |
| **App Passwords** | ✅ Not needed | ❌ Required |
| **Modern Auth** | ✅ Yes | ❌ Legacy |
| **Token Expiry** | ✅ Auto-renewed | N/A |
| **Audit Logs** | ✅ Detailed | Limited |
| **Setup Complexity** | Medium | Low |
| **Maintenance** | Low | Medium |
| **Microsoft Recommended** | ✅ Yes | No |

---

## 📚 Additional Resources

- [Microsoft Graph API Documentation](https://learn.microsoft.com/en-us/graph/api/user-sendmail)
- [OAuth 2.0 Client Credentials Flow](https://learn.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-client-creds-grant-flow)
- [Azure AD App Permissions](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Exchange Online PowerShell](https://learn.microsoft.com/en-us/powershell/exchange/exchange-online-powershell)

---

## ✅ Deployment Checklist

- [ ] Azure AD app registered (Step 1)
- [ ] Client secret created and copied (Step 2)
- [ ] Mail.Send permission granted with admin consent (Step 3)
- [ ] Mailbox permissions configured via PowerShell (Step 4)
- [ ] Configuration values updated in `contact-graph.php` (Step 5)
- [ ] React frontend updated to use new endpoint (Step 6)
- [ ] OAuth token test successful (Step 7.1)
- [ ] Test email sent successfully (Step 7.2)
- [ ] Email received in inbox (Step 7.3)
- [ ] Production build completed (`npm run build`)
- [ ] Files uploaded to Hostinger
- [ ] CORS restricted to production domain
- [ ] Postman tests passing on production
- [ ] Live form submission tested successfully

---

## 🎯 Summary

Your contact form now uses **Microsoft Graph API with OAuth 2.0** instead of SMTP:

✅ **More Secure** - No passwords in code, token-based auth  
✅ **No Security Compromises** - Keep Security Defaults enabled  
✅ **Modern Standards** - OAuth 2.0 is the recommended approach  
✅ **Better Monitoring** - Azure AD logs all API calls  
✅ **Future-Proof** - Microsoft's strategic direction

**Next Steps:**
1. Complete Steps 1-4 (Azure AD setup)
2. Update configuration (Step 5)
3. Update frontend (Step 6)
4. Test thoroughly (Step 7)
5. Deploy (Step 8)

Good luck! 🚀
