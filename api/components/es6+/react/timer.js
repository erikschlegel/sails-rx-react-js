import React from 'react';
import Rx from 'rx';
import RxReact from 'rx-react';

class Timer extends RxReact.Component { 
  getStateStream() {
    return Rx.Observable.interval(1000).map(function (interval) {
      return {
        secondsElapsed: interval
      };
    });
  }

  render() {
    var secondsElapsed = this.state? this.state.secondsElapsed : 0;
    return (
      <div>Seconds Elapsed: {secondsElapsed}</div>
    );
  }
}

module.exports = Timer;