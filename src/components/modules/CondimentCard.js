import React, { Component } from 'react';

import './CondimentCard.css';

import {
    NavLink
} from "react-router-dom";

import data from '../../data/all_condiments';

import PropTypes from 'prop-types';

class CondimentCard extends React.Component {
    render() {
        let condimentData = {};

        data.condiments.forEach((value) => {
            if (value.uid === this.props.uid) {
                condimentData = value;
            }
        });

        return (
            <div className="Condiment-container" >
                <b>{condimentData.title}</b>
                <p><em>{condimentData.short_description}</em></p>
                <p>Tags: {condimentData.tags.toString()}</p>
                <NavLink to={"/condiment/"+condimentData.uid}>See More</NavLink>
                <p>UID: {condimentData.uid}</p>
            </div>
        )
    }
}

CondimentCard.propTypes = {
    uid: PropTypes.number.isRequired,
}

export default CondimentCard;