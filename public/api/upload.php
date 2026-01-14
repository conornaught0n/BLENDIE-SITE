<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Simple Token Auth
$secret_key = 'blendie-agent-secret-2026';
$headers = getallheaders();
$auth_header = isset($headers['Authorization']) ? $headers['Authorization'] : '';

if ($auth_header !== "Bearer $secret_key") {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['file'])) {
        $target_dir = "../uploads/";
        $file_name = basename($_FILES["file"]["name"]);
        $target_file = $target_dir . $file_name;
        
        // Basic validation
        $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
        if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "json" && $imageFileType != "csv") {
             echo json_encode(['error' => 'Invalid file type']);
             exit;
        }

        if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
            echo json_encode([
                'success' => true, 
                'url' => 'https://' . $_SERVER['HTTP_HOST'] . '/uploads/' . $file_name
            ]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Upload failed']);
        }
    } else {
        // Handle JSON Data Posting
        $input = file_get_contents('php://input');
        if ($input) {
            $data = json_decode($input, true);
            $filename = 'data_' . time() . '.json';
            file_put_contents("../uploads/" . $filename, json_encode($data, JSON_PRETTY_PRINT));
            echo json_encode([
                'success' => true, 
                'url' => 'https://' . $_SERVER['HTTP_HOST'] . '/uploads/' . $filename
            ]);
        } else {
            echo json_encode(['error' => 'No file or data provided']);
        }
    }
} else {
    echo json_encode(['status' => 'Blendie Upload API Ready']);
}
?>
