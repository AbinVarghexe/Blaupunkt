<?php
// Enable error logging
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/contact_errors.log');

// Log script start
error_log("=== Contact form script started at " . date('Y-m-d H:i:s') . " ===");

try {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Content-Type: application/json');

    error_log("Headers set successfully");

    // Handle preflight OPTIONS request
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        error_log("OPTIONS request received");
        http_response_code(200);
        exit();
    }

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        error_log("Invalid method: " . $_SERVER['REQUEST_METHOD']);
        http_response_code(405);
        echo json_encode(['success' => false, 'error' => 'Method not allowed']);
        exit();
    }

    error_log("POST request received");

    // Get JSON input
    $input = file_get_contents('php://input');
    error_log("Raw input: " . $input);
    
    $data = json_decode($input, true);
    error_log("Decoded data: " . print_r($data, true));

    // Validate input
    if (!isset($data['name']) || !isset($data['email']) || !isset($data['message'])) {
        error_log("Missing fields - name: " . (isset($data['name']) ? 'yes' : 'no') . ", email: " . (isset($data['email']) ? 'yes' : 'no') . ", message: " . (isset($data['message']) ? 'yes' : 'no'));
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Missing required fields']);
        exit();
    }

    $name = htmlspecialchars($data['name']);
    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $phone = isset($data['phone']) ? htmlspecialchars($data['phone']) : 'Not provided';
    $message = htmlspecialchars($data['message']);

    error_log("Sanitized - name: $name, email: $email, phone: $phone");

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        error_log("Invalid email format: $email");
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid email address']);
        exit();
    }

    // Check if mail function exists
    if (!function_exists('mail')) {
        error_log("mail() function is not available");
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Email functionality not available on server']);
        exit();
    }

    // Email configuration
    $to = 'info@blaupunkt-ev.com';
    $subject = "New Contact Form Submission from $name";

    error_log("Preparing to send email to: $to");

    // Simple text body for testing
    $body = "New contact form submission:\n\n";
    $body .= "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Phone: $phone\n";
    $body .= "Message: $message\n";
    $body .= "\n---\n";
    $body .= "Submitted at: " . date('Y-m-d H:i:s') . "\n";

    // Simple headers
    $headers = "From: noreply@blaupunkt-ev.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    error_log("Email details - To: $to, Subject: $subject");
    error_log("Attempting to send email...");

    // Send email
    $mailResult = mail($to, $subject, $body, $headers);
    
    if ($mailResult) {
        error_log("✓ Email sent successfully");
        http_response_code(200);
        echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
    } else {
        error_log("✗ mail() function returned false");
        error_log("Last error: " . error_get_last()['message']);
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to send email. Please try again or contact us directly.']);
    }

    error_log("=== Contact form script completed ===\n");

} catch (Exception $e) {
    error_log("EXCEPTION: " . $e->getMessage());
    error_log("Stack trace: " . $e->getTraceAsString());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Server error occurred']);
} catch (Error $e) {
    error_log("ERROR: " . $e->getMessage());
    error_log("Stack trace: " . $e->getTraceAsString());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Server error occurred']);
}
?>
