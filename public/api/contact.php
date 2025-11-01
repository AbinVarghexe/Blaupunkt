<?php
// Enable error logging
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

try {
    // Handle preflight OPTIONS request
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['success' => false, 'error' => 'Method not allowed']);
        exit();
    }

    // Get JSON input
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    // Validate input
    if (!isset($data['name']) || !isset($data['email']) || !isset($data['message'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Missing required fields']);
        exit();
    }

    $name = htmlspecialchars($data['name']);
    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $phone = isset($data['phone']) ? htmlspecialchars($data['phone']) : 'Not provided';
    $message = htmlspecialchars($data['message']);

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid email address']);
        exit();
    }

    // Check if mail function is available
    if (!function_exists('mail')) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Email functionality not available']);
        exit();
    }

    // Email configuration
    $to = 'info@blaupunkt-ev.com';
    $subject = "New Contact Form Submission from $name";

    // Email body (HTML) - Using heredoc to avoid quote escaping issues
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

    // Email headers
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: noreply@blaupunkt-ev.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        http_response_code(200);
        echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to send email']);
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
