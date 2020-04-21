<?php
if($_GET['key'] && $_GET['origins'] && $_GET['destinations']){
    $key = $_GET['key'];
    $o = $_GET['origins'];
    $d = $_GET['destinations'];
    $data = 'origins='.$o.'&destinations='.$d.'&key='.$key;
    $url = 
    'https://api.distancematrix.ai/maps/api/distancematrix/json?' . $data;
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL, $url);
    $result = curl_exec($ch);
    curl_close(($ch));
    echo $result;
}
?>