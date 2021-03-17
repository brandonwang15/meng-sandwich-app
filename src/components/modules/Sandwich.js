import React, { Component } from 'react';
import './Sandwich.css';

import {
    NavLink
} from "react-router-dom";

import AppContext from "../context/app_context";
import PropTypes from 'prop-types';
import StarButton from './StarButton';

class Sandwich extends React.Component {


    render() {
        return (
            <div className="Sandwich-container" >
                <h3>{this.props.data.title}</h3>
                <p><em>{this.props.data.short_description}</em></p>
                <p>Tags: {this.props.data.tags.toString()}</p>
                <NavLink to={"/sandwich/"+this.props.data.uid}>See More</NavLink>
                <p>UID: {this.props.data.uid}</p>
                <StarButton sandwichUID={this.props.data.uid}/>
            </div>
        )
    }
}

Sandwich.propTypes = {
    data: PropTypes.object.isRequired,
}

Sandwich.defaultProps = {
    data: {
        "uid": -1,
        "title": "N/A",
        "tags": []
    }
}

Sandwich.contextType = AppContext;

export default Sandwich;