import React, { Component } from 'react';
import './DraggableSandwich.css';

import PropTypes from 'prop-types';

import ItemTypes from "../../constants";

import { useDrag } from 'react-dnd';

import {
    NavLink
} from "react-router-dom";
import StarButton from './StarButton';

// Draggable component that displays a 'thumbnail' card for the given sandwich object.
function DraggableSandwich(props) {
    const [{isDragging}, drag] = useDrag({
        item: { type: ItemTypes.SANDWICH },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
        canDrag: () => props.canDrag,
        begin: () => {
            return props.data;
        },
        end: (item, monitor) => {
            console.log("DraggableSandwich: END DRAG. didDrop=%s; dropResult=%s.", monitor.didDrop(), monitor.getDropResult());
        },
        });

    return (
        <div className={"Draggable-sandwich-container " + (props.canDrag ? "enabled" : "disabled")}
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
            }}
        >
            <h3>{props.data.title}</h3>
            <p>UID: {props.data.uid}</p>
            <p>Tags: {props.data.tags.toString()}</p>
            <p><NavLink to={"/sandwich/"+props.data.uid}>See More</NavLink></p>
            <p><StarButton sandwichUID={props.data.uid}></StarButton></p>
        </div>
    )
}

DraggableSandwich.propTypes = {
    data: PropTypes.object.isRequired,
    canDrag: PropTypes.bool.isRequired,
}

DraggableSandwich.defaultProps = {
    data: {
        "uid": -1,
        "title": "N/A",
        "tags": []
    }
}

export default DraggableSandwich;