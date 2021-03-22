import React, { Component } from 'react';
import './DraggableFilling.css';

import PropTypes from 'prop-types';

import ItemTypes, { FillingColors } from "../../../constants";

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

    console.log("DraggableFilling.render()");

    return (
        <div className={"Draggable-filling-container " + (props.canDrag ? "enabled" : "disabled")}
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
                "background-color": FillingColors[props.filling.type]
            }}
        >
            <div>{props.filling.title}</div>
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