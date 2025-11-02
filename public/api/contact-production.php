<?php
// Hostinger Production Contact Form Handler
// Simplified and optimized for LiteSpeed server

// Enable error logging (errors go to server logs, not displayed)
error_reporting(E_ALL);
ini_set('display_errors', '0');
ini_set('log_errors', '1');

// Set CORS headers FIRST - before any other output
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=UTF-8');

// Handle OPTIONS preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'error' => 'Method not allowed. Use POST.'
    ]);
    exit(0);
}

try {
    // Read and decode JSON input
    $rawInput = file_get_contents('php://input');
    
    if (empty($rawInput)) {
        throw new Exception('Empty request body');
    }
    
    $data = json_decode($rawInput, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Invalid JSON: ' . json_last_error_msg());
    }
    
    // Validate required fields (phone is optional)
    $requiredFields = ['name', 'email', 'message'];
    foreach ($requiredFields as $field) {
        if (empty($data[$field])) {
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'error' => "Missing required field: {$field}"
            ]);
            exit(0);
        }
    }
    
    // Sanitize inputs
    $name = htmlspecialchars(trim($data['name']), ENT_QUOTES, 'UTF-8');
    $email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
    $phone = isset($data['phone']) && !empty($data['phone']) 
        ? htmlspecialchars(trim($data['phone']), ENT_QUOTES, 'UTF-8')
        : 'Not provided';
    $message = htmlspecialchars(trim($data['message']), ENT_QUOTES, 'UTF-8');
    
    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Invalid email address format'
        ]);
        exit(0);
    }
    
    // Prepare email
    $to = 'info@blaupunkt-ev.com';
    $subject = "New Contact Form Submission from {$name}";
    
    // HTML email body using heredoc
    $body = <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * {margin: 0; padding: 0; box-sizing: border-box;}
        body {font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; line-height: 1.6; background: #f5f5f5; padding: 40px 20px;}
        .email-wrapper {max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08); border: 1px solid #e5e5e5;}
        .header {background: #000000; padding: 40px 30px; text-align: center; border-bottom: 3px solid #60a5fa;}
        .header h1 {color: #ffffff; font-size: 28px; font-weight: 600; margin-bottom: 8px;}
        .header p {color: #a3a3a3; font-size: 14px;}
        .content {padding: 40px 30px;}
        .field {margin-bottom: 28px; padding-bottom: 28px; border-bottom: 1px solid #f0f0f0;}
        .field:last-child {margin-bottom: 0; padding-bottom: 0; border-bottom: none;}
        .label {font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #737373; margin-bottom: 8px;}
        .value {font-size: 16px; color: #000000; word-wrap: break-word;}
        .value.email, .value.phone {color: #60a5fa; text-decoration: none;}
        .value.message {background: #fafafa; padding: 16px; border-radius: 8px; border-left: 3px solid #60a5fa; white-space: pre-wrap;}
        .footer {background: #fafafa; padding: 24px 30px; text-align: center; border-top: 1px solid #e5e5e5;}
        .footer p {font-size: 13px; color: #737373;}
        .brand {color: #000000; font-weight: 600;}
        @media only screen and (max-width: 600px) {
            body {padding: 10px;}
            .header {padding: 24px 20px;}
            .header h1 {font-size: 22px;}
            .content {padding: 24px 20px;}
            .field {margin-bottom: 20px; padding-bottom: 20px;}
            .value.message {font-size: 14px; padding: 12px;}
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <div class="header">
            <h1>New Contact Request</h1>
            <p>You have received a new message from your website</p>
        </div>
        <div class="content">
            <div class="field">
                <div class="label">Full Name</div>
                <div class="value">{$name}</div>
            </div>
            <div class="field">
                <div class="label">Email Address</div>
                <div class="value email">{$email}</div>
            </div>
            <div class="field">
                <div class="label">Phone Number</div>
                <div class="value phone">{$phone}</div>
            </div>
            <div class="field">
                <div class="label">Message</div>
                <div class="value message">{$message}</div>
            </div>
        </div>
        <div class="footer">
            <p>This email was sent from <span class="brand">Blaupunkt EV</span> contact form</p>
        </div>
    </div>
</body>
</html>
HTML;
    
    // Email headers
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: noreply@blaupunkt-ev.com\r\n";
    $headers .= "Reply-To: {$email}\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Send email
    $mailResult = @mail($to, $subject, $body, $headers);
    
    if ($mailResult) {
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Email sent successfully'
        ]);
        error_log("Contact form: Email sent successfully from {$email}");
    } else {
        throw new Exception('mail() function returned false');
    }
    
} catch (Exception $e) {
    error_log("Contact form error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Failed to send email. Please try again later.'
    ]);
} catch (Error $e) {
    error_log("Contact form fatal error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Server error occurred. Please try again later.'
    ]);
}
