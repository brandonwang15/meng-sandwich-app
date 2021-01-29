import React, { Component, useState } from 'react';
import './SandwichHolder.css';

import PropTypes from 'prop-types';

import ItemTypes from "../../constants";

import { DropTarget } from 'react-dnd';

import {
    NavLink
} from "react-router-dom";

import AppContext from "../context/app_context";

// Represents a sandwich spot in the user's curriculum.
// Takes an index into the curriculum sandwich list as a prop.
class SandwichHolder extends React.Component {
    render() {

        // Grab the props injected by React DnD
        const { connectDropTarget } = this.props;

        const heldSandwich = this.context.curriculumSandwiches[this.props.index];
       
        if (this.context.isSandwichSlotEmpty(this.props.index)) {
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
                    <h3>{heldSandwich.title}</h3>
                    <p>UID: {heldSandwich.uid}</p>
                    <p>Tags: <em>{heldSandwich.tags.toString()}</em></p>
                    {(heldSandwich.uid !== -1) && <NavLink to={"/sandwich/" + heldSandwich.uid}>See More</NavLink>}<br />
                    <input type="button" value="Remove" onClick={() => this.context.deleteSandwichFromUserCurriculum(this.props.index)} />
                </div>
            );
        }
    }
}

SandwichHolder.propTypes = {
    index: PropTypes.number.isRequired,
}

SandwichHolder.contextType = AppContext;

// React DnD configuration

const sandwichTarget = {
    drop(props, monitor, component) {
        console.log("SandwichHolder: DROP");
        let data = monitor.getItem();
        console.log("Data: %o", data);
        component.context.updateSandwichInUserCurriculum(props.index, data);
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
    }
}


export default DropTarget(ItemTypes.SANDWICH, sandwichTarget, collect)(SandwichHolder);