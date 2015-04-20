import React from 'react';
import Rx from 'rx-dom';
import RxReact from 'rx-react';
import {FuncSubject} from 'rx-react';
import Constants from '../Constants';

class WikiAutocompleteSearch extends RxReact.Component {
  constructor(props) {
    super(props);
    this.keyup = FuncSubject.create();
  }
  
  getStateStream() {
    return (
      this.keyup
      .map((e) => e.target.value)
      .filter(text => text.length > 2)
      .throttle(750)
      .distinctUntilChanged()
      .flatMapLatest((text) => Rx.DOM.jsonpRequest(Constants.wikiURl(text)))
      .map(results => { let response  = [];
                        results.response[1].map((name, index) => response.push({"name": name, "description" : results.response[2][index], "url" : results.response[3][index]}))
                        return {results: response};})
    );
  }
  
  render() {
    let results = this.state && this.state.results || [];
    return (
      <div class="input-group">
        <div>Start Typing</div>
        <span id="sizing-addon2" class="input-group-addon"><i class="fa fa-search"></i></span>
        <input type="text" aria-describedby="sizing-addon2" class="form-control" id="searchtext" onKeyUp={this.keyup} placeholder="Wikipedia SearcH"/>
        <ul id="results">{
          results.map((result, index) => 
            <li key={index}>{result}</li>
          )
        }</ul>
      </div>
    );
  }
}

module.exports = WikiAutocompleteSearch;