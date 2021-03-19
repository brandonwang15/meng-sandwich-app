import React, { Component, useState } from 'react';

import './FillingSlot.css';

import PropTypes from 'prop-types';

import ItemTypes from "../../../constants";

import { DropTarget } from 'react-dnd';

import AppContext from "../../context/app_context";

class FillingSlot extends React.Component {
    render() {

        // Grab the props injected by React DnD
        const { connectDropTarget } = this.props;

        const heldSandwich = this.context.curriculumSandwiches[this.props.index];
       
        return (<>
        <div className="Filling-slot-container">
            FILLING SLOT
        </div>
        </>)

        // if (this.context.isSandwichSlotEmpty(this.props.index)) {
        //     return connectDropTarget(<div className="Sandwich-holder-empty"
        //         style={{
        //             cursor: 'move',
        //         }}
        //     >
        //         <h1>+</h1>
        //         <em>(add a sandwich!)</em>
        //     </div>);
        // } else {
        //     return connectDropTarget(
        //         <div className="Sandwich-holder"
        //             style={{
        //                 cursor: 'move',
        //             }}
        //         >
        //             <h5>#{this.props.index + 1}</h5>
        //             <h3>{heldSandwich.title}</h3>
        //             <p>UID: {heldSandwich.uid}</p>
        //             <p>Tags: <em>{heldSandwich.tags.toString()}</em></p>
        //             {(heldSandwich.uid !== -1) && <NavLink to={"/sandwich/" + heldSandwich.uid}>See More</NavLink>}<br />
        //             <button type="button" className="btn btn-warning" onClick={() => this.context.deleteSandwichFromUserCurriculum(this.props.index)}>Remove</button>
        //         </div>
        //     );
        // }
    }
}

FillingSlot.propTypes = {
    // index: PropTypes.number.isRequired,
}

FillingSlot.contextType = AppContext;

// React DnD configuration

const fillingTarget = {
    drop(props, monitor, component) {
        console.log("FillingSlot: DROP");
        let data = monitor.getItem();
        console.log("Data: %o", data);

        // TODO:
        // component.context.updateSandwichInUserCurriculum(props.index, data);
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
    }
}

export default FillingSlot

// export default DropTarget(ItemTypes.FILLING, fillingTarget, collect)(FillingSlot);