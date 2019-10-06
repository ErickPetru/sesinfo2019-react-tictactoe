import React from 'react';
import './Square.css';

export default class Square extends React.Component {
  render() {
    let className = 'square';
    if (this.props.value) className += ' ' + this.props.value;
    if (this.props.winner) className += ' winner';
    return (
      <button
        className={className}
        disabled={this.props.disabled}
        onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}
