import React from 'react';
import Rx from 'rx';
import RxReact from 'rx-react';
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
      .flatMapLatest((text) => Rx.DOM.jsonpRequest(wikiURl(text)))
      .filter(data => data.length >= 2)
      .map(results => ({results: results[1]}))
    );
  }
  
  render() {
    let results = this.state && this.state.results || [];
    return (
      <div>
        <div>Start Typing</div>
        <input type="text" class="form-control" id="searchtext" onKeyUp={this.keyup}/>
        <ul id="results">{
          results.map((result, index) => 
            <li key={index}>{result}</li>
          )
        }</ul>
      </div>
    );
  }
}

React.render(<SearchWikipedia />, document.getElementById('wikiSearch'));
