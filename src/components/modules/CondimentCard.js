import React, { Component } from 'react';

import './CondimentCard.css';

import {
    NavLink
} from "react-router-dom";


import PropTypes from 'prop-types';

class CondimentCard extends React.Component {
    render() {
        return (
            <div className="Condiment-container" >
                <h3>{this.props.data.title}</h3>
                <p><em>{this.props.data.short_description}</em></p>
                <p>Tags: {this.props.data.tags.toString()}</p>
                <NavLink to={"/condiment/"+this.props.data.uid}>See More</NavLink>
                <p>UID: {this.props.data.uid}</p>
            </div>
        )
    }
}

CondimentCard.propTypes = {
    data: PropTypes.object.isRequired,
}

export default CondimentCard;