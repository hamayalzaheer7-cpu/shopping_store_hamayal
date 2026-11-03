// Gets saved products from LocalStorage
// If no products exist, adds these default products
var products = JSON.parse(localStorage.getItem("products")) || [

  {
    id: 1,
    name: "Everyday Sneakers",
    price: 2500,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    description: "Comfortable shoes for everyday use."
  },

  {
    id: 2,
    name: "Classic Handbag",
    price: 1800,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500",
    description: "A simple bag for your daily essentials."
  },

  {
    id: 3,
    name: "Wrist Watch",
    price: 2200,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    description: "A clean and timeless everyday watch."
  }

];

// Saves the default products in LocalStorage
localStorage.setItem("products", JSON.stringify(products));


// Displays all products on the home page
function showProducts() {

  // Gets the element where products will appear
  var area = document.getElementById("productList");

  // Stops the function if the product section does not exist
  if (!area) return;

  // Gets the latest products from LocalStorage
  products = JSON.parse(localStorage.getItem("products")) || [];

  // Clears the previous product display
  area.innerHTML = "";

  // Goes through each product in the array
  products.forEach(function(product) {

    // Displays each product using HTML
    area.innerHTML += `
      <div class="card">

        <img src="${product.image}" alt="${product.name}">

        <div class="card-body">

          <h3>${product.name}</h3>

          <p class="small">${product.description || ""}</p>

          <p class="price">Rs. ${product.price}</p>

          <!-- Calls addToCart with the product ID -->
          <button onclick="addToCart(${product.id})">
            Add to cart
          </button>

        </div>
      </div>`;
  });
}


// Adds a selected product to the user's cart
function addToCart(id) {

  // Checks if the user is logged in
  if (!requireLogin()) return;

  // Gets all products from LocalStorage
  var allProducts = JSON.parse(localStorage.getItem("products")) || [];

  // Finds the selected product using its ID
  var product = allProducts.find(function(item) {
    return item.id === id;
  });

  // Gets the current user's cart
  var cart = getUserCart();

  // Checks if the product already exists in the cart
  var found = cart.find(function(item) {
    return item.id === id;
  });

  // If product already exists, increases its quantity
  if (found) {
    found.quantity++;
  }

  // Otherwise, adds the product with quantity 1
  else {
    cart.push({...product, quantity: 1});
  }

  // Saves the updated cart in LocalStorage
  saveUserCart(cart);

  // Shows a success message
  alert("Product added to your cart.");
}


// Calls the function to display products
showProducts();