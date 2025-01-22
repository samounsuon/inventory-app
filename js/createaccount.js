
// Get references to HTML elements
const submitButton = document.getElementById("submit");
const firstNameInput = document.getElementById("firstname");
const lastNameInput = document.getElementById("lastname");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// Add event listener to the "Create" button
submitButton.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent the form's default submission behavior

  // Get user input values
  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // Validate inputs
  if (!firstName || !lastName || !email || !password) {
    Swal.fire({
      icon: "error",
      title: "Complete your information",
      text: "Please fill in all fields!",
    });
    return;
  }

  // Check if the user already exists in localStorage
  const existingData = localStorage.getItem("userData");
  if (existingData) {
    const storedUser = JSON.parse(existingData);
    if (storedUser.email === email) {
      Swal.fire({
        icon: "warning",
        title: "Account Exists",
        text: "An account with this email already exists. Please use a different email.",
      });
      return;
    }
  }

  // Create a user object
  const userData = {
    firstName,
    lastName,
    email,
    password, // Note: Avoid storing passwords in plain text in real applications
  };

  // Store user data in local storage
  localStorage.setItem("userData", JSON.stringify(userData));

  // Show success message
  Swal.fire({
    icon: "success",
    title: "Account Created",
    text: `Welcome, ${firstName} ${lastName}!`,
  });
  
  firstNameInput.value = "";
  lastNameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";

  // Redirect to the login page
  setTimeout(() => {
    window.location.href = "./page/home.html";
  }, 2000);
});