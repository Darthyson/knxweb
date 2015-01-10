<?php

$file = "config_googlesms.txt";

if (isset($_GET["writeconfig"])) {
  
  $contents = "delai:=5\n";

  // e-mail du compte google agenda calendar
  if (isset($_POST["emailgoogle"])) {
    $contents.= "emailgoogle:=".$_POST["emailgoogle"]."\n";
  }
  // mot de passe
  if (isset($_POST["passgoogle"])) {
    $contents.= "passgoogle:=".$_POST["passgoogle"]."\n";
  }
  if (isset($_POST["feedxml"])) {
    $contents.= "feedxml:=".htmlspecialchars(urldecode($_POST["feedxml"]))."\n";
  }
 
  $f=file_put_contents($file, $contents);
  echo "$contents ";
  //fclose($f); 
  exit;
}

$f=fopen($file,'rb');
$data='';
while(!feof($f)) {
  $data=fgets($f);
  $tab_data = explode(":=",$data);
  switch ($tab_data[0]) {
    case "delai":
        $delai_envoi_alerte_sms = trim($tab_data[1]);
        break;
    case "emailgoogle":
        $emailgoogle = trim($tab_data[1]);
        break;
    case "passgoogle":
        $passgoogle = trim($tab_data[1]);
        break;
    case "feedxml":
        $feedxmlprive = trim($tab_data[1]);
        break;
  }
}
fclose($f); 

if (isset($_GET["displayconfig"])) { 
  echo "$delai_envoi_alerte_sms ** $emailgoogle ** $passgoogle ** $feedxmlprive";
}
/*
$delai_envoi_alerte_sms = 5; // 5 minutes par défaut
//$emailgoogle = "a.penhard@gmail.com"; // e-mail du compte google agenda calendar
$emailgoogle = (isset($_POST["emailgoogle"])?$_POST["emailgoogle"]:"");
//$passgoogle = "energy01"; // mot de passe
$passgoogle = (isset($_POST["passgoogle"])?$_POST["passgoogle"]:"");

$feedxmlprive = "";
if (isset($_POST["feedxml"])) {
  //$feedxmlprive = "https://www.google.com/calendar/feeds/thf05ttfjkce3ppemmehll63ig%40group.calendar.google.com/private-3734d5f5bdb8b677107fc3fb8a9f7156/basic";
  $feedxmlprive = htmlspecialchars(urldecode($_POST["feedxml"]));
}
if ($feedxmlprive=="") {
  echo "KO:Erreur pas de Feed Xml";
  exit;
} 

*/


?>