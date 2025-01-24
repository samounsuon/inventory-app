
const dataSignup = localStorage.getItem("users");

document.getElementById('login-form').addEventListener('submit', function (event) {
  event.preventDefault(); 
  const email = document.getElementById('email').value.trim(); 
  const password = document.getElementById('password').value.trim(); 


  if (dataSignup) {
    const users = JSON.parse(dataSignup); 

    let loginSuccess = false;

    users.forEach(user => {
      if (user.email === email && user.password === password) {
        loginSuccess = true; 
      }
    });

    if (loginSuccess) {
      window.location.href = '/page/home.html';
    } else {

      alert('Invalid email or password. Please try again.');
    }
  } else {

    alert('No accounts found. Please sign up first.');
  }
});
