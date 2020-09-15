<?php
$url = '../txt/acmess.txt';
$body = urlencode($_GET);
$response = file_get_contents($url);
echo $response;
?>
