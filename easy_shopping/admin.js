var adminPassword="admin123";
var uploadedImage="";
function adminLogin(e){
  e.preventDefault();
  var pass=document.getElementById("adminPassword").value;
  if(pass===adminPassword){
    sessionStorage.setItem("adminLoggedIn","yes");
    showAdmin();
  }else{alert("Incorrect admin password.");}
}
function showAdmin(){
  if(sessionStorage.getItem("adminLoggedIn")!=="yes"){
    document.getElementById("adminPanel").style.display="none";
    return;
  }
  document.getElementById("adminLogin").style.display="none";
  document.getElementById("adminPanel").style.display="block";
  showAdminProducts();showAdminOrders();showMessages();
}
function showAdminProducts(){
  var products=JSON.parse(localStorage.getItem("products")) || [];
  document.getElementById("productCount").innerText=products.length;
  var area=document.getElementById("adminProducts");
  area.innerHTML="";
  products.forEach(function(p){
    area.innerHTML+=`<tr><td>${p.name}</td><td>Rs. ${p.price}</td>
      <td><button onclick="editProduct(${p.id})">Edit</button>
      <button class="btn-danger" onclick="deleteProduct(${p.id})">Delete</button></td></tr>`;
  });
}
document.addEventListener("change",function(e){
  if(e.target.id==="productImage" && e.target.files[0]){
    var reader=new FileReader();
    reader.onload=function(){
      uploadedImage=reader.result;
      var preview=document.getElementById("imagePreview");
      preview.src=uploadedImage;preview.style.display="block";
    };
    reader.readAsDataURL(e.target.files[0]);
  }
});
function saveProduct(e){
  e.preventDefault();
  var products=JSON.parse(localStorage.getItem("products")) || [];
  var id=document.getElementById("productId").value;
  var name=document.getElementById("productName").value;
  var price=Number(document.getElementById("productPrice").value);
  var description=document.getElementById("productDescription").value;
  if(id){
    var index=products.findIndex(function(p){return p.id===Number(id);});
    products[index]={...products[index],name:name,price:price,description:description,image:uploadedImage || products[index].image};
  }else{
    if(!uploadedImage){alert("Please choose a product image.");return;}
    products.push({id:Date.now(),name:name,price:price,description:description,image:uploadedImage});
  }
  localStorage.setItem("products",JSON.stringify(products));
  document.getElementById("productForm").reset();
  document.getElementById("productId").value="";
  uploadedImage="";
  document.getElementById("imagePreview").style.display="none";
  showAdminProducts();
}
function editProduct(id){
  var products=JSON.parse(localStorage.getItem("products")) || [];
  var p=products.find(function(item){return item.id===id;});
  document.getElementById("productId").value=p.id;
  document.getElementById("productName").value=p.name;
  document.getElementById("productPrice").value=p.price;
  document.getElementById("productDescription").value=p.description || "";
  uploadedImage="";
  var preview=document.getElementById("imagePreview");
  preview.src=p.image;preview.style.display="block";
  window.scrollTo(0,0);
}
function deleteProduct(id){
  if(!confirm("Delete this product?")) return;
  var products=JSON.parse(localStorage.getItem("products")) || [];
  products=products.filter(function(p){return p.id!==id;});
  localStorage.setItem("products",JSON.stringify(products));
  showAdminProducts();
}
function showAdminOrders(){
  var orders=JSON.parse(localStorage.getItem("orders")) || [];
  document.getElementById("orderCount").innerText=orders.length;
  var area=document.getElementById("adminOrders");
  area.innerHTML="";
  orders.forEach(function(o){
    area.innerHTML+=`<tr><td>${o.customer}</td><td>${o.email}</td>
      <td>${o.phone}</td><td>Rs. ${o.total}</td><td>
      <select onchange="changeStatus(${o.id},this.value)">
        <option ${o.status==="Pending"?"selected":""}>Pending</option>
        <option ${o.status==="Processing"?"selected":""}>Processing</option>
        <option ${o.status==="Shipped"?"selected":""}>Shipped</option>
        <option ${o.status==="Delivered"?"selected":""}>Delivered</option>
      </select></td></tr>`;
  });
}
function changeStatus(id,status){
  var orders=JSON.parse(localStorage.getItem("orders")) || [];
  var order=orders.find(function(o){return o.id===id;});
  if(order) order.status=status;
  localStorage.setItem("orders",JSON.stringify(orders));
}
function showMessages(){
  var messages=JSON.parse(localStorage.getItem("messages")) || [];
  var area=document.getElementById("adminMessages");
  area.innerHTML="";
  messages.forEach(function(m){
    area.innerHTML+=`<tr><td>${m.name}</td><td>${m.email}</td><td>${m.message}</td><td>${m.date}</td></tr>`;
  });
}
function adminLogout(){
  sessionStorage.removeItem("adminLoggedIn");
  location.reload();
}
