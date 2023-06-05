<?php

// include "";
// include_once "";
// require "";
// require_once "db.php";
$host = "localhost";
$username = "87231";
$password = "42Batuhan630.";
$database = "shoebox";

$db = mysqli_connect(
$host,
$username,
$password,
$database
);
$mysqli = mysqli_connect($host,$username,$password,$database);

if(!$mysqli){
    echo "FOUT: geen connectie naar database. <br>";
    echo "Error " . mysqli_connect_error() . "<br/>";
    exit; 
}
else{
    echo "Verbinding met " . $database . " is gemaakt! <br/>";
}
?>
