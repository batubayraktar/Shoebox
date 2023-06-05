function success() {
    //console.log(this.responseText);
    let shoes = JSON.parse(this.responseText);;
    console.log(shoes);
}
function error(err) {
    console.error('Error Occurred :', err);
}


function getNamesFunction(){
    let retrievedData = localStorage.getItem("producten");
    let objectToJson = JSON.parse(retrievedData);
    let myJson = document.getElementById("myJson");

    myJson.value = retrievedData;
    
    // let localArray = JSON.stringify(localStorage.getItem("producten"));

    let objectStringfy = JSON.stringify(retrievedData);
    let arrayWithNames = Object.getOwnPropertyNames(objectToJson);

    console.log(objectToJson);
    console.log(objectStringfy);
    // $.ajax({
    //     type: 'POST',
    //     url: 'sendForm.php',
    //     data: {result : retrievedData}, 

    //     success: function(){
    //        console.log("OK");
    //     }
    // });
   $.post('sendForm.php',{
    producten:JSON.stringify(localStorage.getItem('producten'))
   });
    
    // jQuery.post('sendForm.php', {
    //     'item' : objectStringfy
    // });
    if(retrievedData > 0){
        for(let i = 0; i <= retrievedData.length; i++){
            console.log(objectToJson[`${arrayWithNames[i]}`].product_id);
            console.log(objectToJson[`${arrayWithNames[i]}`].product_maat);
            console.log(objectToJson[`${arrayWithNames[i]}`].product_aantal);

            let id = objectToJson[`${arrayWithNames[i]}`].product_id;
            let maat = objectToJson[`${arrayWithNames[i]}`].product_maat;
            let aantal = objectToJson[`${arrayWithNames[i]}`].product_aantal;
        }        
    } 
}

 function getAllShoes(){
    let xhr = new XMLHttpRequest();
    xhr.onload = success;
    xhr.onerror = error;
    xhr.open('GET', './jsons/jsonRead.php', false);
    //xhr.open('GET', './jsons/json.json', true);
    xhr.send();
}
getAllShoes();

getNamesFunction();


document.getElementById("submit").addEventListener("click", ()=>{
    localStorage.clear();
});