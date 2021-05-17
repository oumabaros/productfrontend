import React, { Component } from 'react';
import './Modal.css';
export default class Modal extends Component {
  onClose = (e) => {
    this.props.handleClose && this.props.handleClose(e);
  };
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="mod">
        <div className="mod-content">
          <div className="mod-header">
            <h4 className="mod-title">Modal</h4>
          </div>
          <div className="mod-body">Content</div>
          <div className="mod-footer">
            <button className="button" onClick={this.onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}
