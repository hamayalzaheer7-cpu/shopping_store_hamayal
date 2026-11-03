// Show the user's account dashboard
function showUserDashboard() {

  // Check if the user is logged in
  if (!requireLogin()) return;

  // Get the currently logged-in user
  var user = getCurrentUser();

  // Get all saved orders from LocalStorage
  var allOrders = JSON.parse(localStorage.getItem("orders")) || [];

  // Get only the orders placed by the current user
  var myOrders = allOrders.filter(function(order) {
    return order.email === user.email;
  });

  // Show the user's name on the dashboard
  document.getElementById("welcome").innerText = "Welcome, " + user.name;

  // Show the total number of orders
  document.getElementById("orderCount").innerText = myOrders.length;

  // Calculate the total amount spent by the user
  var total = 0;

  myOrders.forEach(function(order) {
    total += order.total;
  });

  // Display the total spending
  document.getElementById("spent").innerText = "Rs. " + total;

  // Get the table area where orders will be displayed
  var area = document.getElementById("myOrders");

  // Clear the previous order data
  area.innerHTML = "";

  // Check if the user has placed any orders
  if (myOrders.length === 0) {
    area.innerHTML = "<p>You have not placed any orders yet.</p>";
    return;
  }

  // Reverse the orders to show the latest order first
  myOrders.reverse().forEach(function(order) {

    // Get product names and quantities from each order
    var names = order.items.map(function(item) {
      return item.name + " × " + item.quantity;
    }).join(", ");

    // Display the order details in a table row
    area.innerHTML += `<tr>
      <td>#${order.id}</td>
      <td>${order.date}</td>
      <td>${names}</td>
      <td>Rs. ${order.total}</td>
      <td>${order.status}</td>
    </tr>`;
  });
}

// Run the dashboard function when the page loads
showUserDashboard();