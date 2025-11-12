# 🚀 DEPLOYMENT CHECKLIST - Office 365 SMTP Version

## ✅ Pre-Deployment Checklist

### 1. DNS/MX Records (URGENT - Do This First!)

**Status:** ⚠️ **MUST BE DONE IMMEDIATELY**

Your company's Office 365 emails are currently broken. Fix this NOW:

- [ ] Log into Hostinger Control Panel
- [ ] Go to DNS Zone Editor for `blaupunkt-ev.com`
- [ ] Delete any MX records pointing to Hostinger
- [ ] Add Office 365 MX record:
  ```
  Type: MX
  Name: @
  Priority: 0
  Value: blaupunktev-com02c.mail.protection.outlook.com
  ```
- [ ] Update SPF TXT record:
  ```
  Type: TXT
  Name: @
  Value: v=spf1 include:spf.protection.outlook.com -all
  ```
- [ ] Wait 5-30 minutes for DNS propagation
- [ ] Test by sending email to any @blaupunkt-ev.com address

---

### 2. Install PHPMailer on Hostinger

**Choose ONE method:**

#### Option A: Composer (Recommended)
- [ ] SSH into Hostinger
- [ ] Run: `cd public_html`
- [ ] Run: `composer require phpmailer/phpmailer`
- [ ] Verify `vendor/phpmailer/phpmailer/` folder exists

#### Option B: Manual Upload
- [ ] Download PHPMailer from: https://github.com/PHPMailer/PHPMailer/releases
- [ ] Extract the ZIP file
- [ ] Upload `PHPMailer` folder to `public_html/api/PHPMailer/`
- [ ] Verify these files exist:
  - `public_html/api/PHPMailer/src/PHPMailer.php`
  - `public_html/api/PHPMailer/src/SMTP.php`
  - `public_html/api/PHPMailer/src/Exception.php`

---

### 3. Configure Email Credentials

**Edit:** `public/api/contact.php` (in your local project)

- [ ] **Line 68:** Update username
  ```php
  $mail->Username = 'noreply@blaupunkt-ev.com';  // Your actual Office 365 email
  ```

- [ ] **Line 69:** Update password
  ```php
  $mail->Password = 'YOUR_ACTUAL_PASSWORD';  // Real password here!
  ```

- [ ] **Line 73:** Update recipient email
  ```php
  $mail->addAddress('info@blaupunkt-ev.com', 'Blaupunkt EV Team');  // Who receives emails
  ```

- [ ] **Line 72:** Verify sender email matches username
  ```php
  $mail->setFrom('noreply@blaupunkt-ev.com', 'Blaupunkt EV Contact Form');
  ```

**SECURITY WARNING:** 
- ⚠️ Never commit passwords to Git!
- ✅ Consider using environment variables (see OFFICE365_SMTP_SETUP.md)

---

### 4. Enable SMTP in Office 365

- [ ] Log into Office 365 Admin Center
- [ ] Go to Users → Active Users
- [ ] Select: `noreply@blaupunkt-ev.com` (or your sending email)
- [ ] Go to Mail → Email Apps
- [ ] Ensure "Authenticated SMTP" is **ENABLED**
- [ ] If 2FA is enabled, you may need an "App Password"

---

### 5. Update PHPMailer Paths (if using manual installation)

**Edit:** `public/api/contact.php` (lines 45-47)

If you uploaded PHPMailer manually, update these lines:

```php
// Change this:
require 'vendor/autoload.php';

// To this:
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
```

---

### 6. Rebuild Project

- [x] ✅ **DONE** - Build completed successfully (see terminal output)

Current build:
```
✓ 780 modules transformed
✓ built in 6.67s
```

Files ready in `dist/` folder.

---

### 7. Upload to Hostinger

**Upload these files from `dist/` folder:**

- [ ] `index.html`
- [ ] `assets/` folder (all files)
- [ ] `api/contact.php` ⚠️ **IMPORTANT - Updated version!**
- [ ] All other asset files (images, PDFs, videos)

**If using Composer:**
- [ ] Also upload `vendor/` folder

**File Permissions:**
- [ ] Set `contact.php` to `644` or `755`
- [ ] Verify file uploaded successfully

---

### 8. Test with Postman

- [ ] Open Postman
- [ ] Import `POSTMAN_CONTACT_API_TEST.json`
- [ ] Update `BASE_URL` to your production domain
- [ ] Run "Contact Form - Success Test"
- [ ] **Expected Result:** `{"success": true, "message": "Email sent successfully"}`
- [ ] Check email received at `info@blaupunkt-ev.com`
- [ ] Check spam/junk folder if not in inbox

**If test fails:**
- [ ] Check Hostinger error logs
- [ ] Enable debug mode: `$mail->SMTPDebug = 2;` (line 64)
- [ ] Re-test and check detailed error messages

---

### 9. Test on Live Website

- [ ] Visit your website's contact page
- [ ] Clear browser cache (Ctrl+Shift+Delete)
- [ ] Fill out contact form with test data
- [ ] Submit form
- [ ] Check for success message
- [ ] Verify email received
- [ ] Test "Reply-To" functionality

---

### 10. Security Hardening

- [ ] Restrict CORS in `contact.php` (line 34):
  ```php
  header('Access-Control-Allow-Origin: https://yourdomain.com');
  ```

- [ ] Disable debug mode (line 64):
  ```php
  $mail->SMTPDebug = 0;  // Should be 0 in production
  ```

- [ ] Remove any test echo/var_dump statements

- [ ] Consider adding rate limiting (see OFFICE365_SMTP_SETUP.md)

- [ ] Consider adding reCAPTCHA v3

---

## 🔧 Troubleshooting Quick Reference

| Error | Solution |
|-------|----------|
| "Class 'PHPMailer' not found" | PHPMailer not installed or wrong path |
| "SMTP Error: Could not authenticate" | Wrong username/password or SMTP not enabled |
| "SMTP connect() failed" | Port 587 blocked or wrong server |
| "Recipient address rejected" | Email doesn't exist or MX records wrong |
| Email not received | Check spam folder, MX records, Office 365 quarantine |

**For detailed troubleshooting:** See `OFFICE365_SMTP_SETUP.md`

---

## 📞 Emergency Contacts

**If deployment fails:**

1. **Hostinger Support:** Check SMTP port access and error logs
2. **Office 365 Support:** Verify email account and SMTP settings
3. **Your IT Team:** Confirm DNS/MX changes were applied correctly

---

## ✅ Final Verification

After deployment, verify ALL of these:

- [ ] Company emails working (@blaupunkt-ev.com addresses can send/receive)
- [ ] Contact form sends test email successfully
- [ ] Email arrives in correct inbox
- [ ] Reply-To field contains customer's email
- [ ] No errors in browser console
- [ ] No errors in Hostinger error logs
- [ ] SMTP debug mode is OFF (SMTPDebug = 0)
- [ ] CORS restricted to your domain
- [ ] Passwords not visible in any public code

---

## 🎯 Priority Order

**CRITICAL (Do Now):**
1. Fix MX/SPF DNS records (Step 1) - Company emails are down!
2. Install PHPMailer (Step 2)
3. Configure credentials (Step 3)

**IMPORTANT (Do Soon):**
4. Enable SMTP in Office 365 (Step 4)
5. Upload files (Step 7)
6. Test with Postman (Step 8)

**RECOMMENDED (Do Before Going Live):**
7. Test on live website (Step 9)
8. Security hardening (Step 10)

---

## 📄 Related Documentation

- `OFFICE365_SMTP_SETUP.md` - Detailed setup guide
- `POSTMAN_TEST_GUIDE.md` - Testing instructions
- `POSTMAN_CONTACT_API_TEST.json` - Test collection

---

**Last Updated:** November 4, 2025
**Build Version:** 6.67s, 780 modules
**Status:** ✅ Ready for deployment
