<!DOCTYPE html>

<html>
 <head>
  <title>Strona główna</title>
  <meta charset="utf-8">
  <link rel="stylesheet" href="styl.css">
 
</head>
 <body>
 
<div id="baner">
<a href="index.html"><img src="baner.jpg" alt="baner"></a>
</div> 

<div id="menu">
<p>Menu:</p>
<a href="strona1.html">- Proste działania</a> 
<br>
<a href="strona2.php">- Potęgowanie</a>
</div>

<div id="tresc">   

<main>

<h1>POTĘGOWANIE</h1>

<form method="post" action="strona2.php">
<i>Podaj podstawę potęgi:</i>
<input type="number" name="liczba1" /><br/> 
<br> 
<i>Podaj dodatni, całkowity wykładnik potęgi:</i> 
<input type="number" name="liczba2" /><br/> <br>  
<input type="submit" value="POTĘGOWANIE" name="oblicz"/>
</form>
<br> 
   
    
<?php
if (empty($_POST['liczba1']) || (empty($_POST['liczba2'])
 && $_POST['liczba2']!=0)) {
    
    echo "Wpisz podstawę i wykładnik potęgi";
}
else {
 if ($_POST['liczba2']>=0) {    

echo "Wynik działania wynosi: ";
 echo pow($_POST['liczba1'], $_POST['liczba2']);
 }
 else {
 echo "Wykładnik potęgi musi być dodatni";
 }
}  

?>


</main> 
</body>
</html>