/*
 * Blocks use for rule condition or action exmple :
 *  
 * <condition type="script" ><![CDATA[Script lua !!!]]></condition>
 * <condition type="ioport-rx" expected="" object0="" object1="" object2="" object3="" regex="true" hex="true" />
 * 
 * <action type="script" ><![CDATA[Script lua !!!]]></action>
 * <action type="shell-cmd" cmd="./sh #path_plugin#default.sh ${#object1#} ${#object2#} ${#object3#} ${#object4#} ${#object5#}" var="true" />
 * <action type="ioport-tx" hex="false" data="data" var="true" />
 * 
 * here define new block for the plugin 
 */

var domogeek_list_weather = [['temperature', 'temperature'], ['humidity', 'humidity'], ['pressure', 'pressure'], ['weather', 'weather'], ['windspeed', 'windspeed'], ['rain', 'rain'], ['all', 'all']];
var domogeek_list_date = [['today', 'today'], ['tomorrow', 'tomorrow']];

//Script     <condition type="script">return tonumber(obj("setpoint_room1")) > tonumber(obj("temp_room1"));</condition> => http://sourceforge.net/apps/mediawiki/linknx/index.php?title=Lua_Scripting
Blockly.Blocks['action_domogeek'] = {
  init: function() {
    this.setHelpUrl('http://sourceforge.net/apps/mediawiki/linknx/index.php?title=Action%27s_syntax');
    this.setColour(160);
    this.appendDummyInput()
        .appendField("Action domogeek Météo Ville :")
        .appendField(new Blockly.FieldTextInput(""), "city")
        .appendField("weatherrequest :")
        .appendField(new Blockly.FieldDropdown(domogeek_list_weather), "weather")
        .appendField("date :")
        .appendField(new Blockly.FieldDropdown(domogeek_list_date), "date")
        .appendField("object resultat :")
        .appendField(new Blockly.FieldTextAreaInput(" -:| Click to choose an Object |:- "), "object1")
        .appendField("(delay")
        .appendField(new Blockly.FieldTextInput(""), "delay")
        .appendField(")");

    this.setInputsInline(true);
    this.setPreviousStatement(true, "action");
    this.setNextStatement(true, "action");
    this.setTooltip('SET object or value to an object and delay if you want');
  },
  domToMutation: function(container) {
    this.script_ = container.textContent; //getAttribute('script');
  }
};
Blockly.JavaScript['action_domogeek'] = function(block) {
  // /weather/city/{temperature|humidity|pressure|weather|windspeed|rain|all}/{today|tomorrow}
  
  var value_city = block.getFieldValue('city') || 'brest';
  var value_weather = block.getFieldValue('weather') || 'pressure';
  var value_date = block.getFieldValue('date') || 'today';
  var object1 = block.getFieldValue('object1');
  var value_script = 'out = io.popen("curl http://api.domogeek.fr/weather/' + value_city + '/' + value_weather + '/' + value_date + '"); value = string.match(out:read("*a"), "[0-9.%-]+"); out:close();';
  value_script+= 'if (value ~= nil) then set("' + object1 + '", value); end;';
  
  var value_delay = block.getFieldValue('delay');
  /* 
<action type="script">
  out = io.popen("curl http://api.domogeek.fr/weather/paris/pressure/today");
  value = string.match(out:read("*a"), "[0-9.%-]+");
  out:close();
  if (value ~= nil) then
  set("PressionAtmospherique", value);
  end;
</action>
  */
  var code = '<action type="script" delay="' + value_delay + '" >' + value_script + '</action>\n';
  return code;
};

function init_domogeek_Blocks() { // changer le nom de la function gérer comme les widgets ...
  // list_plugins = [['-:|Choose a Plugin|:-', '']];
  // mettre à jour la liste des plugins actif de type default ?
}

function PDomogeek(conf) {
	this.isResizable=true;
  this.init(conf);
  this.refreshHTML();
}
PDomogeek.type='domogeek';
plugins.registerPlugin(PDomogeek);
PDomogeek.prototype = new PPlugin();
// Refresh HTML from config
PDomogeek.prototype.refreshHTML = function() {
  var displaypicture = this.conf.getAttribute("display-picture");
};
// Called by eibcommunicator when a feedback object value has changed
PDomogeek.prototype.updateObject = function(obj,value) {
};