<?php
//Voeg de database-verbinding toe
require "db_Config.php";

//Maak een toevoeg-query
$query = "INSERT INTO Studenten (ID, Naam,Klas) VALUES (NULL,'Batuhan Bayraktar', 'D2D1')";
$query1 = "SELECT * FROM Studenten";
//Voer de query uit en vang het 'resultaat' op
//LET OP: het resultaat geeft aan of het wel of niet is gelukt ('true'/false')
$result = mysqli_query($mysqli,$query);
$result1 = mysqli_query($mysqli,$query1);
//Controleer of het is gelukt
if($result){
    echo "Het item is toegevoegd</br>";
    if(mysqli_num_rows($result1)>0){
    //Zolang er items uit te lezen zijn
    while($item = mysqli_fetch_assoc($result1)){
        //Toon de gegevens van het item
        echo $item['ID']." - ";
        echo $item['Naam']."<br/>";
        echo $item['Klas']."<br/>";
    }}
}
else{
    echo "FOUT bij toevoegen<br/>";
    echo mysqli_error($mysqli); //Tijdelijk (!) de foutmelding tonen
}

?>