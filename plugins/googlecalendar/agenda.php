<?php
header('cache-control: no-cache');
header('Content-Type: application/xml; charset=utf-8');

require_once 'GoogleAgenda.php';
require_once 'GoogleAgendaEvent.php';
require_once 'GoogleAgendaException.php';
/*
var_dump($aAujourdhui);
array(1) {
  [0]=> object(GoogleAgendaEvent)#8 (14) {
    ["_sTitle:protected"]=> string(49) "rdv agence parthenay fermette mordelles M. crochu" 
    ["_dStartDate:protected"]=> string(19) "2014-04-05 10:00:00" 
    ["_dEndDate:protected"]=> string(19) "2014-04-05 11:00:00" 
    ["_sAddress:protected"]=> string(0) "" 
    ["_sDescription:protected"]=> string(0) "" 
    ["_sAuthorName:protected"]=> string(15) "Anthony PENHARD" 
    ["_sAuthorEmail:protected"]=> string(19) "a.penhard@gmail.com" 
    ["_dPublishedDate:protected"]=> string(19) "2014-04-02 15:07:02" 
    ["_dUpdatedDate:protected"]=> string(19) "2014-04-02 15:07:25" 
    ["_sUrlDetail:protected"]=> string(93) "https://www.google.com/calendar/event?eid=MjJvc25hbHNvN282ZmdsNWZwMDltdGZsMTAgYS5wZW5oYXJkQG0" 
    ["_aPersons:protected"]=> array(1) { 
      [0]=> object(stdClass)#15 (4) { 
        ["name"]=> string(15) "Anthony PENHARD" 
        ["email"]=> string(19) "a.penhard@gmail.com" 
        ["role"]=> string(12) "Organisateur" 
        ["status"]=> string(7) "Présent" 
      } 
    } 
    ["_aReminders:protected"]=> array(3) { 
      [0]=> object(stdClass)#16 (2) { 
        ["type"]=> string(5) "email" 
        ["minutes"]=> string(2) "10" 
      } 
      [1]=> object(stdClass)#11 (2) { 
        ["type"]=> string(3) "sms" 
        ["minutes"]=> string(2) "10" 
      } 
      [2]=> object(stdClass)#17 (2) { 
        ["type"]=> string(5) "alert" 
        ["minutes"]=> string(2) "30" 
      } 
    } 
    ["_dOriginalDate:protected"]=> NULL 
    ["_bRecurs:protected"]=> bool(false) 
  }
}

https://www.google.com/calendar/feeds/a.penhard%2540gmail.com/private-4b5f9d607d4a9f4af546132b6d2e1654/full?start-min=2014-04-05%2006:00:00&amp;start-max=2014-04-06&amp;sortorder=ascending&amp;orderby=starttime&amp;max-results=10&amp;start-index=1&amp;singleevents=true&amp;futureevents=false&amp;ctz=Europe/Paris&amp;showdeleted=false&amp;

*/
date_default_timezone_set('UTC'); 
try {
    $oAgendaConges = new GoogleAgenda("https://www.google.com/calendar/feeds/a.penhard%40gmail.com/private-4b5f9d607d4a9f4af546132b6d2e1654/basic");  // Compléter ici par l'url privée de l'agenda Google
	
    $aAujourdhui = $oAgendaConges->getEvents(array(
		'startmin' => date("Y-m-d\TH:00:00"), //date(DATE_RFC3339),  // date('Y-m-d'),  // "2014-04-05 10:00:00"  // Use the RFC 3339 timestamp format. For example: 2005-08-09T10:57:00-08:00. "Y-m-d\TH:i:sP"
        'startmax' => date('Y-m-d',strtotime("+24 hours")),
        'sortorder' => 'ascending',
        'orderby' => 'starttime',
        'maxresults' => '10',
        'startindex' => '1',
        'search' => '',
        'singleevents' => 'true',
        'futureevents' => 'false',
        'timezone' => 'Europe/Paris',
        'showdeleted' => 'false'
    ));
	$aDemain = $oAgendaConges->getEvents(array(
		'startmin' => date('Y-m-d',strtotime("+24 hours")),
		'startmax' => date('Y-m-d',strtotime("+48 hours")),
		'sortorder' => 'ascending',
		'orderby' => 'starttime',
		'maxresults' => '10',
		'startindex' => '1',
		'search' => '',
		'singleevents' => 'true',
		'futureevents' => 'false',
		'timezone' => 'Europe/Paris',
		'showdeleted' => 'false'
    ));
	
	echo '<?xml version="1.0" encoding="utf8" ?>';
	echo '<conges>';
 
	if ($aAujourdhui) {  
		foreach ($aAujourdhui as $oAujourdhui) {
			echo '<aujourdhui startdate="'.$oAujourdhui->getStartDate().'" enddate="'.$oAujourdhui->getEndDate().'" >' . $oAujourdhui->getTitle() . '</aujourdhui>';
		}
	} else {
		echo '<aujourdhui>RAS</aujourdhui>'; 
	}

	if ($aDemain) { 
		foreach ($aDemain as $oDemain) {
			echo '<demain startdate="'.$oDemain->getStartDate().'" enddate="'.$oDemain->getEndDate().'" >' . $oDemain->getTitle() . '</demain>';
		}
	} else {
		echo '<demain>RAS</demain>'; 
	}

	echo '</conges>';
	
}

catch (GoogleAgendaException $e) {
    echo $e->getMessage();
}