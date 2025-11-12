# Office 365 SMTP Setup Guide for Contact Form

## ✅ What Changed

Your contact form now uses **Office 365 SMTP** instead of PHP's `mail()` function for more reliable email delivery.

## 📋 Prerequisites

1. **Valid Office 365 Email Account** (e.g., `noreply@blaupunkt-ev.com`)
2. **Email Password** for the account
3. **PHPMailer Library** installed on your server
4. **MX Records** properly configured (as mentioned in the urgent email)

---

## 🚀 Setup Steps

### Step 1: Install PHPMailer on Hostinger

**Option A: Using SSH/Terminal (Recommended)**

1. Connect to Hostinger via SSH
2. Navigate to your website's root directory:
   ```bash
   cd public_html
   ```
3. Install PHPMailer via Composer:
   ```bash
   composer require phpmailer/phpmailer
   ```

**Option B: Manual Installation**

1. Download PHPMailer from: https://github.com/PHPMailer/PHPMailer/releases
2. Extract the ZIP file
3. Upload the `PHPMailer` folder to your server
4. Place it in the same directory as `contact.php` or in a `vendor` folder
5. Update the `require` statements in `contact.php` (lines 45-47) to match your path

### Step 2: Configure Email Credentials

Edit `public/api/contact.php` and update these lines:

**Line 68-69: Update with your actual email credentials**

```php
$mail->Username   = 'noreply@blaupunkt-ev.com';  // Your Office 365 email
$mail->Password   = 'YOUR_EMAIL_PASSWORD';       // Your actual password
```

**IMPORTANT SECURITY:**
- Never commit passwords to Git/GitHub
- Consider using environment variables for production
- Create a dedicated email account for the contact form (like `noreply@blaupunkt-ev.com`)

**Line 73: Set who receives the emails**

```php
$mail->addAddress('info@blaupunkt-ev.com', 'Blaupunkt EV Team');
```

Change `info@blaupunkt-ev.com` to whatever email should receive contact form submissions.

### Step 3: Enable SMTP in Office 365

1. Log into **Office 365 Admin Center**
2. Go to **Users** → **Active Users**
3. Select the email account (e.g., `noreply@blaupunkt-ev.com`)
4. Go to **Mail** → **Email Apps**
5. Ensure **Authenticated SMTP** is **enabled**

### Step 4: Fix DNS/MX Records (URGENT)

**You MUST do this first or ALL company emails will be broken!**

1. Log into **Hostinger Control Panel**
2. Go to **DNS / DNS Zone Editor** for `blaupunkt-ev.com`
3. **Delete** any MX records pointing to Hostinger
4. **Add** this MX record:
   ```
   Type: MX
   Name: @ (or blank)
   Priority: 0
   Value: blaupunkt-ev.com02c.mail.protection.outlook.com
   ```
5. **Update** SPF TXT record:
   ```
   Type: TXT
   Name: @ (or blank)
   Value: v=spf1 include:spf.protection.outlook.com -all
   ```
6. **Save** and wait 5-30 minutes for DNS propagation

### Step 5: Upload Updated Files

1. Build your React app:
   ```bash
   npm run build
   ```

2. Upload to Hostinger:
   - Upload `dist/api/contact.php` (the updated version)
   - Ensure file permissions are `644` or `755`

3. If using Composer, also upload:
   - `vendor/` folder (contains PHPMailer)

### Step 6: Test the Contact Form

**Option 1: Use Postman (Recommended)**

Use the `POSTMAN_CONTACT_API_TEST.json` collection created earlier:

1. Open Postman
2. Import the collection
3. Update `BASE_URL` to your production domain
4. Run "Contact Form - Success Test"
5. Check for email arrival

**Option 2: Manual Test**

1. Visit your website's contact page
2. Fill out the form
3. Submit
4. Check `info@blaupunkt-ev.com` inbox (and spam folder!)

---

## 🔧 Troubleshooting

### Error: "Class 'PHPMailer' not found"

**Cause:** PHPMailer not installed or path is wrong

**Fix:**
1. Verify PHPMailer is uploaded to server
2. Check `require` paths in `contact.php` (lines 45-47)
3. If using Composer: `composer require phpmailer/phpmailer`
4. If manual: adjust paths to match your folder structure

### Error: "SMTP Error: Could not authenticate"

**Cause:** Wrong email/password or SMTP not enabled

**Fix:**
1. Double-check username/password in `contact.php`
2. Verify SMTP is enabled in Office 365 for that account
3. Try logging into Office 365 webmail to confirm password works
4. Check if account has 2FA enabled (may need app password)

### Error: "SMTP connect() failed"

**Cause:** Firewall blocking port 587 or wrong server

**Fix:**
1. Verify you're using `smtp.office365.com` and port `587`
2. Contact Hostinger support to ensure port 587 is not blocked
3. Try using port `25` instead (less secure, but may work)

### Email Not Received

**Check:**
1. Spam/Junk folder in receiving email
2. Office 365 quarantine/junk folder
3. Hostinger error logs for SMTP errors
4. Verify MX records are correctly set (Step 4)

### "Failed to send email" Error

**Debug Steps:**
1. Enable debug mode in `contact.php` line 64:
   ```php
   $mail->SMTPDebug = 2;  // Change from 0 to 2
   ```
2. Check server error logs for detailed SMTP errors
3. Test SMTP credentials manually using telnet or online SMTP tester

---

## 🔐 Security Best Practices

### 1. Use Environment Variables (Advanced)

Instead of hardcoding password in PHP:

```php
// In contact.php
$mail->Username = getenv('SMTP_USERNAME');
$mail->Password = getenv('SMTP_PASSWORD');
```

Then set environment variables in Hostinger control panel.

### 2. Restrict CORS in Production

Change line 34 in `contact.php`:

```php
// Before (allows all domains - insecure)
header('Access-Control-Allow-Origin: *');

// After (only your domain - secure)
header('Access-Control-Allow-Origin: https://yourdomain.com');
```

### 3. Rate Limiting

Add rate limiting to prevent spam abuse:

```php
// Add at the top of contact.php
session_start();
$lastSubmit = $_SESSION['last_submit'] ?? 0;
if (time() - $lastSubmit < 60) {
    http_response_code(429);
    echo json_encode(['error' => 'Please wait before submitting again']);
    exit();
}
$_SESSION['last_submit'] = time();
```

### 4. Add reCAPTCHA (Recommended)

Protect against bots by adding Google reCAPTCHA v3 to your form.

---

## 📊 File Checklist

After setup, verify these files exist on your server:

```
public_html/
├── api/
│   └── contact.php (updated with Office 365 SMTP)
├── vendor/
│   └── phpmailer/
│       └── phpmailer/
│           ├── src/
│           │   ├── PHPMailer.php
│           │   ├── SMTP.php
│           │   └── Exception.php
│           └── ... (other PHPMailer files)
└── (your React build files)
```

**OR** if manual installation:

```
public_html/
├── api/
│   ├── contact.php
│   └── PHPMailer/
│       └── src/
│           ├── PHPMailer.php
│           ├── SMTP.php
│           └── Exception.php
└── (your React build files)
```

---

## ⚡ Quick Reference

| Setting | Value |
|---------|-------|
| **SMTP Host** | `smtp.office365.com` |
| **SMTP Port** | `587` (TLS) or `25` (fallback) |
| **Encryption** | `STARTTLS` |
| **Authentication** | Required |
| **Username** | Your Office 365 email (e.g., `noreply@blaupunkt-ev.com`) |
| **Password** | Your email password |
| **From Address** | Same as username |
| **To Address** | Where you want to receive emails (e.g., `info@blaupunkt-ev.com`) |

---

## 📞 Support

If you encounter issues:

1. **Check Hostinger Error Logs:** Control Panel → Error Logs
2. **Enable SMTP Debug:** Set `$mail->SMTPDebug = 2;` in contact.php
3. **Test SMTP Manually:** Use online SMTP testing tools
4. **Contact Hostinger Support:** They can verify SMTP port access
5. **Contact Office 365 Support:** For email account issues

---

## ✅ Final Testing Checklist

Before going live:

- [ ] MX records updated to Office 365 settings
- [ ] SPF TXT record updated
- [ ] DNS changes propagated (wait 5-30 minutes)
- [ ] PHPMailer installed on server
- [ ] Email credentials updated in `contact.php`
- [ ] Recipient email updated in `contact.php`
- [ ] Files uploaded to Hostinger
- [ ] Test email sent via Postman - SUCCESS ✅
- [ ] Test email sent via website form - SUCCESS ✅
- [ ] Email received in inbox (check spam folder)
- [ ] Reply-to address works correctly
- [ ] CORS settings restricted to your domain
- [ ] Debug mode disabled (`SMTPDebug = 0`)

---

## 🎯 Next Steps

1. **First Priority:** Fix MX/SPF records (company emails are down!)
2. **Second Priority:** Install PHPMailer on Hostinger
3. **Third Priority:** Update email credentials in contact.php
4. **Fourth Priority:** Rebuild and upload to Hostinger
5. **Fifth Priority:** Test with Postman collection

Good luck! 🚀
