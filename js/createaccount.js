const form = document.querySelector('form');
const firstNameInput = document.getElementById('firstname');
const lastNameInput = document.getElementById('lastname');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');


form.addEventListener('submit', function (e) {

  e.preventDefault();


  const userData = {
    firstName: firstNameInput.value.trim(),
    lastName: lastNameInput.value.trim(),
    email: emailInput.value.trim(),
    password: passwordInput.value.trim()
  };

  if (!userData.firstName || !userData.lastName || !userData.email || !userData.password) {
    Swal.fire({
      icon: 'error',
      title: 'Incomplete Form!',
      html: '<div style="padding: 10px; border-radius: 15px; background-color: #f8d7da; color: #721c24;">' +
            '<strong>Oh no!</strong> Please fill out all fields before submitting.' +
            '</div>',
      confirmButtonText: 'Retry',
      confirmButtonColor: '#d33', 
      background: '#ffe6e6', 
      customClass: {
        popup: 'rounded-popup' 
      }
    });
    return;
  }

  let users = JSON.parse(localStorage.getItem('users')) || [];
  users.push(userData);
  localStorage.setItem('users', JSON.stringify(users));

  Swal.fire({
    icon: 'success',
    title: 'Account Created!',
    html: '<div style="padding: 10px; border-radius: 15px; background-color: #d4edda; color: #155724;">' +
          'Your account has been created successfully.' +
          '</div>',
    confirmButtonText: 'Go to Home',
    confirmButtonColor: '#28a745', 
    background: '#e9f7ef', 
    customClass: {
      popup: 'rounded-popup'
    }
  }).then(() => {
 
    window.location.href = './home.html'; 
  });


  firstNameInput.value = '';
  lastNameInput.value = '';
  emailInput.value = '';
  passwordInput.value = '';
});

const style = document.createElement('style');
style.textContent = `
  .swal2-popup.rounded-popup {
    border-radius: 20px !important; /* Rounded edges for alert box */
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); /* Shadow for 3D effect */
  }
`;
document.head.appendChild(style);
