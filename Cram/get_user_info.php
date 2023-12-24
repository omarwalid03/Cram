<?php
session_start();

// Check if the user is logged in
if (isset($_SESSION['email'])) {
    // Connect to your database and retrieve user information
    $host = "localhost";
    $username = "root";
    $password = "";
    $dbname = "Socially";

    $conn = new mysqli($host, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $email = $_SESSION['email'];

    $stmt = $conn->prepare("SELECT FirstName, LastName FROM users WHERE Email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->bind_result($firstName, $lastName);
    $stmt->fetch();
    $stmt->close();
    $conn->close();

    // Send user information as JSON
    echo json_encode(['firstName' => $firstName, 'lastName' => $lastName]);
} else {
    // Redirect to login page if not logged in
    header("location: login.html");
    exit();
}
?>
