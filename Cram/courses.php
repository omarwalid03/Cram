<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home Page</title>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" />
    <link rel="stylesheet" href="styles.css">
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
</head>

<body>
    <!-- Navigation Part -->
    <nav>
        <img src="images/logo.png" alt="logo">
        <div class="navigation">
            <ul>
                <i id="menu-close" class="fas fa-times"></i>
                <li><a href="home.php">Home</a></li>
                <li><a href="about.php">About</a></li>
                <li><a href="blog.php">Blog</a></li>
                <li><a class="active" href="courses.php">Courses</a></li>
                <li><a href="contact.php">Contact</a></li>
                <li class="hide">Login</li>
                <li class="hide">Signup</li>
                <li><button class="login">Login</button></li>
                <li><button class="signup">Signup</button></li>
            </ul>
            <img id="menu-btn" src="images/menu.png" alt="">
        </div>
    </nav>

    <!-- Home -->
    <section id="about-home">
        <h2>Courses</h2>
    </section>

    <section id="course">
        <h1>Our Popular Courses</h1>
        <p>Replenish man have thing gathering lights yielding shall you</p>
        <div class="course-box">

        <?php
        $host = "localhost";
        $username = "root";
        $password = "";
        $dbname = "Socially";
        $port = "3308";

        $conn = new mysqli($host, $username, $password, $dbname, $port);

        $stmt = $conn->prepare("SELECT * FROM courses");

        $result = $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            while ($courses = $result->fetch_assoc()) {
                echo '<div onclick="window.location.href=\'details.php\';" class="courses">
                        <img src="' . $courses['C_Image'] . '" alt="">
                        <div class="details">
                            <span>Updated 21/8/21</span>
                            <h6>' . $courses['C_Name'] . '</h6>
                            <div class="star">';
                
                for ($i = 0; $i < $courses['Rating']; $i++) {
                    if ($courses['Rating'] - $i == 0.5) {
                        echo '<i class="fas fa-star-half-alt"></i>';
                    } else {
                        echo '<i class="fas fa-star"></i>';
                    }
                }
                
                echo '</div>
                        </div>
                        <div class="cost">
                            '.$courses['Price'].'
                        </div>
                    </div>';
            }
        }

        $stmt->close();
        $conn->close();
        ?>



    </section>


    <Footer>
        <div class="footer-col">
            <h3>Top Products</h3>
            <li>Mange Reputation</li>
            <li>Power Tools</li>
            <li>Managed Website</li>
            <li>Marketing Service</li>
        </div>

        <div class="footer-col">
            <h3>Top Products</h3>
            <li>Mange Reputation</li>
            <li>Power Tools</li>
            <li>Managed Website</li>
            <li>Marketing Service</li>
        </div>

        <div class="footer-col">
            <h3>Top Products</h3>
            <li>Mange Reputation</li>
            <li>Power Tools</li>
            <li>Managed Website</li>
            <li>Marketing Service</li>
        </div>

        <div class="footer-col">
            <h3>Top Products</h3>
            <li>Mange Reputation</li>
            <li>Power Tools</li>
            <li>Managed Website</li>
            <li>Marketing Service</li>
        </div>


        <div class="footer-col">
            <h3>Newsletter</h3>
            <p>subscribe to recive our latest news and offers</p>
            <div class="subscribe">
                <input type="text" placeholder="Your Email address">
                <a href="#" class="yellow">SUBSCRIBE</a>
            </div>
        </div>

        <div class="copyright">
            <p>Copyright @2023 All rights reserved | This template is made by our CRAM team</p>
            <div class="pro-links">
                <i class="fab fa-facebook-f"></i>
                <i class="fab fa-instagram"></i>
                <i class="fab fa-linkedin-in"></i>
            </div>
        </div>
    </Footer>

    <script>
        $('#menu-btn').click(function () {
            $('nav .navigation ul').addClass('active')
        });
        $('#menu-close').click(function () {
            $('nav .navigation ul').removeClass('active')
        });

        $('.login').click(function(){
            window.location.href="login.html";
        });
        $('.signup').click(function(){
            window.location.href="signup.html";
        });
    </script>

</body>

</html>