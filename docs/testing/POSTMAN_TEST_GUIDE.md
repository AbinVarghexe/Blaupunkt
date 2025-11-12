# Postman Contact API Test Guide

## Quick Setup

### 1. Import Collection into Postman

1. Open Postman application
2. Click **Import** button (top left)
3. Select **File** tab
4. Click **Choose Files**
5. Navigate to: `POSTMAN_CONTACT_API_TEST.json`
6. Click **Import**

### 2. Configure Environment

The collection includes a `BASE_URL` variable set to `http://localhost:3001` by default.

**For Local Testing:**
- No changes needed if your dev server runs on port 3001
- If using different port, edit the variable in collection settings

**For Production Testing (Hostinger):**
1. Click on collection name: "Blaupunkt Contact API Test"
2. Go to **Variables** tab
3. Change `BASE_URL` value to your production domain:
   ```
   https://yourdomain.com
   ```
   (or whatever your Hostinger domain is)

### 3. Run Tests

#### Option A: Run Individual Tests

Click on any test request to see what it tests:

| Test Name | Purpose |
|-----------|---------|
| **Contact Form - Success Test** | Test successful email submission |
| **Contact Form - Missing Name** | Validate name field is required |
| **Contact Form - Missing Email** | Validate email field is required |
| **Contact Form - Missing Message** | Validate message field is required |
| **Contact Form - Invalid Email** | Test email format validation |
| **Contact Form - Empty Fields** | Test whitespace-only validation |
| **Contact Form - GET Request** | Verify only POST is allowed |
| **Contact Form - Without Phone** | Verify phone is optional |

Click **Send** button to execute the test.

#### Option B: Run All Tests (Collection Runner)

1. Click on collection name: "Blaupunkt Contact API Test"
2. Click **Run** button
3. Ensure all tests are selected
4. Click **Run Blaupunkt Contact API Test**
5. View results showing pass/fail for each test

### 4. Test Results to Expect

#### ✅ Success Test Response:
```json
{
    "success": true,
    "message": "Email sent successfully"
}
```

#### ❌ Missing Name Response:
```json
{
    "error": "Missing required field: name"
}
```

#### ❌ Invalid Email Response:
```json
{
    "error": "Invalid email address"
}
```

#### ❌ GET Request Response:
```json
{
    "error": "Method not allowed"
}
```

### 5. Manual Quick Test (cURL Alternative)

If you prefer command line testing:

**Windows PowerShell:**
```powershell
$body = @{
    name = "Test User"
    email = "test@example.com"
    phone = "+971 50 123 4567"
    message = "Test message from PowerShell"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3001/api/contact.php" -Method POST -Body $body -ContentType "application/json"
```

**Linux/Mac Terminal:**
```bash
curl -X POST http://localhost:3001/api/contact.php \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+971 50 123 4567",
    "message": "Test message from cURL"
  }'
```

### 6. Troubleshooting

#### "Connection Refused" Error
- **Cause**: Dev server not running
- **Fix**: Run `npm run dev` in terminal

#### CORS Error in Postman
- **Note**: Postman doesn't enforce CORS, so this shouldn't happen
- If it does, check that CORS headers are set in `contact.php`

#### 500 Internal Server Error
- **Check**: PHP error logs in Hostinger control panel
- **Check**: Browser console for error details
- **Verify**: `contact.php` file permissions (should be 644 or 755)

#### Email Not Received
- **Check**: Spam/junk folder
- **Verify**: Email address in `contact.php` is correct (info@blaupunkt-ev.com)
- **Check**: Hostinger email sending is configured properly
- **Note**: Local development may not send actual emails (check PHP mail configuration)

### 7. Production Testing Checklist

Before testing on Hostinger:

- [ ] Build completed: `npm run build`
- [ ] Files uploaded to `public_html`
- [ ] `contact.php` exists at `/api/contact.php`
- [ ] Update Postman `BASE_URL` to production domain
- [ ] Clear browser cache
- [ ] Run "Contact Form - Success Test" first
- [ ] Check email inbox (info@blaupunkt-ev.com)
- [ ] If issues, check Hostinger error logs

### 8. Advanced Testing

#### Test with Postman Scripts

Each test includes automatic validation scripts that run after receiving response:

- ✅ Status code validation
- ✅ Response structure validation
- ✅ Error message validation

View test results in **Test Results** tab after sending request.

#### Collection Variables

You can add more variables for reusability:

```javascript
{
  "BASE_URL": "https://yourdomain.com",
  "TEST_EMAIL": "test@example.com",
  "TEST_NAME": "Test User"
}
```

Then use in request body:
```json
{
  "name": "{{TEST_NAME}}",
  "email": "{{TEST_EMAIL}}"
}
```

---

## Test Coverage Summary

✅ **Valid Submission**: All required fields provided  
✅ **Missing Required Fields**: name, email, message  
✅ **Invalid Email Format**: Email validation  
✅ **Empty/Whitespace Values**: Trim validation  
✅ **Wrong HTTP Method**: GET request rejection  
✅ **Optional Fields**: Phone number is optional  

## Quick Reference

- **Endpoint**: `/api/contact.php`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Required Fields**: name, email, message
- **Optional Fields**: phone
- **Success Response**: `200 OK` with `{"success": true}`
- **Error Response**: `400/405` with `{"error": "message"}`
