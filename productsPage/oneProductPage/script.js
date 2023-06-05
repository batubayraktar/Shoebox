"use strict";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
//console.log(id);

let outputShoes = document.getElementById("products");

function success() {
    //console.log(this.responseText);
    let shoes = JSON.parse(this.responseText);
    // try{
    //     shoes = JSON.parse(this.responseText);
    // }
    // catch{
    //     shoes = this.responseText;
    // }
    let ditShoe = shoes[0];
    
    //data die gekregen inzetten op scherm
    zetOpScherm(ditShoe);
    //console.log(shoes[0]);

    //data to session
    dataToSession(ditShoe);
}

function success2() {
    let shoes;
    try{
        shoes = JSON.parse(this.responseText);
    }
    catch{
        shoes = this.responseText;
    }
    //console.log(shoes);

    let aantal =0;

    for(let dit in shoes){
        aantal++;
    }

    let alleIds = [];
    
    for(let i = 0; i <= aantal-1; i++){
        let getal = parseInt(shoes[i].product_id);
        alleIds.push(getal);
    }

    let randomis = [1, 2, 3, 4, 5];

    let slideSm1 = document.getElementById("slideSm1");
    let slideSm2 = document.getElementById("slideSm2");
    let slideSm3 = document.getElementById("slideSm3");
    let slideSm4 = document.getElementById("slideSm4");
    let slideSm5 = document.getElementById("slideSm5");

    slideSm2.innerHTML = `<a href="../oneProductPage/oneProductPage.html?id=${randomis[1]}"><img class="smIMG" src="https://oniscenko.com/projects/project2/imgs/${randomis[1]}/img%20%281%29.png"></a>`;
    slideSm3.innerHTML = `<a href="../oneProductPage/oneProductPage.html?id=${randomis[2]}"><img class="smIMG" src="https://oniscenko.com/projects/project2/imgs/${randomis[2]}/img%20%281%29.png"></a>`;
    slideSm4.innerHTML = `<a href="../oneProductPage/oneProductPage.html?id=${randomis[3]}"><img class="smIMG" src="https://oniscenko.com/projects/project2/imgs/${randomis[3]}/img%20%281%29.png"></a>`;
    slideSm5.innerHTML = `<a href="../oneProductPage/oneProductPage.html?id=${randomis[4]}"><img class="smIMG" src="https://oniscenko.com/projects/project2/imgs/${randomis[4]}/img%20%281%29.png"></a>`;

}   

function error(err) {
    console.error('Error Occurred :', err);
}

function getShoe(){
    let xhr = new XMLHttpRequest();
    xhr.onload = success;
    xhr.onerror = error;
    xhr.open('GET', `/projects/project2/productsPage/oneProductPage/jsons/jsonRead.php?id=${id}`, true);
    //xhr.open('GET', `./json.json`, true);
    xhr.send();
}
function getAllShoe(){
    let xhr = new XMLHttpRequest();
    xhr.onload = success2;
    xhr.onerror = error;
    xhr.open('GET', `/projects/project2/productsPage/oneProductPage/jsons/jsonReadAll.php`, true);
    //xhr.open('GET', `./json.json`, true);
    xhr.send();
}
// Haal initieel al de studenten op die in de database staan
getShoe();
getAllShoe();


function zetOpScherm(ditShoe){
    let shoeTitle = document.getElementById("shoeTitle");
    let shoeTitle2 = document.getElementById("shoeTitle2");
    let shoeType = document.getElementById("shoeType");
    let shoePrice = document.getElementById("shoePrice");
    let shoeText = document.getElementById("shoeText");
    let slide1 = document.getElementById("slide1");
    let slide2 = document.getElementById("slide2");
    let slide3 = document.getElementById("slide3");
    let slide4 = document.getElementById("slide4");
    shoeTitle.innerHTML = `${ditShoe.product_naam}`;
    shoeTitle2.innerHTML = `${ditShoe.product_naam}`;
    shoeType.innerHTML = `${ditShoe.product_type}schoenen`;
    shoePrice.innerHTML = `&euro;${ditShoe.product_prijs}`;
    shoeText.innerHTML = `${ditShoe.product_beschrijving}`;
    slide1.style.backgroundImage = `url(https://oniscenko.com/projects/project2/imgs/${id}/img%20%28${1}%29.png)`;
    slide2.style.backgroundImage = `url(https://oniscenko.com/projects/project2/imgs/${id}/img%20%28${2}%29.png)`;
    slide3.style.backgroundImage = `url(https://oniscenko.com/projects/project2/imgs/${id}/img%20%28${3}%29.png)`;
    slide4.style.backgroundImage = `url(https://oniscenko.com/projects/project2/imgs/${id}/img%20%28${4}%29.png)`;


    let matenTabel = document.getElementById("maten");
    let minMaat = parseInt(ditShoe.product_min_maat);
    let maxMaat = parseInt(ditShoe.product_max_maat);

    for(let i = minMaat; i <=maxMaat; i++){
        matenTabel.innerHTML += `
            <option value="${i}">Maat: ${i}</option>
        `;
    }
}

function dataToSession(ditShoe){
    document.getElementById("toSession").addEventListener('click', ()=>{
        let maat = document.getElementById("maten").value;
        let aantal = parseInt(document.getElementById("aantal").value);

        let producten_array = {
            product_id: parseInt(ditShoe.product_id),
            product_maat: parseInt(maat),
            product_aantal: aantal,
        };
        //console.log(producten_array);
        verzetten(producten_array);
    });
}

function verzetten(product){
    //console.log(product.product_id);
    let productenInStorage = localStorage.getItem('producten');
    productenInStorage = JSON.parse(productenInStorage);

    if(productenInStorage != null){

        if(productenInStorage[product.product_maat] != product.product_maat){
            productenInStorage = {
                ...productenInStorage,
                [`ID:${id}_MAAT:${product.product_maat}`]: product
            }
        }
    }
    
    else{
        productenInStorage = {
            [`ID:${id}_MAAT:${product.product_maat}`]: product
        }
        //console.log(productenInStorage);
    }

    localStorage.setItem("producten", JSON.stringify(productenInStorage));

}