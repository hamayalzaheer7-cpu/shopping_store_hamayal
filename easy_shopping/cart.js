function showCart(){
  if(!requireLogin()) return;
  var cart=getUserCart();
  var area=document.getElementById("cartItems");
  var total=0;
  area.innerHTML="";
  if(cart.length===0){
    area.innerHTML='<div class="empty">Your cart is empty. <a href="index.html">Continue shopping</a></div>';
    document.getElementById("cartTotal").innerText="Rs. 0";
    return;
  }
  cart.forEach(function(item,index){
    total += item.price*item.quantity;
    area.innerHTML += `<tr>
      <td>${item.name}</td><td>Rs. ${item.price}</td>
      <td><button class="btn-light" onclick="changeQty(${index},-1)">−</button>
      ${item.quantity}
      <button class="btn-light" onclick="changeQty(${index},1)">+</button></td>
      <td>Rs. ${item.price*item.quantity}</td>
      <td><button class="btn-danger" onclick="removeItem(${index})">Remove</button></td>
    </tr>`;
  });
  document.getElementById("cartTotal").innerText="Rs. "+total;
}
function changeQty(index,change){
  var cart=getUserCart();
  cart[index].quantity+=change;
  if(cart[index].quantity<1) cart.splice(index,1);
  saveUserCart(cart);showCart();
}
function removeItem(index){
  var cart=getUserCart();
  cart.splice(index,1);
  saveUserCart(cart);showCart();
}
showCart();
