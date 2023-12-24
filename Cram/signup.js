// Signup.js

function signup() {
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var dob = document.getElementById('dob').value;
    var gender = document.getElementById('gender').value;

    var data = 'firstName=' + encodeURIComponent(firstName)
        + '&lastName=' + encodeURIComponent(lastName)
        + '&email=' + encodeURIComponent(email)
        + '&password=' + encodeURIComponent(password)
        + '&dob=' + encodeURIComponent(dob)
        + '&gender=' + encodeURIComponent(gender);

    // Assuming you have a PHP file named "signup.php" to handle the signup process
    var url = 'signup.php';

    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var response = xhr.responseText;

                if (response === 'success') {
                    alert('Sign up successful! Please check your email for verification.');
                    window.location.href = "verification.html";
                } else {
                    alert('Sign up failed. Please try again.');
                }
            } else {
                console.log('HTTP status:', xhr.status);
                alert('Error during sign up. Please try again later.');
            }
        }
    };

    xhr.send(data);

    return false;
}



function sendOTP(){
    const email = document.getElementById('email');
    const otpverify = document.getElementsByClassName('otpverify')[0];

    let otp_val = Math.floor(Math.random()*10000);

    let emailbody = `
        <h1>Welcome to Cram</h1> <br>
        <h2>Your OTP is </h2>${otp_val}
    `;

    Email.send({
        SecureToken : "7e59ec99-972c-4e6f-af9b-13b6b065fc7c",
        To : email.value,
        From : "craamm4485@gmail.com",
        Subject : "Verification",
        Body : emailbody
    }).then(
        //if success it returns "OK";
      message => {
        if(message === "OK"){
            alert("OTP sent to your email "+email.value);

            // now making otp input visible
            otpverify.style.display = "block";
            const otp_inp = document.getElementById('otp_inp');
            const otp_btn = document.getElementById('otp-btn');

            otp_btn.addEventListener('click',()=>{
                // now check whether sent email is valid
                if(otp_inp.value == otp_val){
                    alert("Email address verified...");
                    window.location.href = "login.html";
                }
                else{
                    alert("Invalid OTP");
                }
            })
        }
      }
    );

}