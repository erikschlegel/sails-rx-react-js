import TypeAheadCtrl from './AutocompleteCtrl';
import Constants from '../Constants';
import Rx from 'rx-dom';

class WikiAutocompleteCtrl extends TypeAheadCtrl {
    constructor(props) {
       super(props);
       this.placeholder = "Wikipedia SearcH";
	}

	datasourceCallback(...args){
		if(args.length==0)
			throw new Error('Search String is required for datasourceCallback');

        let searchString = args[0];

		return Rx.DOM.jsonpRequest(Constants.wikiURl(searchString));
	}

	selectItemImpl(selectedItem){

	  if($('#selectedContent') && selectedItem && selectedItem.url)
		$('#selectedContent').html(`<object style="width:100%;height:100%;" data="${selectedItem.url}">`);
	}

	serviceResultsMapCB(results){
		let response  = [];
        results.response[1].map((name, index) => {
        	                                      let maxCharacterLgth = 250, desc = results.response[2][index];
        	                                      response.push({"name": name, "description" : desc.length>maxCharacterLgth?desc.substring(0, maxCharacterLgth):desc, "url" : results.response[3][index]});
    											 })
        return {results: response};
	}
}

module.exports = WikiAutocompleteCtrl;