<?php
$url = '/var/www/html/motormotorin.github.io/acmess.txt';
$body = urlencode($_GET);
$response = file_get_contents($url);
echo $response;
?>
