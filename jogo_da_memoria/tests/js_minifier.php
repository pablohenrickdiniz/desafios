<?php
/**
 * Created by PhpStorm.
 * User: Pablo Henrick Diniz
 * Date: 09/08/2015
 * Time: 09:11
 */

set_time_limit(800);
$files = scandir('js/build');
$result['erros'] = [];
foreach($files as $file){
    $ext = pathinfo($file,PATHINFO_EXTENSION);
    $name = pathinfo($file,PATHINFO_FILENAME);
    if($ext == 'js'){
        $command = 'java -jar compiler.jar --js_output_file=js/dist/'.$name.'.min.js js/build/'.$file;
        exec($command,$output,$var);
        if ($var != 0) {
            $results['erros'][] = 'Errona compilação do arquivo '.$file.'!';
        }
    }
}
echo json_encode($result);





