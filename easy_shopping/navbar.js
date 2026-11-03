// Displays the navbar on every page
function showNavbar() {

  // Gets the currently logged-in user from LocalStorage
  var user = JSON.parse(localStorage.getItem("currentUser"));

  // Creates the common navigation links
  var links = `
    <a href="index.html">Home</a>
    <a href="index.html#products">Shop</a>
    <a href="about.html">About</a>
    <a href="contact.html">Contact</a>`;

  // Checks if a user is logged in
  if (user) {

    // Adds account links when the user is logged in
    links += `<a href="cart.html">My Cart</a>
      <a href="user.html">My Account</a>

      <!-- Displays the logged-in user's name -->
      <span class="nav-user">Hi, ${user.name}</span>

      <a href="#" onclick="logoutUser()">Logout</a>`;

  } else {

    // Shows Login and Register links if no user is logged in
    links += `<a href="login.html">Login</a>
      <a href="register.html">Register</a>`;
  }

  // Displays the complete navbar inside the navbar element
  document.getElementById("navbar").innerHTML = `
    <nav>
      <a class="logo" href="index.html">EASY SHOPPING</a>
      <div class="nav-links">${links}</div>
    </nav>`;
}


// Displays the footer on every page
function showFooter() {

  // Adds footer content inside the footer element
  document.getElementById("footer").innerHTML = `
    <footer>
      <div class="footer-grid">

        <div>
          <h3>EASY SHOPPING</h3>
          <p>Simple finds for everyday living. Shop useful products at easy prices.</p>
        </div>

        <div>
          <h3>Explore</h3>
          <a href="index.html">Home</a>
          <a href="about.html">About</a>
          <a href="contact.html">Contact</a>
        </div>

        <div>
          <h3>Get in touch</h3>
          <p>Email: hamayal@gmail.com</p>
          <p>Pakistan</p>
        </div>

      </div>

      <p class="small">© 2026 Easy Shopping. All rights reserved.</p>
    </footer>`;
}


// Logs out the current user
function logoutUser() {

  // Removes the logged-in user's data from LocalStorage
  localStorage.removeItem("currentUser");

  // Redirects the user to the home page
  location.href = "index.html";
}


// Calls both functions when the JavaScript file loads
showNavbar();
showFooter();