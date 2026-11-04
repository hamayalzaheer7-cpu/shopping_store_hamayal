// Get the currently logged-in user's details
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

// Check whether the user is logged in
function requireLogin() {
  if (!getCurrentUser()) {
    // Ask the user to log in before continuing
    alert("Please login first.");

    // Redirect the user to the login page
    location.href = "login.html";

    // Return false because the user is not logged in
    return false;
  }

  // Return true if a user is logged in
  return true;
}

// Create a separate cart key for each user's email
function getCartKey() {
  var user = getCurrentUser();

  // Return the user's cart key, or an empty string if no user is logged in
  return user ? "cart_" + user.email : "";
}

// Get the logged-in user's cart from LocalStorage
function getUserCart() {
  // Return an empty cart if no user is logged in
  if (!getCurrentUser()) return [];

  // Read the user's saved cart, or return an empty array
  return JSON.parse(localStorage.getItem(getCartKey())) || [];
}

// Save the user's cart in LocalStorage
function saveUserCart(cart) {
  localStorage.setItem(getCartKey(), JSON.stringify(cart));
}
