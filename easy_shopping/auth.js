function getCurrentUser(){
  return JSON.parse(localStorage.getItem("currentUser"));
}
function requireLogin(){
  if(!getCurrentUser()){
    alert("Please login first.");
    location.href="login.html";
    return false;
  }
  return true;
}
function getCartKey(){
  var user = getCurrentUser();
  return user ? "cart_" + user.email : "";
}
function getUserCart(){
  if(!getCurrentUser()) return [];
  return JSON.parse(localStorage.getItem(getCartKey())) || [];
}
function saveUserCart(cart){
  localStorage.setItem(getCartKey(), JSON.stringify(cart));
}
