// Get the cart items from localStorage
const cart = JSON.parse(localStorage.getItem('cartItems')) || [];

// Function to display the cart items
function displayCart() {
const cartList = document.querySelector('#cart');

// Clear the existing cart items
cartList.innerHTML = '';

// Loop through the cart items and display them in a list
cart.forEach(product => {
const productDiv = document.createElement("div");
productDiv.classList.add("product");

const productImage = document.createElement("img");
productImage.classList.add("product-image");
productImage.src = product.image;

const productName = document.createElement("p");
productName.classList.add("product-name");
productName.textContent = product.title;

const productPrice = document.createElement("p");
productPrice.classList.add("product-price");
productPrice.textContent = `Price: $${product.price}`;

const productQuantity = document.createElement("p");
productQuantity.classList.add("product-quantity");
productQuantity.textContent = `Quantity: ${product.quantity}`;

const productRating = document.createElement("p");
productRating.classList.add("product-rating");
productRating.textContent = `Rating: ${product.rating.rate}`;

const productCard = document.createElement("div");
productCard.classList.add("product-card");

function removeFromCartBtn(product) {
  // Find the index of the product in the cart
  const index = cart.findIndex((p) => p.id === product.id);

  // Remove the product from the cart
  cart.splice(index, 1);

  // Update the cart in localStorage
  localStorage.setItem('cartItems', JSON.stringify(cart));

  // Refresh the cart display
  displayCart();
}

// create a button element
const removeFromCartBtnEl = document.createElement("button");
removeFromCartBtnEl.innerText = "Remove From Cart";

// Add click event listener to button
removeFromCartBtnEl.addEventListener("click", function () {
  removeFromCartBtn(product);
});

productDiv.appendChild(productImage);
productDiv.appendChild(productName);
productDiv.appendChild(productPrice);
productDiv.appendChild(productQuantity);
productDiv.appendChild(productRating);
productDiv.appendChild(removeFromCartBtnEl);
productCard.appendChild(productDiv);
cartList.appendChild(productCard);
});
}

// Display the initial cart items
displayCart();

// Attach a click event listener to the checkout button
const checkoutBtn = document.querySelector('#checkout-btn');
checkoutBtn.addEventListener('click', function () {
checkout();
});

// Function to display the checkout summary
// Function to display the checkout summary
function checkout() {
  const cartList = document.querySelector('#cart');

  let totalCost = 0;
  let totalQuantity = 0;

  // Calculate the total cost and quantity of items in the cart
  cart.forEach(product => {
    totalCost += product.price * product.quantity;
    totalQuantity += product.quantity;
  });

  // Display the checkout summary
  cartList.innerHTML = `You have ${totalQuantity} items in your cart, with a total cost of $${totalCost.toFixed(2)}. Thank you for shopping with us!`;

  // Remove the checkout button
  const checkoutBtn = document.querySelector('#checkout-btn');
  checkoutBtn.remove();

  // Redirect the user to the shop page after 3 seconds
  setTimeout(() => {
    window.location.href = 'shop.html';
  }, 5000);
}







