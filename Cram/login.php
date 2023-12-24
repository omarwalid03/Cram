<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Connect to your PHPMyAdmin database
    $host = "localhost";
    $username = "root";
    $password = "";
    $dbname = "Socially";
    $port = "3308";

    $conn = new mysqli($host, $username, $password, $dbname, $port);
    
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Retrieve user input from the form
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Perform validation and login logic
    $stmt = $conn->prepare("SELECT * FROM users WHERE Email = ? AND Password = ?");
    $stmt->bind_param("ss", $email, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        // Login successful
        $_SESSION['email'] = $email;
        header("location:home2.php");
    } else {
        // Login failed
        $response = ['status' => 'failure', 'message' => 'Password or email is incorrect. Try again.'];
    }

    // Close resources
    $stmt->close();
    $conn->close();

    // Send the JSON response
    header('Content-Type: application/json');
    echo json_encode($response);
    exit();
}
?>