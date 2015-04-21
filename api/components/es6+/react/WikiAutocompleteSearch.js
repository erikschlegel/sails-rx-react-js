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
     <div>
      <div className="input-group">
        <span id="sizing-addon2" className="input-group-addon"><i className="fa fa-search fa-fw"></i></span>
        <input type="text" aria-describedby="sizing-addon2" className="form-control" id="searchtext" onKeyUp={this.keyup} placeholder="Wikipedia SearcH"/>
        
      </div>
      <div className="dropdown">
        <ul id="results" className="dropdown-menu" role="menu" aria-labelledby="dropdownMenu3">{
          results.map((result, index) => 
            <li role="presentation" key={index}><a role="menuitem" tabindex="-1" href="#">{result}</a></li>
          )
        }</ul>
      </div>
      </div>
    );
  }
}

module.exports = WikiAutocompleteSearch;