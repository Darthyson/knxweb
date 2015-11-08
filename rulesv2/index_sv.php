<?php
if (isset($_GET["lang"])) $lang = $_GET["lang"];
else $lang = "fr";

?>
<!DOCTYPE html>
<html lang="<?php echo $lang; ?>">
<head>
  <meta charset="utf-8">
  <title>Blockly Test création Rules Linknx</title>
  <meta name="google" content="notranslate" /> <!-- TODO a enlever ... -->
  <script type="text/javascript" src="js/blockly_compressed.js"></script>
  <script type="text/javascript" src="js/javascript_compressed.js"></script>
  <script type="text/javascript" >
var list_objects = [['-:|Choose an object|:-', ''],
['lampe cuisine0', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 0', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine1', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 1', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine2', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 2', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine3', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 3', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine4', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 4', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine5', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 5', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine6', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 6', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine7', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 7', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine8', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 8', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine9', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 9', 'lampe_plf_chambre_1_1.001'],

['lampe cuisine10', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 10', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine11', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 11', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine12', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 12', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine13', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 13', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine14', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 14', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine15', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 15', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine16', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 16', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine17', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 17', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine18', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 18', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine19', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 19', 'lampe_plf_chambre_1_1.001'],

['lampe cuisine20', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 20', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine21', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 21', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine22', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 22', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine23', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 23', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine24', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 24', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine25', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 25', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine26', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 26', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine27', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 27', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine28', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 28', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine29', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 29', 'lampe_plf_chambre_1_1.001'],

['lampe cuisine30', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 30', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine31', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 31', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine32', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 32', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine33', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 33', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine34', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 34', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine35', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 35', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine36', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 36', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine37', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 37', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine38', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 38', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine39', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 39', 'lampe_plf_chambre_1_1.001'],

['lampe cuisine40', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 40', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine41', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 41', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine42', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 42', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine43', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 43', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine44', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 44', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine45', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 45', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine46', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 46', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine47', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 47', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine48', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 48', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine49', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 49', 'lampe_plf_chambre_1_1.001'],

['lampe cuisine50', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 50', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine51', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 51', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine52', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 52', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine53', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 53', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine54', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 54', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine55', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 55', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine56', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 56', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine57', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 57', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine58', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 58', 'lampe_plf_chambre_1_1.001'],
['lampe cuisine59', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 59', 'lampe_plf_chambre_1_1.001'],

];
    var list_objects_1_001 = [['-:|Choose an object|:-', ''], ['lampe cuisine', 'lampe_cuisine_1.001'], ['ampoule plafond chambre 1', 'lampe_plf_chambre_1_1.001']];
    var list_objects_json = null;
    
    // for timer object type 10.001 or 11.001
    var list_object_date = [['date1', 'date1'], ['date2', 'date2']];
    var list_object_time = [['hour1', 'hour1'], ['hour2', 'hour2']];
    
    var list_rules = [['-:|Choose a rule|:-', ''], ['Description rule 1', 'id_rule1'], ['Rule 2 Description', 'id_rule2']];
    var list_ioports = [['-:|Choose an IO-Port|:-', '']];
    
    
    var list_plugins = [['-:|Choose a Plugin|:-', '']];
    
    var tab_rules_json = [];
    var json_data = {};
    function parseResponse ( data , xml) {
      console.log("parseResponse",data , xml);
      json_data = data;
      init();
    } 
  
    var xml = '';
    var TextAreaBlock_ = null;
    var _path_knxweb = '<?php echo str_replace('\\', '/', dirname(__FILE__))."/.."; ?>';
  </script>
  <script type="text/javascript" src="blocks_2.js"></script>

  <script type="text/javascript" src="importxml.js"></script>
  <script type="text/javascript" src="msg/js/<?php echo $lang; ?>.js"></script>
<?php
if (isset($_GET["ip_locale"])) { // http://192.168.0.40/knxweb2/
?>
    <script type="text/javascript" >
    function init() {
      //<read><config/></read>
      list_objects_json = json_data.read.config.objects.object;
      list_objects = [];
      list_object_date = [];
      list_object_time = [];
      
      for (var i=0;i<list_objects_json.length;i++)
      {
        var name_obj = list_objects_json[i].$;
        if (!list_objects_json[i].$) {
          name_obj = list_objects_json[i].id;
        } 
        if (list_objects_json[i].type == "11.001") {list_object_date.push([name_obj, list_objects_json[i].id]);};
        if (list_objects_json[i].type == "10.001") {list_object_time.push([name_obj, list_objects_json[i].id]);};
        if (list_objects_json[i].type == "1.001") {list_objects_1_001.push([name_obj, list_objects_json[i].id]);};
        list_objects.push([name_obj, list_objects_json[i].id]);
      }
      
      var list_rules_json = json_data.read.config.rules.rule;
      list_rules = [];
      
      if( Object.prototype.toString.call( list_rules_json ) === '[object Array]' ) {
      
        for (var i=0;i<list_rules_json.length;i++)
        {
          var name_rule = '';
          if (!list_rules_json[i].desc) {
            name_rule = list_rules_json[i].id;
          } else {
            name_rule = list_rules_json[i].desc;
          }
          list_rules.push([name_rule, list_rules_json[i].id]);
          tab_rules_json[i] = { "id":list_rules_json[i].id , "json":list_rules_json[i]};
          if (i==0) {
            xml = RuleToXML(list_rules_json[i]); 
          }
        }
      } else {
        if (list_rules_json.id) {
          var name_rule = '';
          if (!list_rules_json.desc) {
            name_rule = list_rules_json.id;
          } else {
            name_rule = list_rules_json.desc;
          }
          list_rules.push([name_rule, list_rules_json.id]);
          tab_rules_json[0] = { "id":list_rules_json.id , "json":list_rules_json};
          xml = RuleToXML(list_rules_json);
        } else {
          list_rules.push(["No Rule", "No_Rule"]);
        }
      
      }
    }
    </script>
    <script type="application/javascript"
        src="<?php echo $_GET["ip_locale"]; ?>linknx_jsonp.php?jsonp=parseResponse&xml=<read><config/></read>">
    </script>
<?php
} else {
?>
  <script type="text/javascript" >
    xml = '<xml><block type="default_rule" id="" inline="false" deletable="false" movable="false" x="0" y="0"><field name="true_type">if-true</field><field name="false_type">if-false</field></block></xml>';
  </script>
<?php
}
?>
</head>
<body style="background-color: transparent;">

<style type="text/css" style="display: none">
    .goog-menu-vertical {overflow:scroll; max-height:200px; overflow-x:hidden;}
</style>
  <div style="background-color: transparent;width: 100%;">
  <b> ID rule : <input name="id_rule" type="text" size="50" value="ID_rule" >
  Description : <input name="description" type="text" size="50" value="Description" >
  Init on Linknx Start : <input type="checkbox" name="init" id="init">
  </b><br />
  <b>Liste des Rules : <select id="select_list_rules" onchange="loadRule(this.value);">
    <option value=""> -:| Select a rule |:- </option>
  </select>
  <input type="button" value="Clear" onclick="clearRule()">
  <input type="button" value="Valid the Rule" onclick="reqLinknxValidRule();">
  <input type="button" value="Delete the Rule" onclick="reqLinknxDeleteRule();"></b>

  <div id="blocklyDiv" style="height: 480px; width: 100%;"></div>
  <b>Xml de la rule pour linknx :</b>
  <textarea id="displayxml" rows="20" style="width: 100%;" disabled ></textarea>
  </div>
  <p style="display: none;"> <!-- -->
    <button onclick="Xml()">Générer le XML</button>
    &nbsp;
    <input type="button" value="Export to XML" onclick="toXml()">
    &nbsp;
    <input type="button" value="Import from XML" onclick="fromXml()">
    &nbsp;
    <input type="button" value="To JavaScript" onclick="toCode('JavaScript')">
    <br>
    <textarea id="importExport" rows="10" style="width: 100%;"></textarea>
  </p>

  <xml id="toolbox" style="display: none;">
    <category name="Objects">
      <block type="list_objects"></block>
      <block type="value"></block>
    </category>
    <category name="Conditions">
      <block type="condition_AND_OR"></block>
      <block type="condition_not"></block>
      <block type="condition_object"></block>
      <block type="condition_script"></block>
      <block type="condition_time-counter"></block>
    </category>
    <category name="Timer Conditions">
      <block type="condition_timer"></block>
      <block type="timer_hour"></block>
      <block type="timer_date_object"></block>
      <block type="timer_hour_object"></block>
      <block type="timer_type"></block>
      <block type="timer_weekdays"></block>
    </category>
    <category name="Actions"> 
      <block type="action_set_value"></block>
      <block type="action_set_object"></block>
      <block type="action_toggle-value"></block>
      <block type="action_send-read-request"></block>
      <block type="action_repeat"></block>
      <block type="action_Conditional"></block>
      <block type="action_send-sms"></block>
      <block type="action_send-email"></block>
      <block type="action_shell-cmd"></block>
      <block type="action_dim-up"></block>
      <block type="action_script"></block>
      <block type="action_formula"></block>
    </category>
    <category name="Actions on rules">
      <!-- <block type="list_rules"></block> -->
      <block type="action_Cancel"></block>
      <block type="action_start-actionlist"></block>
      <block type="action_set-rule-active"></block>
    </category>
    <category name="IO-Ports">
      <block type="condition_ioport-rx"></block>
      <block type="condition_ioport-connect"></block>
      <block type="action_ioport-tx"></block>
    </category>
  </xml>

  <script>
  var toolbox = document.getElementById('toolbox');
  Blockly.inject(document.getElementById('blocklyDiv'),
                 {path: './', toolbox: toolbox});
  Blockly.pathToBlockly =  './';
  // Let the top-level application know that Blockly is ready.
  window.parent.blocklyLoaded(Blockly);

  Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, Blockly.Xml.textToDom(xml));

  //Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  function myUpdateFunction() {
    var code = Blockly.JavaScript.workspaceToCode();
    document.getElementById('displayxml').value = code;
  }
  Blockly.addChangeListener(myUpdateFunction);

  function Xml() {
    var xml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace)).slice(5, -6); //Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace));
    document.getElementById('importExport').value = xml;
  }
  function toXml() {
    var output = document.getElementById('importExport');
    var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    output.value = Blockly.Xml.domToPrettyText(xml);
    output.focus();
    output.select();
  }
  function fromXml() {
    // vider la page
    Blockly.mainWorkspace.clear();
    var input = document.getElementById('importExport');
    var xml = Blockly.Xml.textToDom(input.value);
    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
  }
  function clearRule() {
    // vider la page
    Blockly.mainWorkspace.clear();
    xml = '<xml><block type="default_rule" id="" inline="false" deletable="false" movable="false" x="0" y="0"><field name="true_type">if-true</field><field name="false_type">if-false</field></block></xml>';
    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, Blockly.Xml.textToDom(xml));
    document.getElementsByName("id_rule")[0].value = '';
    document.getElementsByName("description")[0].value = '';
    document.getElementsByName("init")[0].checked = true;
  }
  function toCode(lang) {
    var output = document.getElementById('importExport');
    output.value = Blockly[lang].workspaceToCode();
  }
  function loadRule(rule_id) {
    // vider la page
    Blockly.mainWorkspace.clear();
    for (var i=0;i<tab_rules_json.length;i++)
    {
      if (tab_rules_json[i].id == rule_id) {
        xml = RuleToXML(tab_rules_json[i].json);
        Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, Blockly.Xml.textToDom(xml));
        document.getElementsByName("id_rule")[0].value = tab_rules_json[i].json.id;
        if (tab_rules_json[i].json.description) document.getElementsByName("description")[0].value = tab_rules_json[i].json.description;
        else document.getElementsByName("description")[0].value = '';
        if (tab_rules_json[i].json.init)  document.getElementsByName("init")[0].checked = tab_rules_json[i].json.init == "true";
        else document.getElementsByName("init")[0].checked = true; 
        return true;
      }
    }
  }

  function affiche_object(){
    document.all["modal"].style.visibility="visible";
    document.all["Choix_Object"].style.visibility="visible";
  }
  function affiche_script(){
    document.all["modal"].style.visibility="visible";
    document.all["Saisie_Script"].style.visibility="visible";
  }
  function centreDiv(gt_nom){
    var gt_lfen=document.body.clientWidth
    var gt_hfen=document.body.clientHeight;
    var gt_lcal=document.all[gt_nom].offsetWidth;
    var gt_hcal=document.all[gt_nom].offsetHeight;
    document.all[gt_nom].style.left=(gt_lfen-gt_lcal)/2;
    document.all[gt_nom].style.top=(gt_hfen-gt_hcal)/2;
  }
  function Valid_TextAreaBlock_object() {
    if (document.all["Choix_Object"].style.visibility=="hidden") {
      document.all["modal"].style.visibility="visible";
      document.all["Choix_Object"].style.visibility="visible";
    } else {
      document.all["modal"].style.visibility="hidden";
      document.all["Choix_Object"].style.visibility="hidden";
      
      var select_objects_list = document.getElementById('objects_list');
      var nameObject = select_objects_list.options[select_objects_list.selectedIndex].text;
      var idObject = select_objects_list.options[select_objects_list.selectedIndex].value; //select_objects_list.value;
      var type_object = select_objects_list.options[select_objects_list.selectedIndex].getAttribute('data-type');
      
      if (typeof TextAreaBlock_ !== 'undefined' && TextAreaBlock_ !== null)
      {
        TextAreaBlock_.setText(nameObject, idObject, type_object);
        TextAreaBlock_.idObject_ = idObject;
        TextAreaBlock_ = null;
      }
    }
  }
  function Valid_TextAreaBlock_script() {
    if (document.all["Saisie_Script"].style.visibility=="hidden") {
      document.all["modal"].style.visibility="visible";
      document.all["Saisie_Script"].style.visibility="visible";
    } else {
      document.all["modal"].style.visibility="hidden";
      document.all["Saisie_Script"].style.visibility="hidden";
      
      var textarea_script = document.getElementById('textarea_script');
      //textarea_script.value = TextAreaBlock_.sourceBlock_.script_;
      if (typeof TextAreaBlock_ !== 'undefined' && TextAreaBlock_ !== null)
      {
        TextAreaBlock_.setText(textarea_script.value);
        TextAreaBlock_.script_ = textarea_script.value;
        TextAreaBlock_.sourceBlock_.script_ = textarea_script.value;
        TextAreaBlock_ = null;
      }
    }
  }
  
  var script;
  function reqLinknxValidRule () {
    var xml = Blockly.JavaScript.workspaceToCode();
    var ip_locale = '<?php echo $_GET["ip_locale"]; ?>';
    script = document.createElement('script');
    script.type = 'application/javascript';
    script.src = ip_locale + 'linknx_jsonp.php?jsonp=retLinknxValidRule&xml=<write><config><rules>'+xml+'</rules></config></write>';
    document.getElementsByTagName('head')[0].appendChild(script);
  }
  
  function reqLinknxDeleteRule () {
    var id_rule = document.getElementsByName("id_rule")[0].value;
    var ip_locale = '<?php echo $_GET["ip_locale"]; ?>';
    script = document.createElement('script');
    script.type = 'application/javascript';
    script.src = ip_locale + 'linknx_jsonp.php?jsonp=retLinknxValidRule&xml=<write><config><rules><rule id="'+id_rule+'" delete="true"/></rules></config></write>';
    document.getElementsByTagName('head')[0].appendChild(script);
  }
  
  function retLinknxValidRule( data , xml) {
    console.log("retLinknxValidRule", data, xml);
    if (data.write.status == 'error') {
      alert(' Il y a eu un problème d\'exécution de la modification');
    }
    if (data.write.status == "success") {
      alert(' Action correctement executée');
    }
    script.remove();
    script = null;
  } 
  
  
  window.onload=function(e){
    var select_list_rules = document.getElementById('select_list_rules');
    select_list_rules.innerHTML = '';
    for (var i=0;i<tab_rules_json.length;i++)
    {
      //tab_rules_json[i] = { "id":list_rules_json[i].id , "json":list_rules_json[i]};
      select_list_rules.innerHTML = select_list_rules.innerHTML + '<option value="'+tab_rules_json[i].id+'">'+tab_rules_json[i].id+'</option>';
    }
    document.getElementsByName("id_rule")[0].value = tab_rules_json[0].json.id;
    if (tab_rules_json[0].json.description) document.getElementsByName("description")[0].value = tab_rules_json[0].json.description;
    else document.getElementsByName("description")[0].value = '';
    if (tab_rules_json[0].json.init)  document.getElementsByName("init")[0].checked = tab_rules_json[0].json.init == "true";
    else document.getElementsByName("init")[0].checked = true;
    
    var select_objects_list = document.getElementById('objects_list');
    for (var i=0;i<list_objects_json.length;i++)
    {
      var name_obj = list_objects_json[i].$;
      if (!list_objects_json[i].$) {
        name_obj = list_objects_json[i].id;
      } 
      select_objects_list.innerHTML = select_objects_list.innerHTML + '<option value="'+list_objects_json[i].id+'" data-type="'+list_objects_json[i].type+'">'+name_obj+'</option>'; // ('+list_objects_json[i].type+')
    }
    centreDiv('Choix_Object');
    centreDiv('Saisie_Script');
  }
  </script>
  <div id="modal" style="z-index: 999;width:100%;height:100%;background-color: black;opacity: 0.8;position: absolute;top: 0;left: 0;visibility: hidden"></div>
  <div id="Choix_Object" style="z-index: 1000;background-color:grey;position:absolute; left: 230px; top: 60px; visibility: hidden;border: 1px solid black;border-radius: 10px;padding: 5px;">
   <table style="" border="0" cellspacing="0" cellpadding="0" >
    <tr>
     <td height="70"><b><span>Choix Object</span></b><br />
      &nbsp;<br />
      <select id="objects_list"></select>
      &nbsp;<br />
      </td>
    </tr>
    <tr>
     <td height="45" align="right" >
     <span style="border: 1px solid black;background-color: black;color: white;border-radius: 10px;padding: 5px;margin-right: 10px;" onclick="Valid_TextAreaBlock_object()" width="38" height="38">Valid</span></td>
    </tr>
   </table>
  </div>
  <div id="Saisie_Script" style="z-index: 1000;background-color:grey;position:absolute; left: 230px; top: 200px; visibility: hidden;border: 1px solid black;border-radius: 10px;padding: 5px;">
   <table style="" border="0" cellspacing="0" cellpadding="0" >
    <tr>
     <td><b><span>Saisie Script</span></b><br />
      <textarea id="textarea_script" style="width:800px; height:150px;"></textarea><br />
      </td>
    </tr>
    <tr>
     <td height="45" align="right" >
     <span style="border: 1px solid black;background-color: black;color: white;border-radius: 10px;padding: 5px;margin-right: 10px;" onclick="Valid_TextAreaBlock_script()" width="38" height="38">Valid</span></td>
    </tr>
   </table>
  </div>
</body>
</html>
