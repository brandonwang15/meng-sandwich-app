import React, { Component, useState } from 'react';
import './SandwichHolder.css';

import PropTypes from 'prop-types';

import ItemTypes from "../../constants";

import { useDrop } from 'react-dnd';

function SandwichHolder(props) {

    // The sandwich data is stored as component state now, since
    // we need to update it from within the component in response to 
    // drop events
    const defaultData = {
        "uid": -1,
        "title": "N/A",
        "tags": []
    };
    const [data, setData] = useState(defaultData);

    // Configure the drag-and-drop handling
    const [{isDragging}, drag] = useDrop({
        accept: ItemTypes.SANDWICH,
        // collect: monitor => ({
        //     isDragging: !!monitor.isDragging(),
        // }),
        drop: (item, monitor) => {
            console.log("SandwichHolder: DROP");

            let data = monitor.getItem();
            console.log("Data: %o", data);
            setData(data);
        },
        });

    return (
        <div className="Sandwich-holder"
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
            }}
        >
            <h3>Title: {data.title}</h3>
            <p>UID: {data.uid}</p>
            <p>Tags: {data.tags.toString()}</p>
        </div>
    )
}

export default SandwichHolder;