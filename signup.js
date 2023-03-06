
const form = document.getElementById('signup-form');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  // Get the input values
  const firstName = form.firstName.value;
  const lastName = form.lastName.value;
  const email = form.email.value;
  const password = form.password.value;
  const confirmPassword = form.confirmPassword.value;

  // Check if the passwords match
  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  // Check if the user already exists
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const userExists = users.some(user => user.email === email);

  if (userExists) {
    alert('User already exists');
    return;
  }

  // Add the new user to the local storage
  users.push({ firstName, lastName, email, password });
  localStorage.setItem('users', JSON.stringify(users));

  // Redirect the user to the login page
  window.location.href = "login.html";
});
