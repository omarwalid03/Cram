<!-- Signup.php -->

<?php

function calculateAge($dob) {
    $today = new DateTime();
    $birthdate = new DateTime($dob);
    $age = $today->diff($birthdate)->y;
    return $age;
}

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

    // Retrieve user input from the AJAX request
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $dob = $_POST['dob'];
    $gender = $_POST['gender'];
    $age = calculateAge($dob);

    // Generate a random verification code
    $verificationCode = mt_rand(100000, 999999);

    // Perform validation and registration logic
    $stmt = $conn->prepare("INSERT INTO users (First_Name, Last_Name, Email, Password, DOB, Age, Gender, Verification_Code) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssss", $firstName, $lastName, $email, $password, $dob, $age, $gender, $verificationCode);
    
    if ($stmt->execute()) {
        // Registration successful, now send the verification email
        $subject = 'Verification Code for Socially Signup';
        $message = 'Your verification code is: ' . $verificationCode;

        // Replace the following line with actual email sending code
        mail($email, $subject, $message);
        echo "success";
        header("location: g.html");
    } else {
        echo "failure";
    }
    
    $stmt->close();
    $conn->close();
} else {
    http_response_code(405);
    echo "Method Not Allowed";
}
?>
