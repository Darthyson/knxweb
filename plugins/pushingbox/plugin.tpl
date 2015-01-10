{foreach from=$cssList item=css}
<link rel="stylesheet" type="text/css" href="{$css}" />
{/foreach}
{foreach from=$jsList item=js}
<script type="text/javascript" src="{$js}"></script>
{/foreach}

<div>{l lang='en'}Plugin{/l} : {$plugins_id}</div>
<input type="checkbox" id="plugin-pushingbox-enable" value="1">{l lang='en'}Enable{/l}<br />
<br />
<form id="plugin-pushingbox-form">
<table id="plugin-pushingbox-tab-table" width="100%;" >
	<tbody>
		<tr>
			<th width="50px;" >{l lang='en'}Id Plugin{/l}</th>
			<td><input type="text" class="required" name="plugin-googlecalendar-id" id="plugin-googlecalendar-id" size="50" value="pushmail" ></td>
		</tr>
		<tr>
			<th>DevId</th>
			<td><input type="text" class="required" name="plugin-pushingbox-devid" id="plugin-pushingbox-devid" size="20" value="v0123456789ABCDE" ></td>
		</tr>
	</tbody>
</table>
</form>
<input type="button" value="{l lang='en'}Save{/l}" id="plugin-pushingbox-save">
<input type="button" value="{l lang='en'}New Plugin{/l}" id="plugin-pushingbox-new">