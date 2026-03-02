
 let currentProduct = null;


  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
 hamburger.addEventListener("click", () => {
  navLinks.classList.add("show");
  if(!document.querySelector('.close-btn')){
    const closeBtn= document.createElement("button");
    closeBtn.textContent='X';
    closeBtn.classList.add('close-btn');
    navLinks.appendChild(closeBtn);
    closeBtn.addEventListener('click',()=>{
      navLinks.classList.remove('show');
      closeBtn.remove();
    });
  }
  });
  



function openProduct(card){

  currentProduct = {
    name: card.dataset.name,
    brand: card.dataset.brand,
    price: card.dataset.price,
    description: card.dataset.description,
    image: card.dataset.image,
    quantity: 1
  };

  document.getElementById("popupName").innerText = currentProduct.name;
  document.getElementById("popupBrand").innerText = "Brand: " + currentProduct.brand;
  document.getElementById("popupPrice").innerText = currentProduct.price;
  document.getElementById("popupDescription").innerText = currentProduct.description;
  document.getElementById("popupImage").src = currentProduct.image;

  document.getElementById("productPage").style.display = "block";
}
function closePopup(){
  document.getElementById("productPage").style.display = "none";
}

 function addToCart(){

  if(!currentProduct){
    alert("No product selected");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existingProduct = cart.find(item => item.name === currentProduct.name);

  if(existingProduct){
    existingProduct.quantity += 1;
  } else {
    cart.push(currentProduct);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Product Added To Cart ✅");
}



function loadCart() {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let tbody = document.getElementById("cart-body");

  if (!tbody) return;

  tbody.innerHTML = "";

  let grandTotal = 0;

  cart.forEach((item, index) => {

    let priceNumber = parseInt(item.price.replace("₹",""));
    let subtotal = priceNumber * item.quantity;

    grandTotal += subtotal;

    tbody.innerHTML += `
      <tr>
        <td><button onclick="removeItem(${index})">X</button></td>
        <td><img src="${item.image}" width="70"></td>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>
          <input type="number" min="1" value="${item.quantity}" 
          oninput="updateQuantity(${index}, this.value)">
        </td>
        <td>₹${subtotal}</td>
      </tr>
    `;
  });

  document.getElementById("grand-total").innerText =
    "Grand Total: ₹" + grandTotal;
}

function removeItem(index) {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.splice(index, 1);  // selected item delete

  localStorage.setItem("cart", JSON.stringify(cart));

  location.reload();  // page refresh kar do
}
function updateQuantity(index, newQuantity) {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  newQuantity = parseInt(newQuantity);

  if (newQuantity < 1) newQuantity = 1;

  cart[index].quantity = newQuantity;

  localStorage.setItem("cart", JSON.stringify(cart));

  // 🔥 subtotal ko direct update karenge
  let row = document.querySelectorAll("#cart-body tr")[index];

  let price = parseInt(cart[index].price.replace("₹",""));
  let subtotal = price * newQuantity;

  row.cells[5].innerText = "₹" + subtotal;
  loadCart();
}
document.addEventListener("DOMContentLoaded", function () {
  loadCart();
});

