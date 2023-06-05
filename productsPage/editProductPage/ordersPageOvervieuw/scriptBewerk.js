let outputShoes = document.getElementById("products");
function success() {
    
    let shoes = JSON.parse(this.responseText);

    let tabel = document.getElementById("contentInTabel");
    let tabel2 = document.getElementById("contentInTabel2");

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const product = urlParams.get('id');

    for(let i = 0; i <= shoes.length-1; i++){
        if(shoes[i].order_id == `${product}`){

            let bestelling = JSON.parse(shoes[i].Bestelling_details);
            console.log(bestelling);

            for(let namen in bestelling){
                let product_id = bestelling[namen].product_id;
                let product_maat = bestelling[namen].product_maat;
                let product_aantal = bestelling[namen].product_aantal;

                tabel2.innerHTML += `
                    <tr>
                        <td>${product_id}</th>
                        <td>${product_maat}</th>
                        <td>${product_aantal}</th>
                    </tr>
                `;
            }
        
            let order_id = shoes[i].order_id;
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
                    <td>${order_id}</th>
                    <td>${klant_naam}</th>
                    <td>${klant_email}</th>
                    <td>${klant_telefoonnummer}</th>
                    <td>${klant_bezorgadres}</th>
                    <td>${klant_postcode}</th>
                    <td>${klant_stad}</th>
                    <td>${klant_provincie}</th>
                    <td>${status}</th>
                </tr>
            `;
            document.formEdit.Status.value=`${status}`;
            document.getElementById("naam").setAttribute('value', `${klant_naam}`);
            document.getElementById("mail").setAttribute('value', `${klant_email}`);  
            document.getElementById("nummer").setAttribute('value', `${klant_telefoonnummer}`);  
            document.getElementById("bezorgadres").setAttribute('value', `${klant_bezorgadres}`);  
            document.getElementById("postcode").setAttribute('value', `${klant_postcode}`);  
            document.getElementById("stad").setAttribute('value', `${klant_stad}`);  
            document.getElementById("provincie").setAttribute('value', `${klant_provincie}`);
        }
 
    }

    
}

//VERZENDEN UPDATE
document.getElementById("submit-btn").addEventListener("click", ()=>{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const product = urlParams.get('id');   

    let order_id = product;
    let klant_naam = document.getElementById("naam").value;
    let klant_email = document.getElementById("mail").value;
    let klant_telefoonnummer = document.getElementById("nummer").value;
    let klant_bezorgadres = document.getElementById("bezorgadres").value;
    let klant_postcode = document.getElementById("postcode").value;
    let klant_stad = document.getElementById("stad").value;
    let klant_provincie = document.getElementById("provincie").value;
    let status = document.querySelector('input[name="Status"]:checked').value;

    updateBestelling(order_id, klant_naam, klant_email, klant_telefoonnummer, klant_bezorgadres, klant_postcode, klant_stad, klant_provincie, status);
});

document.getElementById("del-btn").addEventListener("click", ()=>{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const product = urlParams.get('id');   

    let order_id = product;

    deleteIt(order_id);
});  

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

function updateBestelling(order_id, klant_naam, klant_email, klant_telefoonnummer, klant_bezorgadres, klant_postcode, klant_stad, klant_provincie, status){
    let xhr = new XMLHttpRequest();
    xhr.onerror = error;
    xhr.open('POST', `./jsons/jsonWriteBewerk.php?id=${order_id}&naam=${klant_naam}&email=${klant_email}&tel=${klant_telefoonnummer}&bezAdres=${klant_bezorgadres}&postcode=${klant_postcode}&stad=${klant_stad}&provincie=${klant_provincie}&status=${status}`, true);
    xhr.send();
}

function deleteIt(order_id){
    let xhr = new XMLHttpRequest();
    xhr.onerror = error;
    xhr.open('POST', `./jsons/jsonDel.php?id=${order_id}`, true);
    xhr.send();
}

getAllShoes();


