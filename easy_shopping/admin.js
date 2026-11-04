// Set the demo admin password
var adminPassword = "admin123";

// Store the uploaded image temporarily
var uploadedImage = "";

// Check the admin password and log in
function adminLogin(e) {
  // Stop the form from refreshing the page
  e.preventDefault();

  // Get the password entered by the admin
  var pass = document.getElementById("adminPassword").value;

  // Check whether the password is correct
  if (pass === adminPassword) {
    // Save the admin login status for this browser session
    sessionStorage.setItem("adminLoggedIn", "yes");
    showAdmin();
  } else {
    // Show an error if the password is incorrect
    alert("Incorrect admin password.");
  }
}

// Show the admin dashboard if the admin is logged in
function showAdmin() {
  // Check the saved admin login status
  if (sessionStorage.getItem("adminLoggedIn") !== "yes") {
    document.getElementById("adminPanel").style.display = "none";
    return;
  }

  // Hide the login form and show the dashboard
  document.getElementById("adminLogin").style.display = "none";
  document.getElementById("adminPanel").style.display = "block";

  // Display products, orders, and customer messages
  showAdminProducts();
  showAdminOrders();
  showMessages();
}

// Display all products in the admin table
function showAdminProducts() {
  // Get the saved products from LocalStorage
  var products = JSON.parse(localStorage.getItem("products")) || [];

  // Show the number of products
  document.getElementById("productCount").innerText = products.length;

  // Get the table area and clear its previous content
  var area = document.getElementById("adminProducts");
  area.innerHTML = "";

  // Add each product to the table
  products.forEach(function(p) {
    area.innerHTML += `<tr>
      <td>${p.name}</td>
      <td>Rs. ${p.price}</td>
      <td>
        <button onclick="editProduct(${p.id})">Edit</button>
        <button class="btn-danger" onclick="deleteProduct(${p.id})">Delete</button>
      </td>
    </tr>`;
  });
}

// Detect when the admin selects a product image
document.addEventListener("change", function(e) {
  // Check that the changed input is the product image input
  if (e.target.id === "productImage" && e.target.files[0]) {
    // Create a FileReader to read the selected image
    var reader = new FileReader();

    // Run this function after the image has been read
    reader.onload = function() {
      // Store the image data
      uploadedImage = reader.result;

      // Show the selected image preview
      var preview = document.getElementById("imagePreview");
      preview.src = uploadedImage;
      preview.style.display = "block";
    };

    // Read the selected image as a data URL
    reader.readAsDataURL(e.target.files[0]);
  }
});

// Save a new product or update an existing product
function saveProduct(e) {
  // Stop the form from refreshing the page
  e.preventDefault();

  // Get the saved products
  var products = JSON.parse(localStorage.getItem("products")) || [];

  // Get the product details from the form
  var id = document.getElementById("productId").value;
  var name = document.getElementById("productName").value;
  var price = Number(document.getElementById("productPrice").value);
  var description = document.getElementById("productDescription").value;

  // If an ID exists, update the existing product
  if (id) {
    // Find the product's position in the array
    var index = products.findIndex(function(p) {
      return p.id === Number(id);
    });

    // Update its details and keep its old image if no new image was selected
    products[index] = {
      ...products[index],
      name: name,
      price: price,
      description: description,
      image: uploadedImage || products[index].image
    };
  } else {
    // A new product must have an image
    if (!uploadedImage) {
      alert("Please choose a product image.");
      return;
    }

    // Add the new product to the array
    products.push({
      id: Date.now(),
      name: name,
      price: price,
      description: description,
      image: uploadedImage
    });
  }

  // Save the updated products in LocalStorage
  localStorage.setItem("products", JSON.stringify(products));

  // Clear the form and reset the product ID
  document.getElementById("productForm").reset();
  document.getElementById("productId").value = "";

  // Clear the temporary image and hide its preview
  uploadedImage = "";
  document.getElementById("imagePreview").style.display = "none";

  // Refresh the products table
  showAdminProducts();
}

// Fill the form with a product's details for editing
function editProduct(id) {
  // Get the saved products
  var products = JSON.parse(localStorage.getItem("products")) || [];

  // Find the product with the selected ID
  var p = products.find(function(item) {
    return item.id === id;
  });

  // Put the product details into the form
  document.getElementById("productId").value = p.id;
  document.getElementById("productName").value = p.name;
  document.getElementById("productPrice").value = p.price;
  document.getElementById("productDescription").value = p.description || "";

  // Clear the temporary image because no new image has been selected
  uploadedImage = "";

  // Show the product's current image
  var preview = document.getElementById("imagePreview");
  preview.src = p.image;
  preview.style.display = "block";

  // Scroll to the top of the page
  window.scrollTo(0, 0);
}

// Delete a product from the store
function deleteProduct(id) {
  // Ask for confirmation before deleting
  if (!confirm("Delete this product?")) return;

  // Get the saved products
  var products = JSON.parse(localStorage.getItem("products")) || [];

  // Keep every product except the one being deleted
  products = products.filter(function(p) {
    return p.id !== id;
  });

  // Save the updated product list
  localStorage.setItem("products", JSON.stringify(products));

  // Refresh the products table
  showAdminProducts();
}

// Display all customer orders in the admin table
function showAdminOrders() {
  // Get the saved orders
  var orders = JSON.parse(localStorage.getItem("orders")) || [];

  // Show the number of orders
  document.getElementById("orderCount").innerText = orders.length;

  // Get the orders table and clear it
  var area = document.getElementById("adminOrders");
  area.innerHTML = "";

  // Add each order to the table
  orders.forEach(function(o) {
    area.innerHTML += `<tr>
      <td>${o.customer}</td>
      <td>${o.email}</td>
      <td>${o.phone}</td>
      <td>Rs. ${o.total}</td>
      <td>
        <select onchange="changeStatus(${o.id},this.value)">
          <option ${o.status === "Pending" ? "selected" : ""}>Pending</option>
          <option ${o.status === "Processing" ? "selected" : ""}>Processing</option>
          <option ${o.status === "Shipped" ? "selected" : ""}>Shipped</option>
          <option ${o.status === "Delivered" ? "selected" : ""}>Delivered</option>
        </select>
      </td>
    </tr>`;
  });
}

// Update an order's status
function changeStatus(id, status) {
  // Get all saved orders
  var orders = JSON.parse(localStorage.getItem("orders")) || [];

  // Find the order with the selected ID
  var order = orders.find(function(o) {
    return o.id === id;
  });

  // Update the status if the order exists
  if (order) order.status = status;

  // Save the updated orders
  localStorage.setItem("orders", JSON.stringify(orders));
}

// Display customer messages in the admin table
function showMessages() {
  // Get the saved messages
  var messages = JSON.parse(localStorage.getItem("messages")) || [];

  // Get the messages table and clear it
  var area = document.getElementById("adminMessages");
  area.innerHTML = "";

  // Add each message to the table
  messages.forEach(function(m) {
    area.innerHTML += `<tr>
      <td>${m.name}</td>
      <td>${m.email}</td>
      <td>${m.message}</td>
      <td>${m.date}</td>
    </tr>`;
  });
}

// Log out the admin
function adminLogout() {
  // Remove the saved admin login status
  sessionStorage.removeItem("adminLoggedIn");

  // Reload the page to show the login form
  location.reload();
}