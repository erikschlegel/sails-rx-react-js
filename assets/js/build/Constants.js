"use strict";

var wikiURl = function wikiURl(searchTerm) {
	var encodedTerm = global.encodeURIComponent(searchTerm);
	var urlTemplate = "http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + encodedTerm + "&callback=JSONPCallback";
	console.log(urlTemplate);
	return urlTemplate;
};

module.exports.wikiURl = wikiURl;