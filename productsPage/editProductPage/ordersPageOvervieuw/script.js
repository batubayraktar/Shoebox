"use strict";

let spullen = window.localStorage.getItem('producten');

console.log(spullen);



let outputShoes = document.getElementById("products");
function success() {
    
    //console.log("Respons: " + this.responseText);
    let shoes = JSON.parse(this.responseText);;

    let tabel = document.getElementById("contentInTabel");
    for(let i = 0; i <= shoes.length; i++){
        let orders_id = shoes[i].order_id;
        let klant_naam = shoes[i].klant_naam;
        let klant_email = shoes[i].klant_mail;
        let klant_telefoonnummer = shoes[i].klant_telefoonnummer;
        let klant_bezorgadres = shoes[i].klant_bezorgadres;
        let klant_postcode = shoes[i].klant_postcode;
        let klant_stad = shoes[i].klant_stad;
        let klant_provincie = shoes[i].klant_provincie;
        let status = shoes[i].Status;

        tabel.innerHTML += `
            <tr>
                <td>${orders_id}</th>
                <td>${klant_naam}</th>
                <td>${klant_email}</th>
                <td>${klant_telefoonnummer}</th>
                <td>${klant_bezorgadres}</th>
                <td>${klant_postcode}</th>
                <td>${klant_stad}</th>
                <td>${klant_provincie}</th>
                <td>${status}</th>
                <td><a href="./bewerken.html?id=${orders_id}">Bekijken / Bewerken</a></th>
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

// Haal initieel al de studenten op die in de database staan

getAllShoes();

// const arraytje = [];

// const inputHeren = document.querySelector("input[value=heren]");
// const inputDames = document.querySelector("input[value=dames]");
// const inputJongens = document.querySelector("input[value=jongens]");
// const inputMeisjes = document.querySelector("input[value=meisjes]");

// arraytje.push(inputHeren);
// arraytje.push(inputDames);
// arraytje.push(inputJongens);
// arraytje.push(inputMeisjes);

// for(let i = 0; i < arraytje.length; i++){
//     arraytje[i].addEventListener('click', (e)=>{
//         if(e.target.checked){
//             outputShoes.innerHTML = "";
//             console.log("Aan");
//             let soort = arraytje[i].value;
//             console.log(soort);

//             function getSortShoes(){
//                 let xhr = new XMLHttpRequest();
//                 xhr.onload = success;
//                 xhr.onerror = error;
//                 xhr.open('GET', `./jsons/jsonRead.php?product_type=${soort}`, true);
//                 xhr.send();
//             }
//             getSortShoes()
//         }
//         else{
//             console.log("Uit");
//             outputShoes.innerHTML = "";
//         }
//     });
// }