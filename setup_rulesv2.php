<?php

require_once("include/common.php");
//tpl()->addJs('js/setup_rulesv2.js');

$plugins = false;
if (file_exists("plugins.php")) {
  $plugins = true;
}
tpl()->assignByRef("plugins",$plugins); 
                                          
tpl()->display('setup_rulesv2.tpl');
//tpl()->display('setup_rulesv2_sv.tpl');

?>