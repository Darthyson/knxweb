//tab_config['superuser']=="true"

var plugin_pushingbox = {
	refreshData: function() {
		/*  TODO ...
    
    var body = '<read><config><services></services></config></read>';
		var responseXML=queryLinknx(body);
		if (responseXML!=false)	{
			var data=$('smsgateway',responseXML)[0];
			if (data.getAttribute('type')) {
				$('#smsgateway-enable').attr('checked','true');
				$('#smsgateway-type').val(data.getAttribute('type'));
				$('#smsgateway-username').val(data.getAttribute('user'));
				$('#smsgateway-password').val(data.getAttribute('pass'));
				$('#smsgateway-password-confirm').val(data.getAttribute('pass'));
				$('#smsgateway-apiid').val(data.getAttribute('api_id'));
				$('#smsgateway-from').val(data.getAttribute('from'));
			} else $('#smsgateway-enable').removeAttr('checked');
			$('#smsgateway-enable').trigger('change');
		}*/
	},
	saveData: function() {
		/* TODO ...
    
    if ($('#smsgateway-password').val() == $('#smsgateway-password-confirm').val() ) 
		{ 
			if ($("#smsgateway-form").valid())
			{
				if ($('#smsgateway-enable').attr("checked"))
				{
					var body = '<write><config><services><smsgateway ' + 
											'type="' + $('#smsgateway-type').val() + '" ' +
											'user="' + $('#smsgateway-username').val() + '" ' +
											'pass="' + $('#smsgateway-password').val() + '" ' +
											'api_id="' + $('#smsgateway-apiid').val() + '" ' +
											'from="' + $('#smsgateway-from').val() + '" ' +
											'/></services></config></write>';
				} else var body = '<write><config><services><smsgateway/></services></config></write>';
				loading.show();
				var responseXML=queryLinknx(body);
				saveConfig();
				loading.hide();
				if (responseXML!=false) maintab.tabs('remove', '#tab-smsgateway');
			}
		} else {
			$('.error').show();
		}
    */
	}
}

jQuery(document).ready(function(){
	$("#plugin-pushingbox-tab-table").tableize({
		sortable: false,
		selectable: false
	});
	
	$("#plugin-pushingbox-enable").change(function() {
    $("#plugin-pushingbox-tab-table input,#plugin-pushingbox-tab-table select").attr('disabled',!($("#plugin-pushingbox-enable").attr('checked')));
	});

	/*$('#plugin-pushingbox-password-confirm').change(function() {
		if($("#plugin-pushingbox-password").val() == $(this).val()) {
			$('.error').hide();
		} else {
			$('.error').show();
		}
	}); */
	
	$("#plugin-pushingbox-save").button();
	$("#plugin-pushingbox-save").click(plugin_pushingbox.saveData);
	
	plugin_pushingbox.refreshData();
	loading.hide();
});