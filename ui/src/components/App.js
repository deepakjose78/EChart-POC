import React from 'react';

export class App extends React.Component{
  render() {
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding">
        <div className="page col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding">
          {this.props.children}
        </div>
      </div>
    )
  }
}
