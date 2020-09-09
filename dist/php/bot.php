<?php

ini_set('display_errors',1); //включаем вывод ошибок
error_reporting(E_ALL);
echo "<pre>";

$filename = "../txt/mess.txt";
$name_var='request';

if (file_exists($filename)) {
  $file = fopen($filename, "a");
} else {
  $file = fopen($filename, "w+");
}

$id = sizeof(file('../txt/mess.txt'))+1 ;

$text = file_get_contents('php://input');
$text = json_decode($text, TRUE);
$text = json_encode($text, JSON_UNESCAPED_UNICODE);


$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'http://localhost:4040');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $text);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json; charset=utf-8'));
$out = curl_exec($ch);
curl_close($ch);

echo $out;

fwrite($file, $text. PHP_EOL);
fclose($file);

echo "The request was accepted","$text";
?>
