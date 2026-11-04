// Display all items in the user's cart
function showCart() {

  // Check if the user is logged in
  if (!requireLogin()) return;

  // Get the logged-in user's cart
  var cart = getUserCart();

  // Get the table area where cart items will appear
  var area = document.getElementById("cartItems");

  // Start the total amount from zero
  var total = 0;

  // Clear the previous cart content
  area.innerHTML = "";

  // Check if the cart is empty
  if (cart.length === 0) {
    area.innerHTML = '<div class="empty">Your cart is empty. <a href="index.html">Continue shopping</a></div>';

    // Display zero as the cart total
    document.getElementById("cartTotal").innerText = "Rs. 0";
    return;
  }

  // Display each cart item in the table
  cart.forEach(function(item, index) {

    // Calculate the total price of each item
    total += item.price * item.quantity;

    // Add the product details and buttons to the table
    area.innerHTML += `<tr>
      <td>${item.name}</td>
      <td>Rs. ${item.price}</td>
      <td>
        <button class="btn-light" onclick="changeQty(${index},-1)">−</button>
        ${item.quantity}
        <button class="btn-light" onclick="changeQty(${index},1)">+</button>
      </td>
      <td>Rs. ${item.price * item.quantity}</td>
      <td>
        <button class="btn-danger" onclick="removeItem(${index})">Remove</button>
      </td>
    </tr>`;
  });

  // Display the final cart total
  document.getElementById("cartTotal").innerText = "Rs. " + total;
}

// Increase or decrease the quantity of a cart item
function changeQty(index, change) {

  // Get the user's cart
  var cart = getUserCart();

  // Update the quantity using the given change value
  cart[index].quantity += change;

  // Remove the item if its quantity becomes less than one
  if (cart[index].quantity < 1) {
    cart.splice(index, 1);
  }

  // Save the updated cart and refresh the display
  saveUserCart(cart);
  showCart();
}

// Remove an item completely from the cart
function removeItem(index) {

  // Get the user's cart
  var cart = getUserCart();

  // Remove one item using its array index
  cart.splice(index, 1);

  // Save the updated cart and refresh the display
  saveUserCart(cart);
  showCart();
}

// Run the cart function when the page loads
showCart();

