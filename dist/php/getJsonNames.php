<?php
$path = './json/';
$files = array_diff(scandir($path), array('.', '..'));
$jsonFiles = json_encode($files, true);
header('Content-type:application/json;charset=utf-8');
echo $jsonFiles;

// echo file_get_contents("../json/layer_7gdt8bfan.json");
?>


