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

	serviceResultsMapCB(results){
		let response  = [];
        results.response[1].map((name, index) => response.push({"name": name, "description" : results.response[2][index], "url" : results.response[3][index]}))
        
        return {results: response};
	}
}

module.exports = WikiAutocompleteCtrl;