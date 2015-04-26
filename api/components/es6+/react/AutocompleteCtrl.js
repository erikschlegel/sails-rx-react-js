import React from 'react';
import RxReact from 'rx-react';
import {FuncSubject} from 'rx-react';

class AutocompleteCtrl extends RxReact.Component {
    constructor(props) {
      super(props);
      this.keyup = FuncSubject.create();
    }
    
    getStateStream() {
      return (
          this.keyup
              .map((e) => e.target.value)
              .filter(text => {
                                if(this.state.selected && this.state.selected.label === text) {
                                    this.setState({stop: false});
                                    return false;
                                }

                                let filter = !this.state.stop && text && text.length > 2;
                                this.setState({stop: false});

                                return filter;
               })
              .throttle(550)
              .distinctUntilChanged()
              .do(() => {
                      this.setState({stop: false});
                      //About to call datasourceCallback, set the state of the dropdown to loading
                      this.setState({
                          hideList: false,
                          highlightedIndex: -1,
                          loading: true
                      });
               })
              .flatMapLatest((text) => this.datasourceCallback(text))//Defined within the implementation component
              .filter(text => {
                                if (!this.state.focused)
                                      this.setState({
                                                    loading: false,
                                                    hideList: true
                                      });

                                return this.state.focused;
                              }
               )
              .map(results => {
                                this.setState({ loading: false });
                                return this.serviceResultsMapCB(results);//Defined within the implementation component
                              })
        );
    }

    onBlur() {
      super.setState({focused: false});
      this.selectItem(this.state.selected);
    }

    onFocus() {
      this.setState({focused: true});
    }
    
    onKeyDown(event) {
      let evCode = event.keyCode, highlightedIndex = this.state.highlightedIndex;

      switch (evCode) {
            case 13:
                 this.selectItem(this.state.results[this.state.highlightedIndex]);
                 break
            case 40:
                 highlightedIndex < this.state.results.length - 1 && (highlightedIndex += 1);
                 break
            case 38:
                 highlightedIndex > -1 && (highlightedIndex -= 1);
                 break
      };

      this.setState({ highlightedIndex: highlightedIndex });
      highlightedIndex > -1 && this.highlight();

      if (evCode === 13 || evCode === 40 || evCode === 38) {
          event.preventDefault();
          event.stopPropagation();
      }
    }

    onSelect(item) {
        this.selectItem(item);
    }

    /*Invoked once, only on the client (not on the server), immediately after the initial rendering occurs*/
    componentDidMount(){
        super.componentDidMount();
        this.setState({hideList: true, 
                          highlightedIndex: -1, 
                          loading: false, 
                          selected: null 
        });
    }

    resetListScroll() {
        this.refs.list && (this.refs.list.getDOMNode().scrollTop = 0);
    }
    
    selectItem(item) {
        this.resetListScroll();
        this.setState({ results: [], hideList: true, selected: item });

        if(item)
           this.refs.searchtext.getDOMNode().value = item.name;

         //invoke implemented callback
         this.selectItemImpl(item);
         super.setState({focused: false});
    }

    highlight() { 
        if (!this.refs.list || this.state.highlightedIndex < 0) return; 
        
        let elTop, elBottom, menuScrollTop, menuHeight;
        let $el = $(this.refs.list.getDOMNode()).children().eq(this.state.highlightedIndex);
        let $menu = $(this.refs.list.getDOMNode());
        elTop = $el.position().top;
        elBottom = elTop + $el.outerHeight(true);
        menuScrollTop = $menu.scrollTop();
        menuHeight = $menu.height() +
          parseInt($menu.css('paddingTop'), 10) +
          parseInt($menu.css('paddingBottom'), 10);

        if (elTop < 0)
          $menu.scrollTop(menuScrollTop + elTop);
        else if (menuHeight < elBottom)
          $menu.scrollTop(menuScrollTop + (elBottom - menuHeight));
    }

    render() {
      let results = this.state && this.state.results || [];
      let state = this.state;

      return (
       <div>
        <div className="input-group">
          <span id="sizing-addon2" className="input-group-addon"><i className="fa fa-search fa-fw"></i></span>
          <input type="text" aria-describedby="sizing-addon2" className="form-control" ref="searchtext" onKeyUp={this.keyup} onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)} onKeyDown={this.onKeyDown.bind(this)} placeholder={this.placeholder}/>
          {state && state.loading ? (<span className="input-group-addon" id="basic-addon2"><i className="fa fa-spinner fa-pulse" /></span>) : ""}
        </div>
        <div className={'autocomplete__result ' + (state && state.hideList && 'hide')}>
        <p className="autocomplete__title">
                <span>Top Results</span>
        </p>
        {results && results.length > 0
          ? (
              <ul ref="list">
              {
                results.map((result, index) => 
                  <li onMouseDown={this.onSelect.bind(this, result)} label={result.name} key={index} className={state.highlightedIndex === index && 'highlighted'}>
                       <a role="menuitem" tabindex="-1" href="#">{result.name}</a>
                       <span className="menu-item-description">{result.description}</span>
                  </li>
                )
              }</ul>
             )
           : <div className="autocomplete__empty">{this.state && this.state.loading ?( <i class="fa fa-spinner fa-pulse"></i>) : ''}</div>
         }
        </div>
        </div>
      );
    }
}

module.exports = AutocompleteCtrl;