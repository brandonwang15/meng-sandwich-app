import React, { Component, useState } from 'react';
import './SandwichHolder.css';

import PropTypes from 'prop-types';

import ItemTypes from "../../constants";

import { DropTarget } from 'react-dnd';

import {
    NavLink
} from "react-router-dom";

import AppContext from "../context/app_context";

class SandwichHolder extends React.Component {
    render() {

        // Grab the props injected by React DnD
        const { connectDropTarget } = this.props;


        if (this.props.isEmpty) {
            return connectDropTarget(<div className="Sandwich-holder-empty"
                style={{
                    cursor: 'move',
                }}
            >
                <h1>+</h1>
                <em>(add a sandwich!)</em>
            </div>);
        } else {
            return connectDropTarget(
                <div className="Sandwich-holder"
                    style={{
                        cursor: 'move',
                    }}
                >
                    <h1>#{this.props.index}</h1>
                    <h3>{this.props.sandwichData.title}</h3>
                    <p>UID: {this.props.sandwichData.uid}</p>
                    <p>Tags: <em>{this.props.sandwichData.tags.toString()}</em></p>
                    {(this.props.sandwichData.uid !== -1) && <NavLink to={"/sandwich/" + this.props.sandwichData.uid}>See More</NavLink>}<br />
                    <input type="button" value="Remove" onClick={() => this.props.clearSandwich(this.props.index)} />
                </div>
            );
        }
    }
}

SandwichHolder.propTypes = {
    index: PropTypes.number.isRequired,
    sandwichData: PropTypes.object.isRequired,
    onSandwichUpdate: PropTypes.func.isRequired,
    clearSandwich: PropTypes.func.isRequired,
    isEmpty: PropTypes.bool.isRequired,
}

SandwichHolder.contextType = AppContext;

// React DnD configuration

const sandwichTarget = {
    drop(props, monitor, component) {
        console.log("SandwichHolder: DROP");
        let data = monitor.getItem();
        console.log("Data: %o", data);
        props.onSandwichUpdate(props.index, data);
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
    }
}


export default DropTarget(ItemTypes.SANDWICH, sandwichTarget, collect)(SandwichHolder);