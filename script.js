


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

  document.getElementById("popupName").innerText = card.dataset.name;
  document.getElementById("popupBrand").innerText = "Brand: " + card.dataset.brand;
  document.getElementById("popupPrice").innerText = card.dataset.price;
  document.getElementById("popupDescription").innerText = card.dataset.description;
  document.getElementById("popupImage").src = card.dataset.image;

  document.getElementById("productPage").style.display = "block";
}

function closePopup(){
  document.getElementById("productPage").style.display = "none";
}





  




