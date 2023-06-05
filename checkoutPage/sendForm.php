<?php 
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

$servername = "";
$username = "";
$password = "";
$dbname = "";

// Create connection
$conn = mysqli_connect($servername,
$username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: "
        . $conn->connect_error);
}
// Taking all 5 values from the form data(input)
if (isset($_POST['voornaam'])){
   
    $itemsJSON = $_POST['myJson'];
    $voornaam = $_POST['voornaam'];
    $achternaam  = $_POST['achternaam'];
    $email = $_POST['e-mail'];
    
    $telefoonnummer = $_POST['telefoonnummer'];
    $adres = $_POST['adres'];
    
    $postcode = $_POST['postcode'];
    $stad = $_POST['stad'];
    $provincie = $_POST['provincie'];
    
     $sql = "INSERT INTO tabel_bestelling_test VALUES (NULL, '$itemsJSON', '$voornaam','$email','$telefoonnummer','$adres','$postcode','$stad','$provincie','Geplaatst')";
    $query = mysqli_query($conn,$sql);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form</title>
    <link rel="stylesheet" href="./media/form.css">
</head>
<body>
    <div class="container">
    <?php
  
    // if(mysqli_query($conn, $sql)){
   
    if($query){
    echo "Het formulier is succesvol verstuurd. U hoort zo snel mogelijk van ons!";
    mysqli_close($conn);
    } 
    else{
     echo "Er is een fout opgetreden: " . mysqli_error($conn); 
     mysqli_close($conn);
    }
    ?>
    <a href="../index.html" rel="noopener noreferrer">
    <button class="terug">Terug naar Shoebox</button></a>
    </div>
</body>
</html>