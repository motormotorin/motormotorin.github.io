<?php  
// имя файла, в который производиться запись POST или GET запроса
$filename = "mess.txt"; 
// имя поля в POST или GET запросе
$name_var='request';

// проверка существования файла 
if (file_exists($filename)) { 
  // если файл существует - открываем его 
  $file = fopen($filename, "w+"); 
} else { 
  // если файл не существует - создадим его 
  $file = fopen($filename, "w+"); 
} 
// данные из поля $name_var в POST или GET запросе
$text = $_POST[$name_var]; 
//$text = $_GET[$name_var]; 
//(раскомментируйте нужную строку)

// записываем строку в файл 
fwrite($file, $text); 
// закрываем файл 
fclose($file); 

// ответ скрипта на запрос
echo "The request was accepted";
?>
