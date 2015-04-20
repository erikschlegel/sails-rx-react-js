export const wikiURl = (searchTerm) => {
	 let encodedTerm = global.encodeURIComponent(searchTerm);
	 let urlTemplate = `http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${encodedTerm}&callback=JSONPCallback`;
	 
     return urlTemplate;
};

