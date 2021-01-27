import React, { Component, useState } from 'react';
import './SandwichHolder.css';

import PropTypes from 'prop-types';

import ItemTypes from "../../constants";

import { useDrop } from 'react-dnd';

import {
    NavLink
} from "react-router-dom";

function SandwichHolder(props) {

    // The sandwich data is stored as component state now, since
    // we need to update it from within the component in response to 
    // drop events
    // const defaultData = {
    //     "uid": -1,
    //     "title": "N/A",
    //     "tags": []
    // };
    // const [data, setData] = useState(defaultData);

    // Configure the drag-and-drop handling
    const [{ isDragging }, drag] = useDrop({
        accept: ItemTypes.SANDWICH,
        // collect: monitor => ({
        //     isDragging: !!monitor.isDragging(),
        // }),
        drop: (item, monitor) => {
            console.log("SandwichHolder: DROP");
            let data = monitor.getItem();
            console.log("Data: %o", data);
            props.onSandwichUpdate(props.index, data);
        },
    });
    if (props.isEmpty) {
        return <div className="Sandwich-holder-empty"
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
            }}
        >
            <h1>+</h1>
            <em>(add a sandwich!)</em>
        </div>
    } else {
        return (
            <div className="Sandwich-holder"
                ref={drag}
                style={{
                    opacity: isDragging ? 0.5 : 1,
                    cursor: 'move',
                }}
            >
                <h1>#{props.index}</h1>
                <h3>Title: {props.sandwichData.title}</h3>
                <p>UID: {props.sandwichData.uid}</p>
                <p>Tags: {props.sandwichData.tags.toString()}</p>
                {(props.sandwichData.uid !== -1) && <NavLink to={"/sandwich/" + props.sandwichData.uid}>See More</NavLink>}<br />
                <input type="button" value="Remove" onClick={() => props.clearSandwich(props.index)} />
            </div>
        )
    }

}

SandwichHolder.propTypes = {
    index: PropTypes.number.isRequired,
    sandwichData: PropTypes.object.isRequired,
    onSandwichUpdate: PropTypes.func.isRequired,
    clearSandwich: PropTypes.func.isRequired,
    isEmpty: PropTypes.bool.isRequired,
}

export default SandwichHolder;