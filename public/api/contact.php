<?php
/**
 * Contact Form API Endpoint - Office 365 SMTP Version
 * 
 * This PHP script handles contact form submissions from the React frontend.
 * It validates the input, sanitizes data, and sends an email via Office 365 SMTP.
 * 
 * REQUIREMENTS:
 *   - PHPMailer library (install via Composer or manually)
 *   - Valid Office 365 email account credentials
 *   - SMTP access enabled on Office 365 account
 * 
 * INSTALLATION:
 *   Option 1 (Composer): composer require phpmailer/phpmailer
 *   Option 2 (Manual): Download from https://github.com/PHPMailer/PHPMailer
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
 *   405 - Method Not Allowed (not POST)
 *   500 - Internal Server Error (email sending failed)
 */

// Import PHPMailer classes
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Load PHPMailer (adjust path based on your installation)
// Option 1: If using Composer
// require 'vendor/autoload.php';

// Option 2: Manual installation (uncomment and adjust paths)
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// Enable error logging for debugging (errors logged to server error log)
error_reporting(E_ALL);
ini_set('display_errors', 0);  // Don't display errors to user (security)
ini_set('log_errors', 1);       // Log errors to server log file

// CORS Headers: Allow cross-origin requests from any domain
// IMPORTANT: In production, replace * with your actual domain for security
// Example: header('Access-Control-Allow-Origin: https://yourdomain.com');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');  // Always return JSON responses

try {
    // Handle preflight OPTIONS request (CORS check from browser)
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

    // Step 1: Read and parse JSON input from request body
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    // Step 2: Log received data for debugging (check server error logs)
    error_log("Received contact form data: " . print_r($data, true));

    // Step 3: Check if JSON parsing was successful
    if (json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid JSON: ' . json_last_error_msg()]);
        exit();
    }

    // Step 4: Validate required fields with specific error messages
    // Check 'name' field
    if (!isset($data['name']) || empty(trim($data['name']))) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Missing required field: name']);
        exit();
    }

    // Check 'email' field
    if (!isset($data['email']) || empty(trim($data['email']))) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Missing required field: email']);
        exit();
    }

    // Check 'message' field
    if (!isset($data['message']) || empty(trim($data['message']))) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Missing required field: message']);
        exit();
    }

    // Step 5: Sanitize input data to prevent XSS attacks
    $name = htmlspecialchars($data['name']);        // Remove HTML/JavaScript tags
    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);  // Sanitize email
    $phone = isset($data['phone']) ? htmlspecialchars($data['phone']) : 'Not provided';
    $message = htmlspecialchars($data['message']);

    // Step 6: Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid email address']);
        exit();
    }

    // Step 7: Prepare email content
    $subject = "New Contact Form Submission from $name";

    // Email body (HTML) - Using heredoc to avoid quote escaping issues
    $body = <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            background: #f5f5f5;
            padding: 40px 20px;
        }
        
        .email-wrapper {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
            border: 1px solid #e5e5e5;
        }
        
        .header {
            background: #000000;
            padding: 40px 30px;
            text-align: center;
            border-bottom: 3px solid #60a5fa;
        }
        
        .header h1 {
            color: #ffffff;
            font-size: 28px;
            font-weight: 600;
            letter-spacing: -0.5px;
            margin-bottom: 8px;
        }
        
        .header p {
            color: #a3a3a3;
            font-size: 14px;
            font-weight: 400;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .field {
            margin-bottom: 28px;
            padding-bottom: 28px;
            border-bottom: 1px solid #f0f0f0;
        }
        
        .field:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
        }
        
        .label {
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #737373;
            margin-bottom: 8px;
        }
        
        .value {
            font-size: 16px;
            color: #000000;
            word-wrap: break-word;
        }
        
        .value.email {
            color: #60a5fa;
            text-decoration: none;
        }
        
        .value.phone {
            color: #60a5fa;
            text-decoration: none;
        }
        
        .value.message {
            background: #fafafa;
            padding: 16px;
            border-radius: 8px;
            border-left: 3px solid #60a5fa;
            white-space: pre-wrap;
        }
        
        .footer {
            background: #fafafa;
            padding: 24px 30px;
            text-align: center;
            border-top: 1px solid #e5e5e5;
        }
        
        .footer p {
            font-size: 13px;
            color: #737373;
            margin: 0;
        }
        
        .brand {
            color: #000000;
            font-weight: 600;
        }
        
        @media only screen and (max-width: 600px) {
            body {
                padding: 10px;
                background: #ffffff;
            }
            
            .email-wrapper {
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            }
            
            .header {
                padding: 24px 20px;
            }
            
            .header h1 {
                font-size: 22px;
                line-height: 1.3;
            }
            
            .header p {
                font-size: 13px;
            }
            
            .content {
                padding: 24px 20px;
            }
            
            .field {
                margin-bottom: 20px;
                padding-bottom: 20px;
            }
            
            .label {
                font-size: 11px;
                margin-bottom: 6px;
            }
            
            .value {
                font-size: 15px;
                line-height: 1.5;
            }
            
            .value.message {
                font-size: 14px;
                padding: 12px;
                line-height: 1.6;
            }
            
            .footer {
                padding: 20px 16px;
            }
            
            .footer p {
                font-size: 12px;
                line-height: 1.5;
            }
        }
        
        /* Extra small devices (phones in portrait) */
        @media only screen and (max-width: 400px) {
            .header {
                padding: 20px 16px;
            }
            
            .header h1 {
                font-size: 20px;
            }
            
            .content {
                padding: 20px 16px;
            }
            
            .value {
                font-size: 14px;
            }
            
            .value.message {
                font-size: 13px;
                padding: 10px;
            }
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
                <div class="value">$name</div>
            </div>
            
            <div class="field">
                <div class="label">Email Address</div>
                <div class="value email">$email</div>
            </div>
            
            <div class="field">
                <div class="label">Phone Number</div>
                <div class="value phone">$phone</div>
            </div>
            
            <div class="field">
                <div class="label">Message</div>
                <div class="value message">$message</div>
            </div>
        </div>
        
        <div class="footer">
            <p>This email was sent from <span class="brand">Blaupunkt EV</span> contact form</p>
        </div>
    </div>
</body>
</html>
HTML;

    // Step 8: Configure and send email via Office 365 SMTP
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->SMTPDebug = 0;                      // Set to 2 for detailed debug output
        $mail->isSMTP();                           // Send using SMTP
        $mail->Host       = 'smtp.office365.com';  // Office 365 SMTP server
        $mail->SMTPAuth   = true;                  // Enable SMTP authentication
        $mail->Username   = 'noreply@blaupunkt-ev.com';  // IMPORTANT: Change to your Office 365 email
        $mail->Password   = 'YOUR_EMAIL_PASSWORD';       // IMPORTANT: Change to your email password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;  // Enable TLS encryption
        $mail->Port       = 587;                   // TCP port for TLS

        // Recipients
        $mail->setFrom('noreply@blaupunkt-ev.com', 'Blaupunkt EV Contact Form');
        $mail->addAddress('info@blaupunkt-ev.com', 'Blaupunkt EV Team');  // Main recipient
        $mail->addReplyTo($email, $name);          // User's email for replies

        // Content
        $mail->isHTML(true);                       // Set email format to HTML
        $mail->Subject = $subject;
        $mail->Body    = $body;
        $mail->AltBody = strip_tags($body);        // Plain text version for non-HTML clients

        // Send email
        $mail->send();
        
        // Success response
        http_response_code(200);
        echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
        
    } catch (Exception $e) {
        // Log the actual error for debugging
        error_log("PHPMailer Error: {$mail->ErrorInfo}");
        error_log("Exception Message: " . $e->getMessage());
        
        // User-friendly error response (don't expose SMTP credentials)
        http_response_code(500);
        echo json_encode([
            'success' => false, 
            'error' => 'Failed to send email. Please try again later or contact us directly.'
        ]);
    }

} catch (Exception $e) {
    error_log("Contact form error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Server error occurred']);
} catch (Error $e) {
    error_log("Contact form error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Server error occurred']);
}
?>
