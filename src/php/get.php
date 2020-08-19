<?php
$url = 'http://dvfu.dewish.ru/map/api/';
$body = urlencode($_GET);
$response = file_get_contents($url);
echo $response;
?>
