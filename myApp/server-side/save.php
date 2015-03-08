<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$dir = 'sqlite:watchDatabase.sqlite';
$dbh  = new PDO($dir) or die("cannot open the database");

$name = mysql_real_escape_string($_POST["postData2"]);

$query = $dbh->prepare(
    'INSERT INTO watch (name) VALUES (?)');
     $query->execute(array($name));

$query =  "SELECT * FROM watch";
foreach ($dbh->query($query) as $row)
{
    echo $row[1];
}

?>
