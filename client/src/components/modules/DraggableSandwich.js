import React, { Component } from 'react';
import './Sandwich.css';

import PropTypes from 'prop-types';

import ItemTypes from "../../constants";

import { useDrag } from 'react-dnd';

import {
    NavLink
} from "react-router-dom";

function DraggableSandwich(props) {
    const [{isDragging}, drag] = useDrag({
        item: { type: ItemTypes.SANDWICH },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
        begin: () => {
            return props.data;
        },
        end: (item, monitor) => {
            console.log("DraggableSandwich: END DRAG. didDrop=%s; dropResult=%s.", monitor.didDrop(), monitor.getDropResult());
        },
        });

    return (
        <div className="Sandwich-container"
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
            }}
        >
            <h3>Title: {props.data.title}</h3>
            <p>UID: {props.data.uid}</p>
            <p>Tags: {props.data.tags.toString()}</p>
            <NavLink to={"/sandwich/"+props.data.uid}>See More</NavLink>
        </div>
    )
}

DraggableSandwich.propTypes = {
    data: PropTypes.object.isRequired,
}

DraggableSandwich.defaultProps = {
    data: {
        "uid": -1,
        "title": "N/A",
        "tags": []
    }
}

export default DraggableSandwich;