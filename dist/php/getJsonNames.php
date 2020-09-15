<?php
    $path = '../json/';
    $body = urlencode($_GET);
    $response = array_diff(scandir($path), array('.', '..'));
    echo $jsonFiles;
?>


