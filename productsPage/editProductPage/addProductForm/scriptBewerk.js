let outputShoes = document.getElementById("products");
function success() {
    
    let shoes = JSON.parse(this.responseText);
    console.log(shoes);

    let tabel = document.getElementById("contentInTabel");

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const product = urlParams.get('id');

    for(let i = 0; i <= shoes.length; i++){
        if(shoes[i].product_id == `${product}`){
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
                </tr>
            `;                       

            document.getElementById("naam").setAttribute('value', `${product_naam}`);
            // document.getElementById("type").querySelector('input[name="type"]:checked');
            document.formEdit.type.value=`${product_type}`;
            document.getElementById("beschrijving").innerHTML = `${product_beschrijving}`;  
            document.getElementById("prijs").setAttribute('value', `${product_prijs}`);  
            document.getElementById("merk").setAttribute('value', `${product_merk}`);  
            document.getElementById("min-maat").setAttribute('value', `${product_min_maat}`);  
            document.getElementById("max-maat").setAttribute('value', `${product_max_maat}`); 
        }

    }
}
//VERZENDEN UPDATE
document.getElementById("submit-btn").addEventListener("click", ()=>{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const product = urlParams.get('id');   

    let order_id = product;
    
    let naam = document.getElementById("naam").value;
    let type = document.querySelector('input[name="type"]:checked').value;
    let beschrijving = document.getElementById("beschrijving").value;
    let prijs = document.getElementById("prijs").value;
    let merk = document.getElementById("merk").value;
    let min_maat = document.getElementById("min-maat").value;
    let max_maat = document.getElementById("max-maat").value;

    updateProduct(order_id, naam, type, beschrijving, prijs, merk, min_maat, max_maat);
});

function updateProduct(order_id, naam, type, beschrijving, prijs, merk, min_maat, max_maat){
    let xhr = new XMLHttpRequest();
    xhr.onerror = error;
    xhr.open('POST', `./jsons/jsonWriteUpdate.php?id=${order_id}&naam=${naam}&type=${type}&beschrijving=${beschrijving}&prijs=${prijs}&merk=${merk}&min-maat=${min_maat}&max-maat=${max_maat}`, true);
    xhr.send();
}

document.getElementById("del-btn").addEventListener("click", ()=>{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const product = urlParams.get('id');   

    let order_id = product;

    deleteIt(order_id);
});

function deleteIt(order_id){
    let xhr = new XMLHttpRequest();
    xhr.onerror = error;
    xhr.open('POST', `./jsons/jsonDel.php?id=${order_id}`, true);
    xhr.send();
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


