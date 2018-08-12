import React, { Component } from 'react';

class TitleDes extends Component {
  render() {
    return (
        <div className="title-des">
            <h4 className="text-title">{this.props.title}</h4>
        </div>
    );
  }
}

export default TitleDes;
