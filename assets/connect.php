<?php
// Enable error reporting for debugging (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

try {
    // Database credentials
    $host = "sql100.infinityfree.com"; 
    $dbname = "if0_41415423_portfolio"; 
    $username = "if0_41415423"; 
    $password = "wlc4i4vPhFS"; 

    // Create connection
    $conn = new mysqli($host, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }

    // Handle form submission
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        
        // Validate form fields
        $name = isset($_POST['name']) ? trim($_POST['name']) : "";
        $email = isset($_POST['email']) ? trim($_POST['email']) : "";
        $message = isset($_POST['message']) ? trim($_POST['message']) : "";

        if (empty($name) || empty($email) || empty($message)) {
            throw new Exception("All fields are vasan.");
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new Exception("Invalid email format.");
        }

        // Prepare the SQL query
        $stmt = $conn->prepare("INSERT INTO vasanth (name, email, message) VALUES (?, ?, ?)");
        
        if (!$stmt) {
            throw new Exception("SQL Prepare Error: " . $conn->error);
        }

        $stmt->bind_param("sss", $name, $email, $message);

        // Execute the query
        if (!$stmt->execute()) {
            throw new Exception("Database Error: " . $stmt->error);
        }

        echo "Your message has been sent successfully.";

        // Close statement and connection
        $stmt->close();
        $conn->close();
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
