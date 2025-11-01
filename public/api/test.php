<?php
header('Content-Type: application/json');
echo json_encode([
    'status' => 'working',
    'message' => 'Test file uploaded successfully',
    'timestamp' => date('Y-m-d H:i:s'),
    'php_version' => phpversion()
]);
?>
