/*

util : https://x2js.googlecode.com/hg/demo.html

<rule id="ID_rule" description="Description" init="false" >
  <condition type="and">
    <condition type="timer" trigger="true" >
      <at hour="10" min="00" day="" month="" year="" wdays="367"></at>
      <during>2h</during>
    </condition>
    <condition type="not">
      <condition type="object" id="lampe_cuisine_1.001" op="eq" value="on" trigger="true" ></condition>
    </condition>
  </condition>
  <actionlist type="if-true">
    <action type="set-value" value="off" id="lampe_cuisine_1.001" delay="5" ></action>
    <action type="set-value" value="on" id="lampe_plf_chambre_1_1.001" delay="" ></action>
  </actionlist>
  <actionlist type="if-false"></actionlist>
</rule>
{"rule":{"condition":{"condition":[{"at":{"_hour":"10","_min":"00","_day":"","_month":"","_year":"","_wdays":"367"},"during":"2h","_type":"timer","_trigger":"true"},{"condition":{"_type":"object","_id":"lampe_cuisine_1.001","_op":"eq","_value":"on","_trigger":"true"},"_type":"not"}],"_type":"and"},"actionlist":[{"action":[{"_type":"set-value","_value":"off","_id":"lampe_cuisine_1.001","_delay":"5"},{"_type":"set-value","_value":"on","_id":"lampe_plf_chambre_1_1.001","_delay":""}],"_type":"if-true"},{"_type":"if-false"}],"_id":"ID_rule","_description":"Description","_init":"false"}}
*/

function RuleToXML(json) {
  //console.log("rule", json);
/*
document.getElementsByName("id_rule")[0].value
document.getElementsByName("description")[0].value
document.getElementsByName("init")[0].checked

json.id
json.active=="no"
json.init=="false"
*/
 
  xml = "<xml>";
  xml = xml + '<block type="default_rule" id="1" inline="false" deletable="false" movable="false" x="0" y="0">'; //movable="false"
  //if-true ou on-true => json.actionlist[0]._type   et if-false ou on-false => json.actionlist[1]._type
  if (json.actionlist) {
    if (!json.actionlist[0]) {
      // Que 1 seule actionlist
      if (!json.actionlist.type || json.actionlist.type == "if-true" || json.actionlist.type == "on-true") {
        json.actionlist[0] = json.actionlist;
        if (!json.actionlist.type) json.actionlist[0].type = "if-true";
        if (json.actionlist[0].type == "on-true") json.actionlist[1] = { "type":"on-false" };
        else json.actionlist[1] = { "type":"if-false" };
      } else {
        json.actionlist[1] = json.actionlist;
        if (json.actionlist[1].type == "on-false") json.actionlist[0] = { "type":"on-true" };
        else json.actionlist[0] = { "type":"if-true" };
      }
    }
  } else {
    // pas d'action dans la rule
    json.actionlist = [{ "type":"if-true" }, { "type":"if-false" }];
  }
  xml = xml + '<field name="true_type">'+json.actionlist[0].type+'</field><field name="false_type">'+json.actionlist[1].type+'</field>'; 
/*     

<value name="conditions">
 '+json.inline+'
*/     
  xml = xml + '<value name="conditions">';
  
  var condition = json.condition;
  
  if (condition) xml = xml + conditionToXml(condition);
  
  
  xml = xml + '</value>';
  
  // Actions :
  //actionslist_true
  
  xml = xml + '<statement name="actionslist_true">';
  if (json.actionlist[0].action) {
    if (json.actionlist[0].action[0]) {
      xml = xml + actionToXml(json.actionlist[0].action[0]);
      for (var i=1;i<json.actionlist[0].action.length;i++)
      {
        xml = xml + '<next>' + actionToXml(json.actionlist[0].action[i]);// + '</next>';
      }
      for (var i=1;i<json.actionlist[0].action.length;i++)
      {
        xml = xml + '</block></next>';
      }
    } else xml = xml + actionToXml(json.actionlist[0].action);
    xml = xml + '</block>';
  }
  xml = xml + '</statement>';
  
  //actionslist_false
  
  xml = xml + '<statement name="actionslist_false">';
  if (json.actionlist[1].action) {
    if (json.actionlist[1].action[0]) {
      if (json.actionlist[1].action[0]) xml = xml + actionToXml(json.actionlist[1].action[0]);
      for (var i=1;i<json.actionlist[1].action.length;i++)
      {
        xml = xml + '<next>' + actionToXml(json.actionlist[1].action[i]);// + '</next>';
      }
      for (var i=1;i<json.actionlist[1].action.length;i++)
      {
        xml = xml + '</block></next>';
      }
    } else xml = xml + actionToXml(json.actionlist[1].action);
    xml = xml + '</block>';
  }
  xml = xml + '</statement>';  
  
  xml = xml + '</block></xml>';   
  
  //console.log('rule', json, xml);
  return xml;
} 

function actionToXml(action) {
  var xml = '';
  var type = action.type;
  switch (type) {
    case 'set-value' :
      xml = xml + '<block type="action_set_value" id="" inline="true"><field name="id">'+action.id+'</field><field name="value">'+action.value+'</field>';
      break;
    case 'copy-value' :
      xml = xml + '<block type="action_set_object" id="" inline="true"><field name="from">'+action.from+'</field><field name="to">'+action.to+'</field>';
      break;
    case 'toggle-value' :
      xml = xml + '<block type="action_toggle-value" id="" inline="true"><field name="id">'+action.id+'</field>';
      break;
    case 'set-string' :
      // TODO a voir ...
      xml = xml + '<block type="action_set_value" id="" inline="true"><field name="id">'+action.id+'</field><field name="value">'+action.value+'</field>';
      break;
    case 'send-read-request' :
      xml = xml + '<block type="action_send-read-request" id="" inline="true"><field name="id">'+action.id+'</field>';
      break;
    case 'cycle-on-off' :
      // TODO ...
      xml = xml + '<block type="action_cycle-on-off" id="" inline="true"><field name="id">'+action.id+'</field><statement name="actions">';
      /*
      div[0].objid='';
      div[0].on='';
      div[0].off='';
      div[0].count='';
      */
      xml = xml + actionToXml(action.action);
      xml = xml + '</statement>';
      break;
    case 'repeat' :
      // TODO a vérifier
      xml = xml + '<block type="action_repeat" id="" inline="true"><field name="period">'+action.period+'</field><field name="count">'+action.count+'</field><statement name="actions">';
      if (action.action[0]) xml = xml + actionToXml(action.action[0]);
      else xml = xml + actionToXml(action.action);
      for (var i=1;i<action.action.length;i++)
      {
        xml = xml + '<next>' + actionToXml(action.action[i]);// + '</next>';
      }
      for (var i=1;i<action.action.length;i++)
      {
        xml = xml + '</block></next>';
      }
      xml = xml + '</block></statement>';
      break;
    case 'conditional' :
      // TODO a vérifier
      xml = xml + '<block type="action_Conditional" id="" inline="false"><statement name="condition">';
      if(action.condition) xml = xml + conditionToXml(action.condition);
      xml = xml + '</statement>';
      xml = xml + '<statement name="actions">';
      if (action.action[0]) xml = xml + actionToXml(action.action[0]);
      else xml = xml + actionToXml(action.action);
      for (var i=1;i<action.action.length;i++)
      {
        xml = xml + '<next>' + actionToXml(action.action[i]);// + '</next>';
      }
      for (var i=1;i<action.action.length;i++)
      {
        xml = xml + '</block></next>';
      }
      xml = xml + '</block></statement>';
      break;
    case 'send-sms' :
      xml = xml + '<block type="action_send-sms" id="" inline="true"><field name="id">'+action.id+'</field><field name="value">'+action.value+'</field>';
      break;
    case 'send-email' :
      xml = xml + '<block type="action_send-email" id="" inline="true"><field name="to">'+action.to+'</field><field name="subject">'+action.subject+'</field><field name="message">'+action.$+'</field>';
      break;
    case 'dim-up' :
      xml = xml + '<block type="action_dim-up" id="" inline="true"><field name="id">'+action.id+'</field><field name="start">'+action.start+'</field>';
      xml = xml + '<field name="stop">'+action.stop+'</field><field name="duration">'+action.duration+'</field>';
      break;
    case 'shell-cmd' :
      xml = xml + '<block type="action_shell-cmd" id="" inline="true"><field name="cmd">'+action.cmd+'</field>';
      break;
    case 'ioport-tx' :
    // TODO ...
    /*
      div[0].hex=false;
      div[0].data='';
      div[0].ioport='';
      div[0].ioportvar=false;
      */
      break;
    case 'script' :
      // TODO  récupérer donné action.script (pas un attribut !!)
      xml = xml + '<block type="action_script" id="" inline="true"><mutation>'+action.$+'</mutation><field name="script">'+action.$+'</field>'; //'+action.nodeValue+' '+action.script+'
      break;
    case 'formula' :
      xml = xml + '<block type="action_formula" id="" inline="false"><field name="id">'+action.id+'</field><field name="x">'+action.x+'</field>';
      xml = xml + '<field name="y">'+action.y+'</field><field name="a">'+action.a+'</field><field name="b">'+action.b+'</field>';
      xml = xml + '<field name="c">'+action.c+'</field><field name="m">'+action.m+'</field><field name="n">'+action.n+'</field>';
      break;
    case 'cancel' :
      xml = xml + '<block type="action_Cancel" id="" inline="true"><field name="rule_id">'+action.rule-id+'</field>';
      break;
    case 'start-actionlist' :
      xml = xml + '<block type="action_start-actionlist" id="" inline="true"><field name="rule_id">'+action.rule-id+'</field><field name="list">'+action.list+'</field>';
      break;
    case 'set-rule-active' :
      xml = xml + '<block type="action_set-rule-active" id="" inline="true"><field name="rule_id">'+action.rule-id+'</field><field name="active">'+action.active+'</field>';
      break;
  };
  //xml = xml + '</block>'; // géré par l'appelant car enchaine plusieurs action et gestion de "<next ..."
  xml = xml + '<field name="delay">'+((action.delay)?action.delay:'')+'</field>';
   
  return xml;
}

function conditionToXml(condition) {
  var xml = '';
  //console.log('condition',condition);
  var type = condition.type;
  switch (type) {
    case "value":
      /*
      <block type="value" id="58">
        <field name="value">on</field>
      </block>
      */
      xml = xml + '<block type="value" id=""><field name="value">'+condition.getAttribute('value')+'</field></block>';
      break;
    case "object":
    case "object-compare":
      /*
      <block type="condition_object" id="50" inline="true">
        <field name="id">lampe_cuisine_1.001</field>
        <field name="op">eq</field>
        <field name="trigger">TRUE</field>
        <value name="id2">
          <block type="value" id="58">
            <field name="value">on</field>
          </block>
        </value>
      </block>
      */
      xml = xml + '<block type="condition_object" id="" inline="true">';
      xml = xml + '<field name="id">'+condition.id+'</field>';
      xml = xml + '<field name="op">'+((condition.op)?condition.op:'eq')+'</field>';
      xml = xml + '<field name="trigger">'+((condition.trigger == "true")?"TRUE":"FALSE")+'</field>';
      xml = xml + '<value name="id2">';
      //xml = xml + conditionToXml ("value", '<condition value="'+condition.getAttribute('value')+'" ></condition>'):
      if (type == "object")
        xml = xml + '<block type="value" id=""><field name="value">'+condition.value+'</field></block>';
      if (type == "object-compare")
        xml = xml + '<block type="list_objects" id=""><field name="object">'+condition.id2+'</field></block>';
      xml = xml + '</value></block>';
      
      break;
    case "object-src":
    // TODO ...
      /*div[0].objectsrc_operation=condition.getAttribute('op');
      if(!div[0].objectsrc_operation) div[0].objectsrc_operation='eq';
      div[0].objectsrc_value=condition.getAttribute('value');
      div[0].objectsrc_trigger=condition.getAttribute('trigger');
      div[0].objectsrc_src=condition.getAttribute('src');
      */
      break;
    case "time-counter":
      /*div[0].endpoint = [];
      div[0].endpoint[1] = jsPlumb.addEndpoint(div, $.extend({ anchor:[0, 0.5, 0, 0] }, inputEndpoint));
      div[0].timecounter_threshold=condition.getAttribute('threshold');
      div[0].timecounter_resetdelay=condition.getAttribute('reset-delay');
      rulesCondition.positionCondition(type, condition, numcondition, div);
      var k = 1;
      collonne_condition++;
      pos_top_condition[collonne_condition] = 0;
      $(condition).children("condition").each(function () {
        var condition2 = addConditionRule(this.getAttribute('type'), this, numcondition);
        if (condition2[0].type == "and" || condition2[0].type == "or") {
          jsPlumb.connect({source:condition2[0].endpoint[0], target:div[0].endpoint[k]});
        } else {
        jsPlumb.connect({source:condition2[0].endpointout, target:div[0].endpoint[k]});
        }
        if (k > 1) messageBox(tr("Maximum number of condition for reaching this time-counter"),tr("Condition time-counter"),"alert");
        k++;
      });
      if (collonne_condition>1) collonne_condition--;*/
      break;
    case "timer":
    /*
<block type="condition_timer" id="" inline="false">
  <mutation atevery="at" untilduring="during"></mutation>
  <field name="AtEvery">at</field>
  <field name="at_exception"></field>
  <field name="UntilDuring">during</field>
  <field name="during">2h</field>
  <field name="trigger">TRUE</field>
  <value name="at">
    <block type="timer_hour" id="">
      <field name="hour">10</field>
      <field name="minute">00</field>
      <field name="day"></field>
      <field name="month"></field>
      <field name="year"></field>
    </block>
  </value>
  <value name="at_wdays">
    <block type="timer_weekdays" id="">
      <field name="J1">FALSE</field>
      <field name="J2">FALSE</field>
      <field name="J3">FALSE</field>
      <field name="J4">TRUE</field>
      <field name="J5">FALSE</field>
      <field name="J6">TRUE</field>
      <field name="J7">TRUE</field>
    </block>
  </value>
</block>
    */
      var AtEvery = ((condition.every)?'every':'at');
      var UntilDuring = ((condition.during)?'during':((condition.until)?'until':''));
      //var UntilDuring = ((condition.during)?'during':'until');
      xml = xml + '<block type="condition_timer" id="" ><mutation atevery="'+AtEvery+'" untilduring="'+UntilDuring+'"></mutation>';
      xml = xml + '<field name="AtEvery">'+AtEvery+'</field>';
      if (AtEvery=='every') {
        xml = xml + '<field name="every">'+condition.every+'</field>';
      } else {
        if(condition.at.exception) {
          xml = xml + '<field name="at_exception">'+condition.at.exception+'</field>';
        } else xml = xml + '<field name="at_exception"></field>';
      }
      xml = xml + '<field name="UntilDuring">'+UntilDuring+'</field>';
      
      if (UntilDuring=='during') {
        xml = xml + '<field name="during">'+condition.during+'</field>';
      } else {
        if(condition.until && condition.until.exception) {
          xml = xml + '<field name="until_exception">'+condition.until.exception+'</field>';
        } //else xml = xml + '<field name="until_exception"></field>';
      }
      xml = xml + '<field name="trigger">'+((condition.trigger=="true")?'TRUE':'FALSE')+'</field>';

      if (AtEvery=='at') {
        xml = xml + timerDetail(condition.at, 'at');
      }
      if (condition.until && UntilDuring=='until') {
        xml = xml + timerDetail(condition.until, 'until');
      }
      
      xml = xml + '</block>';
      break;
    case "ioport-rx": // <condition type="" expected="" ioport="" trigger="true"/>
    // TODO ...
      /*div[0].ioport_expected=condition.getAttribute('expected');                                                              
      div[0].ioport_ioport=condition.getAttribute('ioport');
      div[0].ioport_trigger=condition.getAttribute('trigger');
// new in Linknx 0.0.1.31 ajout des attributs : regex="(true/)false" hex="(true/)false"  object0="" object1="" objectx="" ... 
      div[0].ioport_object0=condition.getAttribute('object0');
      div[0].ioport_object1=condition.getAttribute('object1');
      div[0].ioport_object2=condition.getAttribute('object2');
      div[0].ioport_object3=condition.getAttribute('object3');
      div[0].ioport_regex=condition.getAttribute('regex');
      div[0].ioport_hex=condition.getAttribute('hex');
      */
      var nb_items = 1;
      var objects_xml = '';
      var i = 0;
      if (condition.object0) objects_xml = objects_xml + '<value name="object'+i+'"><block type="list_objects" id="Object'+i+'"><field name="object">'+eval('condition.object'+i)+'</field></block></value>';
      else objects_xml = objects_xml + '<value name="object'+i+'"><field name="Object'+i+'"></field></value>';
      i++;
       
      while (eval('condition.object'+i)) {
        objects_xml = objects_xml + '<value name="object'+i+'"><block type="list_objects" id="Object'+i+'"><field name="object">'+eval('condition.object'+i)+'</field></block></value>';
        i++;
        nb_items++;
      }
      
      xml = xml + '<block type="condition_ioport-rx" id="" inline="true"><mutation items="'+nb_items+'"></mutation>';
      xml = xml + '<field name="ioport">'+condition.ioport+'</field>';
      xml = xml + '<field name="expected">'+condition.expected+'</field>';
      
      xml = xml + '<field name="regex">'+((condition.regex == "true")?"TRUE":"FALSE")+'</field>';
      xml = xml + '<field name="hex">'+((condition.hex == "true")?"TRUE":"FALSE")+'</field>';
            
      xml = xml + '<field name="trigger">'+((condition.trigger == "true")?"TRUE":"FALSE")+'</field>';
      
      xml = xml + objects_xml;

      xml = xml + '</block>'; 
      
      
      
      break;
    case "ioport-connect": 
    // TODO ...
      /*div[0].ioport_ioport=condition.getAttribute('ioport');
      div[0].ioport_trigger=condition.getAttribute('trigger');
      */break;
    case "script":
    // TODO ...
      //div[0].script=condition.textContent;
      break;
    case "and":
    case "or":
/*
<block type="condition_AND_OR" id="25" inline="false">
  <mutation items="2"></mutation>
  <field name="type">and</field>
  <value name="ADD0">
    <block ...</block>
  </value>
  <value name="ADD1">
    <block...</block>
  </value>
</block>
*/
      xml = xml + '<block type="condition_AND_OR" id="" inline="false"><mutation items="'+condition.condition.length+'"></mutation><field name="type">'+condition.type+'</field>';
      for (var i = 0; i < condition.condition.length; i++) {
        xml = xml + '<value name="ADD'+i+'">' + conditionToXml(condition.condition[i]) + '</value>';
      }
      xml = xml + '</block>';
      break;
    case "not":
/*
<block type="condition_not" id="44" inline="false">
  <value name="NOT">
    <block ...</block>
  </value>
</block>
*/
      xml = xml + '<block type="condition_not" id="" inline="false"><value name="NOT">';
      if (condition.condition) xml = xml + conditionToXml(condition.condition);
      xml = xml + '</value></block>';
      break;
  };
  return xml;
}

function timerDetail( condition, atUntil) {
  var xml = '<value name="'+atUntil+'">';
  if(condition.type == "variable" ) {
    if(condition.date ) {
      xml = xml + '<block type="timer_date_object" id="" inline="false"><field name="object">'+condition.date+'</field><value name="date">';
    }
    if(condition.time ) {
      xml = xml + '<block type="timer_hour_object" id="" inline="false"><field name="object">'+condition.time+'</field><value name="date">';
    }
    if(condition.hour || condition.min || condition.day || condition.month || condition.year) {
      xml = xml + '<block type="timer_hour" id=""><field name="hour">'+((condition.hour)?condition.hour:'')+'</field><field name="minute">'+((condition.min)?condition.min:'')+'</field>';
      xml = xml + '<field name="day">'+((condition.day)?condition.day:'')+'</field><field name="month">'+((condition.month)?condition.month:'')+'</field><field name="year">'+((condition.year)?condition.year:'')+'</field></block>';
    }
    xml = xml + '</value></block>';
  } else if(condition.type == "sunrise" || condition.type == "sunset" || condition.type == "noon") {
    xml = xml + '<block type="timer_type" id="" inline="false"><field name="timer_type">'+condition.type+'</field><field name="offset">'+((condition.offset)?condition.offset:'')+'</field>';
    xml = xml + '<field name="day">'+((condition.day)?condition.day:'')+'</field><field name="month">'+((condition.month)?condition.month:'')+'</field><field name="year">'+((condition.year)?condition.year:'')+'</field></block>';
  } else if(condition.hour || condition.min || condition.day || condition.month || condition.year) {
    xml = xml + '<block type="timer_hour" id=""><field name="hour">'+((condition.hour)?condition.hour:'')+'</field><field name="minute">'+((condition.min)?condition.min:'')+'</field>';
    xml = xml + '<field name="day">'+((condition.day)?condition.day:'')+'</field><field name="month">'+((condition.month)?condition.month:'')+'</field><field name="year">'+((condition.year)?condition.year:'')+'</field></block>';
  }
  xml = xml + '</value><value name="'+atUntil+'_wdays">';
  if(!condition.wdays) condition.wdays ='1234567'; 
  xml = xml + '<block type="timer_weekdays" id="">';
  var wdays = [];
  for(var j=0;j<condition.wdays.length;j++) wdays[condition.wdays[j]] = true;
  for(var i=1;i<=7;i++) {
    if ( wdays[i] == true)
      xml = xml + '<field name="J' + i + '">TRUE</field>';
    else
      xml = xml + '<field name="J' + i + '">FALSE</field>';
  }
  xml = xml + '</block>';
  xml = xml + '</value>';
  return xml;        
}




/*

XML to json :
http://davidwalsh.name/convert-xml-json
*/

// Changes XML to JSON
function xmlToJson(xml) {
	
	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};

//{"read":{"status":"success","config":{"objects":{"object":[{"type":"11.001","id":"cur_date","gad":"1\/1\/201","flags":"cwtus","$":"Current Date"},{"type":"10.001","id":"cur_time","gad":"1\/1\/200","$":"Current Time"},{"type":"1.001","id":"test_on_off","gad":"1\/1\/1","$":"Objet test"}]},"rules":{"rule":[{"id":"cur_time_date","init":"false","condition":{"type":"timer","trigger":"true","every":"1h"},"actionlist":{"action":[{"type":"set-value","id":"cur_time","value":"now"},{"type":"set-value","id":"cur_date","value":"now"}]}},{"id":"cur_time_date_2","active":"no","description":"qsdqsda","init":"false","condition":{"type":"timer","trigger":"true","every":"1h"},"actionlist":{"action":[{"type":"set-value","id":"cur_time","value":"now"},{"type":"set-value","id":"cur_date","value":"now"}]}}]},"services":{"smsgateway":[],"emailserver":[],"xmlserver":{"type":"inet","port":"1028"},"knxconnection":{"url":"ip:127.0.0.1"},"exceptiondays":{"date":[{"day":"1","month":"1"},{"day":"1","month":"5"},{"day":"15","month":"8"},{"day":"25","month":"12"},{"day":"21","month":"4","year":"2014"},{"day":"29","month":"5","year":"2014"},{"day":"9","month":"6","year":"2014"}]},"ioports":[]},"logging":[]}}};
