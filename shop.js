let basket=[];
let products = [];

// Make a GET request to the Fake Store API endpoint
fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((data) => {
    products = data;

    // Render the products on the webpage
    const productList = document.getElementById("product-list");

    renderProducts(products, productList);

    // Add event listener for search input
    const searchInput = document.querySelector("input[type='text']");
    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.toLowerCase().trim();
      const filteredProducts = filterProductsBySearchTerm(products, searchTerm);
      renderProducts(filteredProducts, productList);
    });

    // Add event listener for price range filter checkboxes
    const priceRangeCheckboxes = document.querySelectorAll("input[name='prange']");
    priceRangeCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const minPrice = parseInt(checkbox.id.split("-")[0]);
        const maxPrice = checkbox.id.split("-")[1] ? parseInt(checkbox.id.split("-")[1]) : Infinity;
        const filteredProducts = filterProductsByPriceRange(products, minPrice, maxPrice);
        renderProducts(filteredProducts, productList);
      });
    });
  });

function renderProducts(products, productList) {
  productList.innerHTML = "";
  products.forEach((product) => {
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

    const productRating = document.createElement("p");
    productRating.classList.add("product-rating");
    productRating.textContent = `Rating: ${product.rating.rate}`;

    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    // create a button element
    const addToCartBtnEl = document.createElement("button");
    addToCartBtnEl.innerText = "Add to Cart";

    // Add click event listener to button
    addToCartBtnEl.addEventListener("click", function () {
      addToCartBtn(product);
    });

    productDiv.appendChild(productImage);
    productDiv.appendChild(productName);
    productDiv.appendChild(productPrice);
    productDiv.appendChild(productRating);
    productDiv.appendChild(addToCartBtnEl);
    productList.appendChild(productCard);
    productList.appendChild(productDiv);
  });
}

function addToCartBtn(product) {
  // Check if the product already exists in the cart
  const existingProduct = basket.find(item => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    product.quantity = 1;
    basket.push(product);
  }
  localStorage.setItem("cartItems", JSON.stringify(basket));
}

function filterProductsBySearchTerm(products, searchTerm) {
  return products.filter((product) => {
    return product.title.toLowerCase().includes(searchTerm);
  });
}

function filterProductsByPriceRange(products, minPrice, maxPrice) {
  return products.filter((product) => {
    return product.price >= minPrice && product.price <= maxPrice;
  });
}