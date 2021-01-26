import React, { Component } from 'react';
import './Sandwich.css';

import PropTypes from 'prop-types';

import ItemTypes from "../../constants";

import { useDrag } from 'react-dnd';

function DraggableSandwich(props) {
    const [{isDragging}, drag] = useDrag({
        item: { type: ItemTypes.SANDWICH },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
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