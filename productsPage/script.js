"use strict";

let outputShoes = document.getElementById("products");
function success() {
    
    console.log(this.responseText);
    let shoes = JSON.parse(this.responseText);;
    console.log(shoes);

    
    for(let i = 0; i <= shoes.length-1; i++){
        let shoePrice = Math.round(shoes[i].product_prijs * 100) / 100
        var trimmedString = shoes[i].product_beschrijving.substring(0, 100);
        let afbeelding1 = 1;
        
        (function() {
            setTimeout(function() {
                outputShoes.innerHTML += `
            
            <div class="product_obj">
                <a class="hoverALink" href="./oneProductPage/oneProductPage.html?id=${shoes[i].product_id}">
                    <div class="img_obj">
                        <img class="product_img" src="https://87231.stu.sd-lab.nl/BEROEPS-2/Shoebox/imgs/${shoes[i].product_id}/img%20%28${afbeelding1}%29.png" alt="">
                    </div>
                    <div class="shoe_info">
                        <div class="title">${shoes[i].product_naam}</div>
                        <div>${trimmedString} ...</div>
                        
                        <div class="shoePrice">
                            &euro; ${shoePrice}
                        </div>
                    </div>
                </a>
            </div>
            
        `;
                }, i * 50);
        })(i);
    }
}   

function error(err) {
    console.error('Error Occurred :', err);
}

function getAllShoes(){
    let xhr = new XMLHttpRequest();
    xhr.onload = success;
    xhr.onerror = error;
    xhr.open('GET', '/BEROEPS-2/Shoebox/productsPage/jsons/jsonRead.php', true);
    //xhr.open('GET', './jsons/json.json', true);
    xhr.send();
}

// Haal initieel al de studenten op die in de database staan

getAllShoes();

const arraytje = [];

const inputHeren = document.querySelector("input[value=heren]");
const inputDames = document.querySelector("input[value=dames]");
const inputJongens = document.querySelector("input[value=jongens]");
const inputMeisjes = document.querySelector("input[value=meisjes]");

arraytje.push(inputHeren);
arraytje.push(inputDames);
arraytje.push(inputJongens);
arraytje.push(inputMeisjes);

for(let i = 0; i < arraytje.length; i++){
    arraytje[i].addEventListener('click', (e)=>{
        if(e.target.checked){
            outputShoes.innerHTML = "";
            console.log("Aan");
            let soort = arraytje[i].value;
            console.log(soort);

            function getSortShoes(){
                let xhr = new XMLHttpRequest();
                xhr.onload = success;
                xhr.onerror = error;
                xhr.open('GET', `/BEROEPS-2/Shoebox/productsPage/jsons/jsonRead.php?product_type=${soort}`, true);
                xhr.send();
            }
            getSortShoes()
        }
        else{
            console.log("Uit");
            outputShoes.innerHTML = "";
        }
    });
}


//BUTON TO ADD PRODUCT//
document.getElementById("resetBtn").addEventListener('click', ()=>{
    window.location.reload();
});

let goToPage = document.getElementById("productAddLink");
let clicks = 0;

goToPage.addEventListener("click", () =>{
    clicks++;

    if(clicks == 5){
        let promptPass = window.prompt("Voer uw wachtwoord in!");
        const pass = "1#Geheim";
        if(promptPass != pass){
            window.prompt("Toegang geweigerd!");
        }else if(promptPass == pass){
            alert("Toegang toegestaan!");
            goToPage.href = `./editProductPage/editProductPage.html`;
        }
    }
});

function makeAlert(){ 
    clicks = 0;
};

setInterval(makeAlert, 3000);