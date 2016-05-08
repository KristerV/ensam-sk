
function insertMarkdownToDocument(data) {
	var mark = new Remarkable({
		html: true,
		linkify: true
	});
	mark.renderer.rules.image = function (tokens, idx, options /*, env */) {
		var url = escapeHtml(tokens[idx].src);
		var title = escapeHtml(replaceEntities(tokens[idx].title));
		var alt = escapeHtml(replaceEntities(tokens[idx].alt));

		return '<div style="background-image: url(' + url + ')" class="image">' +
			'<img src='+url+' style="visibility: hidden"/>' +
			'</div>';
	};
	$('body').append(mark.render(data));
	document.title = Settings.siteTitle
}


// Get content or if not exists get example content
$.get('content.md')
	.done(insertMarkdownToDocument)
	.fail(function(){
		$.get('example-content.md', insertMarkdownToDocument)
	});


/** ALL COPIED FROM REMARKABLE.JS **/

var HTML_ESCAPE_TEST_RE = /[&<>"]/;
var HTML_ESCAPE_REPLACE_RE = /[&<>"]/g;
var HTML_REPLACEMENTS = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;'
};

function escapeHtml(str) {
	if (HTML_ESCAPE_TEST_RE.test(str)) {
		return str.replace(HTML_ESCAPE_REPLACE_RE, replaceUnsafeChar);
	}
	return str;
}

function replaceEntities(str) {
	if (str.indexOf('&') < 0) {
		return str;
	}

	return str.replace(NAMED_ENTITY_RE, replaceEntityPattern);
}