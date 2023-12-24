<?php
session_start();

// Check if the user is logged in
if (isset($_SESSION['email'])) {
    // Connect to your database and retrieve user information
    $host = "localhost";
    $username = "root";
    $password = "";
    $dbname = "Socially";
    $port = "3308";

    $conn = new mysqli($host, $username, $password, $dbname, $port);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $email = $_SESSION['email'];

    $stmt = $conn->prepare ("SELECT First_Name, Last_Name FROM users WHERE Email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->bind_result($firstName, $lastName);
    $stmt->fetch();
    $stmt->close();
    $conn->close();

    // Send user information as JSON
    //echo json_encode(['firstName' => $firstName, 'lastName' => $lastName]);
} else {
    // Redirect to login page if not logged in
    header("Location: login.html"); // Replace with the correct login page URL
    exit();
}
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Techie</title>
    <link rel="stylesheet" href="style2.css" />
</head>

<body>
    <header class="header">
        <a class="logo-container" href="#">
            <div class="logo">
                <img src="book_1164651.png" alt="Logo"/>
            </div>
            <h2 class="logo-title">Techie</h2>
        </a>

        <nav class="nav">
            <a href="#" class="nav-button">Home</a>
            <a href="#" class="nav-button">About</a>
            <a href="#" class="nav-button">Blog</a>
            <a href="#" class="nav-button">Courses</a>
            <a href="#" class="nav-button">Contact</a>
        </nav>

        <div class="user-info-container">
            <h1>
                <?php
                echo "Welcome, " .$firstName. " ". $lastName. "";
                ?>
            </h1>
            
        </div>
    </header>

    <div class="hero">
        <div class="hero-content">
            <h1>----</h1>
            <p class="hero-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque placeat
                adipisci nam, alias obcaecati asperiores sunt quas excepturi
                blanditiis. Natus pariatur est dolorem tempore et architecto ullam rem
                at obcaecati!
            </p>
            <div class="button-container">
                <button class="button hero-button">Do Something</button>
                <button class="button hero-button">Do Another Thing</button>
            </div>
        </div>
    </div>

</body>

</html>
