<?php 
$servername = "localhost";
$username = "";
$password = "";
$dbname = "";
// Create connection
$conn = new mysqli($servername,
$username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: "
        . $conn->connect_error);
}
// Taking all 5 values from the form data(input)
if (isset($_REQUEST['Naam'])){

    $naam = $_REQUEST['Naam'];
    $email = $_REQUEST['Email'];
    $telefoonnummer = $_REQUEST['Nummer'];
    $contactreden = $_REQUEST['Reden'];
    $bericht = $_REQUEST['Vraag'];

    $sql = "INSERT INTO tabel_formulier  VALUES (NULL,'$naam',
    '$email','$telefoonnummer','$contactreden','$bericht')";

    
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
    if(mysqli_query($conn, $sql)){
        echo "Het formulier is succesvol verstuurd. U hoort zo snel mogelijk van ons!";
        mysqli_close($conn);
    } 
    else{
        echo "Er is een fout opgetreden: " .
         mysqli_error($conn); 
         mysqli_close($conn);
    }
    ?>
    <a href="contactPage.html" rel="noopener noreferrer">
    <button class="terug">Terug naar Shoebox</button></a>
    </div>
</body>
</html>