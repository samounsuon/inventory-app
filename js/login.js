document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
  
    // Get the email and password values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Check if both fields are filled
    if (email && password) {
      // Store the email and password in localStorage
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userPassword', password);
  
      // Redirect to the next page (e.g., dashboard.html)
      window.location.href = '/page/home.html'; // Change to the desired page
    } else {
      // If fields are empty, show an alert
      alert('Please fill out both the email and password fields.');
    }
  });