import React, { Component } from 'react';
import './Sandwich.css';

import {
    NavLink
} from "react-router-dom";


import PropTypes from 'prop-types';

class Sandwich extends React.Component {
    render() {
        return (
            <div className="Sandwich-container" >
                <h3>Title: {this.props.data.title}</h3>
                <p>UID: {this.props.data.uid}</p>
                <p>Tags: {this.props.data.tags.toString()}</p>
                <NavLink to={"/sandwich/"+this.props.data.uid}>See More</NavLink>
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

export default Sandwich;