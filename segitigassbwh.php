<?php
  echo "<pre>";
 
  $tinggi_piramida = 5;
  for($i = $tinggi_piramida; $i >= 1; $i--) {
    for($j = 1; $j <= $tinggi_piramida - $i; $j++) {
      echo " ";
    }
    for($k = 1; $k <= $i; $k++) {
      echo " *";
    }
    echo "<br>";
  }
 
  echo "</pre>";
?>
