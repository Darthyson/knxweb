{foreach from=$cssList item=css}
<link rel="stylesheet" type="text/css" href="{$css}" />
{/foreach}
{foreach from=$jsList item=js}
<script type="text/javascript" src="{$js}"></script>
{/foreach}

<div>{l lang='en'}Plugin{/l} : {$plugins_id}</div>
<input type="checkbox" id="plugin-googlecalendar-enable" value="1">{l lang='en'}Enable{/l}<br />
<br />
<form id="plugin-googlecalendar-form">
<table id="plugin-googlecalendar-tab-table" width="100%;" >
	<tbody>
		<tr>
			<th width="250px;" >{l lang='en'}Id Plugin{/l}</th>
			<td><input type="text" class="required" name="plugin-googlecalendar-id" id="plugin-googlecalendar-id" size="50" value="calendar1" ></td>
		</tr>
		<tr>
			<th>{l lang='en'}Email{/l}</th>
			<td><input type="text" class="required" name="plugin-googlecalendar-emailgoogle" id="plugin-googlecalendar-emailgoogle" size="50" value="a.penhard@gmail.com" ></td>
		</tr>
		<tr>
			<th>{l lang='en'}Password{/l}</th>
			<td><input type="password" class="required" id="plugin-googlecalendar-password" id="plugin-googlecalendar-password" size="50" value="energy01"></td>
		</tr>
		<tr>
			<th>{l lang='en'}Feedxml{/l}</th>
			<td><input type="text" class="required" name="plugin-googlecalendar-feedxml" id="plugin-googlecalendar-feedxml" size="200" value="https://www.google.com/calendar/feeds/thf05ttfjkce3ppemmehll63ig@group.calendar.google.com/private-3734d5f5bdb8b677107fc3fb8a9f7156/basic"></td>
		</tr>
		<tr>
			<th>{l lang='en'}Delay{/l}</th>
			<td><input type="text" class="required" name="plugin-googlecalendar-delai" id="plugin-googlecalendar-delai" size="5" value="5"> {l lang='en'}minutes{/l}</td>
		</tr>
	</tbody>
</table>
</form>
<input type="button" value="{l lang='en'}Save{/l}" id="plugin-googlecalendar-save">
<input type="button" value="{l lang='en'}New Plugin{/l}" id="plugin-googlecalendar-new">