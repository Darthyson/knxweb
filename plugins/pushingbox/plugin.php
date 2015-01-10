<?php
function knxsend($sock, $cmd)
{
    $in = "$cmd\n\4";
    fwrite($sock, $in);
    $ret = '';
    $cnt = 0;
    while ($cnt < 1000 && $sock && !feof($sock)) {
        $ret .= fgets($sock, 128);
        $c = fgetc($sock);
        if ($c == "\4") {
            return $ret;
        }
        $ret .= $c;
        $cnt++;
    }
    return $ret;
}

$object_id = $_GET['object_id'];
$object_name = $_GET['object_name'];
$object_status = $_GET['object_status'];
$devid = $_GET['devid'];  // v54E1655CBF7E7EF

error_reporting(0);
$linknx_host = "127.0.0.1";
$linknx_port = 1028;
$sock = fsockopen($linknx_host, $linknx_port, $errno, $errstr, 30);

echo "----";   
echo $object_status;
echo "----";
   
if (!$sock)
  $result = "<response status='error'>Unable to connect to linknx</response>\n";
else {
      
  $res="<read><object id=\"$object_id\"/></read>";
     $send=stripslashes($res);
     $result = knxsend($sock, $send);
  echo "**";   
  print $result;
  echo "**";
 
  $txt1='http://api.pushingbox.com/pushingbox?devid='.$devid.'&lemessage=';

  if  ((strpos($result, "on")) && ($object_status=="off"))
  {
      $res="<write><object id=\"$object_id\" value=\"off\"/></write>";
      $send=stripslashes($res);
      $result = knxsend($sock, $send);
      $valeur ="éteint";
  } else {
      $res="<write><object id=\"$object_id\" value=\"on\"/></write>";
      $send=stripslashes($res);
      $result = knxsend($sock, $send);
      $valeur ="allumé";

  }   
  $txt2=str_replace(" ","%20",$object_name . ' est maintenant ' . $valeur);
  $txt=$txt1 . $txt2;
  $ch = curl_init($txt);
  print $txt;
  curl_exec ($ch);
  curl_close ($ch);
  fclose($sock);
}
?>