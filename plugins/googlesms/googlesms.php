<?
error_reporting(E_ALL);

header("Content-Type: text/html"); 

/*
** Envoi un SMS gratuitement via Google Agenda (Calendar). Créez un Agenda Google, et choisissez la notification par SMS à 5 min.
** Envoie un sms en ajoutant l'évenement 5minutes et 30 secondes plus tard.
** Le texto est envoyé dans les 5 secondes qui suivent l'envoi
** http://macsim.labolinux.net/index.php/post/2008/02/15/137-smsalert-envoyer-des-sms-gratuitement-depuis-ses-serveurs
*/
date_default_timezone_set("Europe/Paris");

$delai_envoi_alerte_sms = 5; // 5 minutes par défaut
$emailgoogle = ""; // e-mail du compte google agenda calendar
$passgoogle = ""; // mot de passe

/* Enregistrez vos SMS dans un agenda google différent de celui par défaut. Utile pour ne pas mélanger les SMS avec les autres événements. 
 * Voir dans Google Agenda -> Paramètres de l'agenda -> Adresse URL privée, et copiez l'adresse XML. 
 * Sinon, laissez vide pour que ce message soit dans l'agenda principal par défaut: $feedxmlprive = "";
 */
$feedxmlprive = "";

include "config.php";

include "GoogleCalendarWrapper.php";

$titre = "";
if (isset($_POST["titre"])) {
  $titre = preg_replace("/[^a-zA-Z0-9éÉèÈçÇàÀùÙâÂêÊîÎôÔûÛäÄëËïÏöÖüÜÿŸœŒæÆ@€\,\.\!\? \'\’\(\)\/\-\:\+]/i",'', $_POST["titre"]);
  $titre = preg_replace("/[\']/i",'’', $titre);
}
$where = "";
if (isset($_POST["where"])) {
  $where = preg_replace("/[^a-zA-Z0-9éÉèÈçÇàÀùÙâÂêÊîÎôÔûÛäÄëËïÏöÖüÜÿŸœŒæÆ@€\,\.\!\? \'\’\(\)\/\-\:\+]/i",'', $_POST["where"]);
  $where = preg_replace("/[\']/i",'’', $where);
}

echo "titre=$titre / where=$where";

//exit; // pour les tests on sort là...


/* Dans la partie Description de l'événement inscrit dans l'agenda, on enregistre les date et heure ainsi que l'adresse IP. Ces données ne sont pas visibles dans le SMS. */
/* fonction recuperation IP */
function get_ip() { 
  if(isset($_SERVER['HTTP_X_FORWARDED_FOR'])) { $ip = $_SERVER['HTTP_X_FORWARDED_FOR']; } 
  elseif(isset($_SERVER['HTTP_CLIENT_IP'])) { $ip = $_SERVER['HTTP_CLIENT_IP']; } 
  else { $ip = $_SERVER['REMOTE_ADDR']; } 
  return $ip;
}
/* enregistrement ip et de son host */ 
$ip = get_ip();
$nomhote = gethostbyaddr($ip); 
/* date et heure réelles */
@setlocale(LC_TIME, 'fr_FR.utf-8');
$jour  = strftime("%A %d %B %Y");
$heure = date("H:i");

$contenu = 0;
$contenu = "Demande faite le $jour, $heure. \n";
$contenu .= "Adresse internet: $nomhote - $ip  \n";
$contenu .= "Envoyé par : Linknx KnxWeb \n";


/* on fixe la date et l'heure à include dans l'agenda Google */
/*
** Réglage temporel
** Réglé par Seza http://www.paradoxal.org/blog/
*/

$dt = new dateTime();
$dt->setTimeZone(new DateTimeZone("Europe/Paris"));
$dt->modify('+ '.$delai_envoi_alerte_sms.' minutes + 30 seconds');
//$dt->modify('+ 5 minutes + 30 seconds');
$now = $dt->format(DateTime::RFC3339);
$dt->modify('+ 15 seconds');
$now15sec = $dt->format(DateTime::RFC3339);

$s = array();
$s["title"] = $titre;
$s["content"] = $contenu;
$s["where"] = $where;
$s["startTime"] = $now;
$s["endTime"] = $now15sec;

if ($titre != ""){
  $gc = new GoogleCalendarWrapper("$emailgoogle", "$passgoogle"); // mettre adresse e-mail et mot de passe Google Calendar Agenda
  
  if ($feedxmlprive){ $gc->feed_url = "$feedxmlprive"; }
  
  if($gc->add_event($s)) {
    echo "OK:<strong>Envoi SMS [ OK ]</strong><br /> <strong>Heure:</strong> ".$now."<br /> <strong>Titre:</strong> ".$titre." <br /> <strong>Where:</strong> ".$where."<br />".$contenu."\n";
  } else {
    echo "KO:<strong>Erreur Envoi Message</strong> ".$s['startTime']." \n";
    //print_r($s);
  }
}

?>