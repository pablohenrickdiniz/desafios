<?php
/**
 * Created by PhpStorm.
 * User: Pablo Henrick Diniz
 * Date: 09/08/2015
 * Time: 09:10
 */


if (file_exists('js/build')) {
    @unlink('js/build');
}

$output = [];
$var = null;
$response = exec('cd js&jsx src build', $output, $var);
if ($var != 0) {
    echo 'erro ao compilar jsx';
    echo '<pre>';
    print_r($output);
    print_r($var);
}
