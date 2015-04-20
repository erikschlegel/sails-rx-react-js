import React from 'react';

class Title extends React.Component{
  render() {
      return <span>Hello {this.props.name}</span>;
  }
};

module.exports = Title;