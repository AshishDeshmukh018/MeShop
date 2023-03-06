

const form = document.getElementById('login-form');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  // Get the input values
  const email = form.email.value;
  const password = form.password.value;

  // Check if the email and password are correct
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    // Generate a token for the user
    const token = generateToken();

    // Store the token in local storage
    localStorage.setItem('token', token);

    // Redirect the user to the home page
    window.location.href = 'shop.html';
  } else {
    alert('Incorrect email or password');
  }
});

// Generate a random 16-byte token
function generateToken() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';

  for (let i = 0; i < 16; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return token;
}
