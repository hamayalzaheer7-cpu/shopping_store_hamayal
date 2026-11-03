// Function to load checkout details
function loadCheckout(){

  // Check if user is logged in
  // If not logged in, stop the function
  if(!requireLogin()) return;

  // Get the current user's cart
  var cart=getUserCart();

  // Check if cart is empty
  if(cart.length===0){

    // Show message to user
    alert("Your cart is empty.");

    // Send user back to cart page
    location.href="cart.html";

    // Stop the function
    return;
  }

  // Variable to calculate total price
  var total=0;

  // Loop through every item in the cart
  cart.forEach(function(item){

    // Multiply product price by its quantity
    // Add the result to total
    total+=item.price*item.quantity;

  });

  // Display total amount on checkout page
  document.getElementById("checkoutTotal").innerText="Rs. "+total;
}


// Function to place customer order
function placeOrder(e){

  // Stop the form from refreshing the page
  e.preventDefault();

  // Get currently logged-in user's information
  var user=getCurrentUser();

  // Get this user's cart items
  var cart=getUserCart();

  // Check if cart is empty
  if(cart.length===0){

    alert("Your cart is empty.");

    // Stop order process
    return;
  }

  // Create an object containing order details
  var order={

    // Generate a unique order ID using current time
    id:Date.now(),

    // Save customer's name
    customer:user.name,

    // Save customer's email
    email:user.email,

    // Get phone number from input field
    phone:document.getElementById("phone").value,

    // Get delivery address
    address:document.getElementById("address").value,

    // Get customer's city
    city:document.getElementById("city").value,

    // Save all cart products in the order
    items:cart,

    // Calculate total order amount
    total:cart.reduce(function(sum,item){

      // Add each product's price multiplied by quantity
      return sum+item.price*item.quantity;

    },0),

    // Set initial order status
    status:"Pending",

    // Get today's date
    date:new Date().toLocaleDateString()
  };

  // Get previously saved orders from LocalStorage
  // If no orders exist, create an empty array
  var orders=JSON.parse(localStorage.getItem("orders")) || [];

  // Add new order to orders array
  orders.push(order);

  // Save updated orders array in LocalStorage
  // JSON.stringify converts array into a string
  localStorage.setItem("orders",JSON.stringify(orders));

  // Empty the current user's cart after ordering
  saveUserCart([]);

  // Show successful order message
  alert("Your order has been placed!");

  // Redirect user to their dashboard
  location.href="user.html";
}


// Run checkout function when page loads
loadCheckout();