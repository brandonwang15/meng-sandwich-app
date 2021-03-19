import React, { Component } from 'react';
import './DraggableFilling.css';

import PropTypes from 'prop-types';

import ItemTypes from "../../../constants";

import { useDrag } from 'react-dnd';

function DraggableFilling(props) {
    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.FILLING },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
        canDrag: () => props.canDrag,
        begin: () => {
            return props.filling;
        },
        end: (item, monitor) => {
            console.log("DraggableSandwich: END DRAG. didDrop=%s; dropResult=%s.", monitor.didDrop(), monitor.getDropResult());
        },
    });

    return (
        <div className={"Draggable-filling-container " + (props.canDrag ? "enabled" : "disabled")}
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
            }}
        >
            <h1>{props.filling.title}</h1>
        </div>
    )
}

DraggableFilling.propTypes = {
    filling: PropTypes.object.isRequired,
    canDrag: PropTypes.bool.isRequired,
}
{/* 
DraggableFilling.defaultProps = {
    data: {
        "uid": -1,
        "title": "N/A",
        "tags": []
    }
} */}

export default DraggableFilling;