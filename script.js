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
    console.log(id);
}

let shoe = getShoe(2);
console.log(shoe);

function error(err) {
    console.error('Error Occurred :', err);
}

let producten = {};
if (localStorage.getItem("producten")) {
    producten = JSON.parse(localStorage.getItem("producten"));
}

let tbody = document.getElementById("cartContainer");

for (let id in producten) {
    let item = producten[id];

    let card = document.createElement('div')

    let id_td = document.createElement('div')
    id_td.textContent = item.product_id;
    card.appendChild(id_td)


    let maat_td = document.createElement("div");
    maat_td.textContent = item.product_maat;
    card.appendChild(maat_td);

    let aantal_td = document.createElement("div");
    aantal_td.textContent = item.product_aantal;
    card.appendChild(aantal_td);

    tbody.appendChild(card)

}

const element = document.getElementById("clearCart");
element.addEventListener("click", removeShoes);

function removeShoes(){
    window.localStorage.removeItem("producten");
    document.location.reload();
}