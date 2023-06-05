"use strict";

let outputShoes = document.getElementById("products");
function success() {
    
    //console.log("Respons: " + this.responseText);
    let shoes = JSON.parse(this.responseText);
    console.log(shoes);

    let tabel = document.getElementById("contentInTabel");
    for(let i = 0; i <= shoes.length; i++){

        let product_id = shoes[i].product_id;
        let product_naam = shoes[i].product_naam;
        let product_type = shoes[i].product_type;
        let product_beschrijving = shoes[i].product_beschrijving;
        let product_prijs = shoes[i].product_prijs;
        let product_merk = shoes[i].product_merk;
        let product_min_maat = shoes[i].product_min_maat;
        let product_max_maat = shoes[i].product_max_maat;

        tabel.innerHTML += `
            <tr>
                <td>${product_id}</th>
                <td>${product_naam}</th>
                <td>${product_type}</th>
                <td>${product_beschrijving}</th>
                <td>${product_prijs}</th>
                <td>${product_merk}</th>
                <td>${product_min_maat}</th>
                <td>${product_max_maat}</th>
                <td><a href="./bewerken.html?id=${product_id}">Bewerken</a></th>
            </tr>
        `;
    }
}   

function error(err) {
    console.error('Error Occurred :', err);
}

function getAllShoes(){
    let xhr = new XMLHttpRequest();
    xhr.onload = success;
    
    xhr.onerror = error;
    //xhr.open('GET', './jsons/json.json', true);
    xhr.open('GET', './jsons/jsonRead.php', true);
    xhr.send();
}

getAllShoes();