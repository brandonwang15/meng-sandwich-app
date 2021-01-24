import React, { Component } from 'react';
import './Sandwich.css';

class Sandwich extends React.Component {
    render() {
        return (
            <div className="Sandwich-container" >
                <h3>Title: {this.props.title}</h3>
                <p>UID: {this.props.uid}</p>
                <p>Tags: {this.props.tags.toString()}</p>
            </div>
        )
    }
}

export default Sandwich;