<?php
/**
 * Contact Form API Endpoint - Microsoft Graph API with OAuth 2.0
 * 
 * This script uses Microsoft Graph API to send emails securely without requiring
 * app passwords or disabling Security Defaults. Uses OAuth 2.0 client credentials flow.
 * 
 * SECURITY BENEFITS:
 *   - No need to disable Security Defaults on your tenant
 *   - No passwords stored in code
 *   - Uses OAuth 2.0 token-based authentication
 *   - More secure and Microsoft-recommended approach
 * 
 * SETUP REQUIREMENTS:
 *   1. Register an Azure AD App Registration
 *   2. Grant API permissions: Mail.Send (Application permission)
 *   3. Admin consent for the permissions
 *   4. Create a client secret
 * 
 * CONFIGURATION (Required):
 *   - TENANT_ID: Your Azure AD tenant ID
 *   - CLIENT_ID: Your app registration client ID
 *   - CLIENT_SECRET: Your app registration client secret
 *   - SENDER_EMAIL: Email address to send from (must be valid in your tenant)
 *   - RECIPIENT_EMAIL: Email address to receive contact form submissions
 * 
 * Expected Input (JSON):
 *   - name: string (required) - User's full name
 *   - email: string (required) - User's email address
 *   - phone: string (optional) - User's phone number
 *   - message: string (required) - User's message
 * 
 * Response (JSON):
 *   Success: {"success": true, "message": "Email sent successfully"}
 *   Error: {"success": false, "error": "Error message"}
 * 
 * HTTP Status Codes:
 *   200 - Success
 *   400 - Bad Request (missing/invalid fields)
 *   401 - Unauthorized (OAuth token failed)
 *   405 - Method Not Allowed (not POST)
 *   500 - Internal Server Error (email sending failed)
 */

// ============================================================================
// CONFIGURATION - LOAD FROM ENVIRONMENT VARIABLES
// ============================================================================

// Load environment variables from .env file if it exists
if (file_exists(__DIR__ . '/.env')) {
    $lines = file(__DIR__ . '/.env', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;  // Skip comments
        if (strpos($line, '=') === false) continue;     // Skip invalid lines
        list($key, $value) = explode('=', $line, 2);
        $_ENV[trim($key)] = trim($value);
        putenv(trim($key) . '=' . trim($value));
    }
}

// Azure AD Application Configuration
define('TENANT_ID', getenv('AZURE_TENANT_ID') ?: '');           // Directory (tenant) ID
define('CLIENT_ID', getenv('AZURE_CLIENT_ID') ?: '');           // Application (client) ID
define('CLIENT_SECRET', getenv('AZURE_CLIENT_SECRET') ?: '');   // Client Secret

// Email Configuration
define('SENDER_EMAIL', getenv('SENDER_EMAIL') ?: 'noreply@blaupunkt-ev.com');      // Must exist in your Office 365 tenant
define('RECIPIENT_EMAIL', getenv('RECIPIENT_EMAIL') ?: 'info@blaupunkt-ev.com');   // Where to send contact form submissions

// Validate configuration
if (empty(TENANT_ID) || empty(CLIENT_ID) || empty(CLIENT_SECRET)) {
    error_log('CRITICAL: Azure AD credentials not configured. Check environment variables or .env file.');
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Server configuration error']);
    exit();
}

// ============================================================================
// ERROR HANDLING AND CORS CONFIGURATION
// ============================================================================

error_reporting(E_ALL);
ini_set('display_errors', 0);  // Don't display errors to user (security)
ini_set('log_errors', 1);       // Log errors to server log file

// CORS Headers
// IMPORTANT: Replace * with your actual domain in production
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

/**
 * Get OAuth 2.0 access token from Microsoft Identity Platform
 * Uses client credentials flow for app-only authentication
 * 
 * @return string|false Access token on success, false on failure
 */
function getAccessToken() {
    $tokenUrl = 'https://login.microsoftonline.com/' . TENANT_ID . '/oauth2/v2.0/token';
    
    $postData = [
        'client_id' => CLIENT_ID,
        'client_secret' => CLIENT_SECRET,
        'scope' => 'https://graph.microsoft.com/.default',
        'grant_type' => 'client_credentials'
    ];
    
    $ch = curl_init($tokenUrl);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/x-www-form-urlencoded'
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode !== 200) {
        error_log("OAuth token request failed with HTTP $httpCode: $response");
        return false;
    }
    
    $data = json_decode($response, true);
    
    if (!isset($data['access_token'])) {
        error_log("No access token in OAuth response: $response");
        return false;
    }
    
    return $data['access_token'];
}

/**
 * Send email using Microsoft Graph API
 * 
 * @param string $accessToken OAuth access token
 * @param string $name Sender's name
 * @param string $email Sender's email
 * @param string $phone Sender's phone (optional)
 * @param string $message Email message
 * @return array Result with success status and message
 */
function sendEmailViaGraph($accessToken, $name, $email, $phone, $message) {
    $graphUrl = 'https://graph.microsoft.com/v1.0/users/' . SENDER_EMAIL . '/sendMail';
    
    // Sanitize inputs
    $name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
    $email = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
    $phone = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');
    $message = nl2br($message);
    
    // Build HTML email body
    $htmlBody = <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 600; }
        .content { padding: 30px; }
        .field { margin-bottom: 20px; padding: 15px; background: #f8f9fa; border-left: 4px solid #667eea; border-radius: 4px; }
        .field-label { font-weight: 600; color: #667eea; font-size: 12px; text-transform: uppercase; margin-bottom: 5px; }
        .field-value { color: #333; font-size: 14px; word-wrap: break-word; }
        .message-content { background: white; border: 1px solid #e0e0e0; padding: 15px; border-radius: 4px; margin-top: 10px; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #e0e0e0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📧 New Contact Form Submission</h1>
        </div>
        <div class="content">
            <div class="field">
                <div class="field-label">Name</div>
                <div class="field-value">{$name}</div>
            </div>
            <div class="field">
                <div class="field-label">Email Address</div>
                <div class="field-value"><a href="mailto:{$email}" style="color: #667eea; text-decoration: none;">{$email}</a></div>
            </div>
HTML;

    if (!empty($phone)) {
        $htmlBody .= <<<HTML
            <div class="field">
                <div class="field-label">Phone Number</div>
                <div class="field-value">{$phone}</div>
            </div>
HTML;
    }

    $htmlBody .= <<<HTML
            <div class="field">
                <div class="field-label">Message</div>
                <div class="message-content">{$message}</div>
            </div>
        </div>
        <div class="footer">
            <p>This email was sent from the Blaupunkt EV contact form.</p>
            <p>To reply to this inquiry, use the email address provided above.</p>
        </div>
    </div>
</body>
</html>
HTML;

    // Plain text version
    $plainText = "New Contact Form Submission\n\n";
    $plainText .= "Name: $name\n";
    $plainText .= "Email: $email\n";
    if (!empty($phone)) {
        $plainText .= "Phone: $phone\n";
    }
    $plainText .= "\nMessage:\n$message";
    
    // Build Graph API request
    $emailData = [
        'message' => [
            'subject' => '🔔 New Contact Form Submission from ' . $name,
            'body' => [
                'contentType' => 'HTML',
                'content' => $htmlBody
            ],
            'toRecipients' => [
                [
                    'emailAddress' => [
                        'address' => RECIPIENT_EMAIL
                    ]
                ]
            ],
            'replyTo' => [
                [
                    'emailAddress' => [
                        'address' => $email,
                        'name' => $name
                    ]
                ]
            ]
        ],
        'saveToSentItems' => 'true'
    ];
    
    $ch = curl_init($graphUrl);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($emailData));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $accessToken,
        'Content-Type: application/json'
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode === 202 || $httpCode === 200) {
        return ['success' => true, 'message' => 'Email sent successfully'];
    } else {
        error_log("Graph API send mail failed with HTTP $httpCode: $response");
        return ['success' => false, 'error' => 'Failed to send email via Graph API'];
    }
}

// ============================================================================
// MAIN REQUEST HANDLER
// ============================================================================

try {
    // Handle preflight OPTIONS request
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    // Only accept POST requests
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['success' => false, 'error' => 'Method not allowed']);
        exit();
    }

    // Read and parse JSON input
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    error_log("Received contact form data: " . print_r($data, true));

    // Validate JSON parsing
    if (json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid JSON format']);
        exit();
    }

    // Validate required fields
    $requiredFields = ['name', 'email', 'message'];
    $missingFields = [];

    foreach ($requiredFields as $field) {
        if (!isset($data[$field]) || trim($data[$field]) === '') {
            $missingFields[] = $field;
        }
    }

    if (!empty($missingFields)) {
        http_response_code(400);
        echo json_encode([
            'success' => false, 
            'error' => 'Missing required fields: ' . implode(', ', $missingFields)
        ]);
        exit();
    }

    // Extract and sanitize data
    $name = trim($data['name']);
    $email = trim($data['email']);
    $phone = isset($data['phone']) ? trim($data['phone']) : '';
    $message = trim($data['message']);

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid email address format']);
        exit();
    }

    // Validate field lengths
    if (strlen($name) > 100) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Name is too long (max 100 characters)']);
        exit();
    }

    if (strlen($message) > 5000) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Message is too long (max 5000 characters)']);
        exit();
    }

    // Get OAuth access token
    $accessToken = getAccessToken();
    
    if (!$accessToken) {
        http_response_code(401);
        echo json_encode(['success' => false, 'error' => 'Authentication failed']);
        exit();
    }

    // Send email via Graph API
    $result = sendEmailViaGraph($accessToken, $name, $email, $phone, $message);

    if ($result['success']) {
        http_response_code(200);
        echo json_encode($result);
    } else {
        http_response_code(500);
        echo json_encode($result);
    }

} catch (Exception $e) {
    error_log("Contact form error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'An unexpected error occurred']);
}
?>
