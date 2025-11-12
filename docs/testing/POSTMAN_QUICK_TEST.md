# Quick Postman Test for Contact Form

## Test 1: OPTIONS (CORS Preflight)

**Method:** OPTIONS  
**URL:** `https://blaupunkt-ev.com/api/contact.php`

**Headers:**
```
Content-Type: application/json
```

**Expected Response:**
- Status: `200 OK`
- Headers should include:
  ```
  Access-Control-Allow-Origin: *
  Access-Control-Allow-Methods: POST, OPTIONS, GET
  Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With
  ```

---

## Test 2: POST (Submit Contact Form)

**Method:** POST  
**URL:** `https://blaupunkt-ev.com/api/contact.php`

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "phone": "1234567890",
  "message": "This is a test message from Postman"
}
```

**Expected Response:**
- Status: `200 OK`
- Body:
  ```json
  {
    "success": true,
    "message": "Email sent successfully"
  }
  ```

**Then check:** info@blaupunkt-ev.com for HTML formatted email

---

## Quick Import for Postman

Copy this JSON and import into Postman (File → Import → Raw text):

```json
{
  "info": {
    "name": "Blaupunkt Contact Form",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Test OPTIONS (CORS Preflight)",
      "request": {
        "method": "OPTIONS",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "url": {
          "raw": "https://blaupunkt-ev.com/api/contact.php",
          "protocol": "https",
          "host": ["blaupunkt-ev", "com"],
          "path": ["api", "contact.php"]
        }
      }
    },
    {
      "name": "Submit Contact Form",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"Test User\",\n  \"email\": \"test@example.com\",\n  \"phone\": \"1234567890\",\n  \"message\": \"This is a test message from Postman\"\n}"
        },
        "url": {
          "raw": "https://blaupunkt-ev.com/api/contact.php",
          "protocol": "https",
          "host": ["blaupunkt-ev", "com"],
          "path": ["api", "contact.php"]
        }
      }
    }
  ]
}
```
