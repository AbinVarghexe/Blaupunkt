# Hostinger Deployment Guide - Contact Form Fix

## Files to Upload

Upload these files from your local `D:\DEV\Incial\Blaupunkt\public\api\` to Hostinger `/public_html/api/`:

1. ✅ `contact-production.php` → Upload to `/public_html/api/contact.php` (rename during upload)
2. ✅ `.htaccess` → Upload to `/public_html/api/.htaccess`
3. ✅ `test.php` → Upload to `/public_html/api/test.php`
4. ✅ `phpinfo.php` → Upload to `/public_html/api/phpinfo.php`

## Step-by-Step Instructions

### Step 1: Access Hostinger File Manager

1. Login to Hostinger hPanel: https://hpanel.hostinger.com
2. Go to **Files** → **File Manager**
3. Navigate to `/public_html/api/` directory
   - If `api` folder doesn't exist, create it: Click **+ New Folder** → Name: `api`

### Step 2: Upload Files

**Option A: Using File Manager Upload**
1. Click **Upload** button (top right)
2. Select files from `D:\DEV\Incial\Blaupunkt\public\api\`:
   - `contact-production.php`
   - `.htaccess`
   - `test.php`
   - `phpinfo.php`
3. After upload, **rename** `contact-production.php` to `contact.php`
   - Right-click file → **Rename** → Enter: `contact.php`

**Option B: Using FTP (Faster for multiple files)**
1. In hPanel, go to **Files** → **FTP Accounts**
2. Use existing FTP account or create new one
3. Connect using FileZilla or similar:
   - Host: `ftp.blaupunkt-ev.com`
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21
4. Navigate to `/public_html/api/`
5. Upload all 4 files
6. Rename `contact-production.php` to `contact.php`

### Step 3: Set File Permissions

In File Manager, right-click each file and select **Permissions**:

- `contact.php` → Set to **644** (Owner: Read+Write, Group: Read, Public: Read)
- `.htaccess` → Set to **644**
- `test.php` → Set to **644**
- `phpinfo.php` → Set to **644**

### Step 4: Verify PHP Execution

Open your browser and test each endpoint:

#### Test 1: phpinfo.php
**URL:** https://blaupunkt-ev.com/api/phpinfo.php

**Expected Result:** ✅ Full PHP configuration page with version, modules, settings
**If you see:** ❌ PHP source code → .htaccess not working, contact Hostinger support

#### Test 2: test.php
**URL:** https://blaupunkt-ev.com/api/test.php

**Expected Result:** 
```json
{
  "status": "working",
  "message": "Test file uploaded successfully",
  "timestamp": "2025-11-01 18:30:00",
  "php_version": "8.2.28"
}
```
**If you see:** ❌ PHP source code → PHP not executing

#### Test 3: contact.php OPTIONS (CORS Preflight)
Open browser console (F12) and run:
```javascript
fetch('https://blaupunkt-ev.com/api/contact.php', {
  method: 'OPTIONS',
  headers: {'Content-Type': 'application/json'}
}).then(r => console.log('Status:', r.status, 'OK:', r.ok))
```

**Expected Result:** ✅ `Status: 200 OK: true`
**If you see:** ❌ `Status: 500` → Contact form has error, check server logs

#### Test 4: contact.php POST (Actual Form Submission)
In browser console:
```javascript
fetch('https://blaupunkt-ev.com/api/contact.php', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    phone: '1234567890',
    message: 'This is a test message from deployment verification'
  })
})
.then(r => r.json())
.then(data => console.log('Response:', data))
.catch(err => console.error('Error:', err))
```

**Expected Result:**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

**Check your email:** info@blaupunkt-ev.com should receive HTML formatted email

### Step 5: Check Server Logs (If Issues)

In Hostinger hPanel:
1. Go to **Advanced** → **Error Logs**
2. Select your domain: `blaupunkt-ev.com`
3. Look for recent PHP errors related to contact form
4. Common errors:
   - `mail() function not available` → Contact Hostinger support
   - `Headers already sent` → Check for spaces/newlines before `<?php`
   - `Permission denied` → Fix file permissions to 644

### Step 6: Test from Your React App

1. Keep `.env.development` as is:
   ```bash
   VITE_API_URL=https://blaupunkt-ev.com
   ```

2. Make sure dev server is running:
   ```bash
   npm run dev
   ```
   Should be on `http://localhost:3001`

3. Open browser: `http://localhost:3001/contact`

4. Fill out the contact form and submit

5. **Expected Result:**
   - ✅ Success toast: "Message sent successfully!"
   - ✅ Form clears
   - ✅ Email received at info@blaupunkt-ev.com

6. **If CORS error:**
   - Verify `.htaccess` is uploaded to `/public_html/api/.htaccess`
   - Check file contents are correct (CORS headers present)
   - Try clearing browser cache: Ctrl+Shift+Delete

### Step 7: Deploy React Build to Production

Once contact form works:

1. Build the React app:
   ```bash
   npm run build
   ```

2. Upload contents of `dist/` folder to `/public_html/`:
   - `dist/index.html` → `/public_html/index.html`
   - `dist/assets/*` → `/public_html/assets/*`
   - Don't overwrite `/public_html/api/` folder!

3. Test production site: https://blaupunkt-ev.com/contact

4. Submit test form from production site

5. **Delete test files** (for security):
   - Delete `/public_html/api/phpinfo.php`
   - Delete `/public_html/api/test.php`
   - Keep `contact.php` and `.htaccess`

## Troubleshooting

### Problem: "CORS preflight response did not succeed" (500 error)

**Causes:**
1. `.htaccess` not uploaded → Upload it to `/public_html/api/.htaccess`
2. PHP syntax error in `contact.php` → Check error logs
3. LiteSpeed not recognizing PHP → Contact Hostinger support

**Solution:**
- Verify `.htaccess` exists: Visit File Manager → `/public_html/api/` → Should see `.htaccess`
- Test phpinfo.php first to confirm PHP works
- If phpinfo.php works but contact.php doesn't, the issue is in contact.php code

### Problem: "NetworkError when attempting to fetch resource"

**Causes:**
1. File doesn't exist (404)
2. CORS headers not sent
3. Server is down

**Solution:**
- Test direct URL: https://blaupunkt-ev.com/api/contact.php
- Should return JSON, not 404 or source code
- Check if server is online

### Problem: Email not received

**Causes:**
1. `mail()` function disabled on Hostinger
2. Email in spam folder
3. Email account doesn't exist

**Solution:**
- Check spam/junk folder at info@blaupunkt-ev.com
- Verify email account exists in hPanel → Email → Email Accounts
- Check error logs for mail-related errors
- Contact Hostinger support to verify mail() is enabled

### Problem: Still seeing PHP source code

**Causes:**
1. File uploaded to wrong location (not in `/public_html/`)
2. File permissions incorrect
3. `.htaccess` not working on your hosting plan
4. File has wrong extension (not `.php`)

**Solution:**
- Verify exact path: `/public_html/api/contact.php`
- Check permissions: Should be 644
- Verify extension: Must be `.php` not `.php.txt`
- Contact Hostinger support to verify `.htaccess` support

## Success Checklist

- [ ] phpinfo.php shows PHP info page (not source code)
- [ ] test.php returns JSON successfully
- [ ] OPTIONS request to contact.php returns 200
- [ ] POST request to contact.php returns success JSON
- [ ] Email received at info@blaupunkt-ev.com with HTML formatting
- [ ] Form submission from localhost:3001 works (no CORS errors)
- [ ] Form submission from production site works
- [ ] Test files deleted (phpinfo.php, test.php)

## File Contents Reference

If you need to recreate files manually, here are the paths:

- **contact.php**: `D:\DEV\Incial\Blaupunkt\public\api\contact-production.php` (rename to contact.php on upload)
- **.htaccess**: `D:\DEV\Incial\Blaupunkt\public\api\.htaccess`
- **test.php**: `D:\DEV\Incial\Blaupunkt\public\api\test.php`
- **phpinfo.php**: `D:\DEV\Incial\Blaupunkt\public\api\phpinfo.php`

All files ready in your local project directory!
