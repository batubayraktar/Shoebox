<?php
error_reporting(E_ALL);
//Voeg de database-verbinding toe
require "db_Config.php";
//Maak de query
$query = "SELECT * FROM `Customers`";
//Voer de query uit en vang het resultaat op
$result = mysqli_query($mysqli,$query);
//Als er records zijn...
if(mysqli_num_rows($result)>0){
//Zolang er items uit te lezen zijn
while($item = mysqli_fetch_assoc($result)){
    //Toon de gegevens van het item
    echo $item['CustomerID']." - ";
    echo $item['CompanyName']."<br/>";
    echo $item['ContactName']."<br/>";
    echo $item['ContactTitle']."<br/>";
    echo $item['Address']."<br/>";
    echo $item['City']."<br/>";
    echo $item['Region']."<br/>";
    echo $item['PostalCode']."<br/>";
    echo $item['Country']."<br/>";
    echo $item['Phone']."<br/>";
    echo $item['Fax']."<br/>";
    echo $item['Image']."<br/>";
    echo $item['ImageThumbnail']."<br/>";
}
}