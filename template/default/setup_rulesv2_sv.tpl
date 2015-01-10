{foreach from=$cssList item=css}
<link rel="stylesheet" type="text/css" href="{$css}" />
{/foreach}
<script type="text/javascript" src="rulesv2/js/blockly_compressed.js"></script>
<script type="text/javascript" src="rulesv2/js/javascript_compressed.js"></script>
<script type="text/javascript" src="rulesv2/field_textareainput_sv2.js" ></script>
<script type="text/javascript" src="rulesv2/blocks.js"></script>
<script type="text/javascript" src="rulesv2/importxml.js"></script>
<script type="text/javascript" src="rulesv2/msg/js/fr.js"></script>
<script type="text/javascript" src="rulesv2/rules_sv2.js" ></script>
<script type="text/javascript" src="rulesv2/msg/js/fr.js"></script> <!-- TODO a modifier ... avec config.xml-->
{foreach from=$jsList item=js}
<script type="text/javascript" src="{$js}"></script>
{/foreach}
<script type="application/javascript"
  src="linknx_jsonp.php?jsonp=parseResponse&xml=<read><config/></read>"> <!-- http://192.168.0.40/knxweb_0_9_2/linknx_jsonp.php?jsonp=parseResponse&xml=<read><config></config></read> -->
</script> 
<style>
body {
  background-color: #fff;
  font-family: sans-serif;
}
h1 {
  font-weight: normal;
  font-size: 140%
}
.blocklyFieldDropdown { /* , .blocklyFieldDropdown * */
  overflow: scroll;
}
g.blocklyFieldDropdown, rect.blocklyDropdownMenuShadow, g.blocklyDropdownMenuOptions { /*.blocklyFieldDropdown rect*/
  max-height : 300px !important;
  height : 100px !important;
  overflow:scroll;
}
</style>

<div style="background-color: #ddd;width: 100%;">
<b>ID rule : <input name="id_rule" type="text" size="50" value="ID_rule" >
Description : <input name="description" type="text" size="50" value="Description" >
Init on Linknx Start : <input type="checkbox" name="init" id="init">
</b>
<select id="select_list_rules" onchange="loadRule(this.value);">
  <option value=""> -:| Select a rule |:- </option>
</select>
<input type="button" value="Clear" onclick="clearRule()">
<input type="button" value="Valid the Rule" onclick="reqLinknxValidRule();">
<input type="button" value="Delete the Rule" onclick="reqLinknxDeleteRule();">
<div id="blocklyDiv" style="height: 480px; width: 100%;"></div>
<b>Xml de la rule pour linknx :</b>
<textarea id="textarea" rows="20" style="width: 100%;" disabled ></textarea>
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

<xml id="toolbox" style="display: none">
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
