
function minimapAddon()
{
	this.name = 'Minimap';
	this.active = false;
	
	this.sidebarCallback = function()
	{
		this.minimapDisplay();
	};
	
	this.minimapDisplay = function()
	{
		if (this.active===false) return;
		
		var lines = addonSystem.getEditorLines();
		
		var html = '';
		
		html += '<div id="minimap" style="font-size: 25%;">';
		
		for (var i = 0; i < lines.length; i++) 
		{
			var line = lines[i];
			escapedLine = $('<div/>').text(line).html();
			escapedLine = escapedLine.replace(/ /g, '&nbsp;');
			escapedLine = escapedLine.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
			
			var lineSnippetLength = 100;
			var lineSnippet = line.trim().substr(0, lineSnippetLength).replace(/"/g, '&quot;');
			if (line.trim().length>lineSnippetLength) lineSnippet += ' [...]';
			
			html += '<div style="width: 100%" title="Line '+(i+1)+': '+lineSnippet+'" class="minimapLine" id="'+(i+1)+'">';
			if (line==='') html += '<br/>';
			else html += escapedLine;
			html += '</div>';
		}
		
		html += '</div>';
		
		addonSystem.setAddonSidebarContent(html);
		
		var me = this;
		setTimeout(function() { me.minimapDisplay() }, 1000);
	};
}

$(document).on('click', '#minimap .minimapLine', function()
{
	var lineNumber = $(this).attr('id');
	
	addonSystem.changeEditorLineNumber(lineNumber);
});

addonSystem.initialiseAddon(new minimapAddon());
