console.log(localStorage.getItem("producten"));
function getShoe(id){
    let xhr = new XMLHttpRequest();
    xhr.onload = success;
    xhr.onerror = error;
    xhr.open('GET', `./jsons/jsonRead.php?id=${id}`, true);
    //xhr.open('GET', `./json.json`, true);
    xhr.send();
}

function success() {
    shoe = JSON.parse(this.responseText);
    let shoeString = JSON.stringify(shoe);
    console.log(shoeString);
    enterShoes(shoe);
}

function error(err) {
    console.error('Error Occurred :', err);
}

let producten = {};
if (localStorage.getItem("producten")) {
    producten = JSON.parse(localStorage.getItem("producten"));
}

if(localStorage.getItem("producten")){
    let disp = document.querySelector('.buttonContainer');
    disp.innerHTML += `<a href="../checkoutPage/checkoutPage.html" class="button positionBottomRight">Afrekenen</a>`;
}else{
    let disp = document.querySelector('#nothing');
    disp.innerHTML = `Uw winkelwagen is leeg`;
}

let tbody = document.getElementById("cartContainer");

function enterShoes(json){
    let id = json[0].product_id;
    console.log(id);

    let card = document.createElement('div');
    card.classList.add('card');


    let productImg = document.createElement('img')
    productImg.src = `https://85153.stu.sd-lab.nl/GLR/BEROEPS/imgs/${id}/img%20%281%29.png`;
    card.appendChild(productImg);

    let productInfo = document.createElement('div');
    productInfo.classList.add('productInfo');
    card.appendChild(productInfo);

    let productLink = document.createElement("a");
    productLink.textContent = json[0].product_naam;
    productLink.href = `../productsPage/oneProductPage/oneProductPage.html?id=${id}`
    productLink.classList.add('productLink');
    productInfo.appendChild(productLink);

    let productType = document.createElement('div');
    productType.textContent = `${json[0].product_type}schoenen`
    productInfo.appendChild(productType);

    let productMerk = document.createElement('div');
    productMerk.textContent = `Merk: ${json[0].product_merk}`
    productInfo.appendChild(productMerk);

    let productPrice = document.createElement('div');
    productPrice.textContent = `Prijs: €${json[0].product_prijs}`
    card.appendChild(productPrice);

    tbody.appendChild(card)
}

for (let id in producten) {
    let item = producten[id];
    console.log(id);
    getShoe(item.product_id);
}

const element = document.getElementById("clearCart");
element.addEventListener("click", removeShoes);

function removeShoes(){
    window.localStorage.removeItem("producten");
    document.location.reload();
}