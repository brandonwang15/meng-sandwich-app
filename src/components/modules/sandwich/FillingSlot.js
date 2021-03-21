import React, { Component, useState } from 'react';

import { connect } from 'react-redux'
import { setFilling } from '../../../actions'


import './FillingSlot.css';

import PropTypes from 'prop-types';

import ItemTypes from "../../../constants";

import { DropTarget } from 'react-dnd';

import AppContext from "../../context/app_context";

import store from '../../../store'

class FillingSlot extends React.Component {
    render() {
        // Grab the props injected by React DnD
        const { connectDropTarget } = this.props;

        if (this.props.fillingObject == null) {

            return connectDropTarget(<div className="Filling-slot-container"
                style={{
                    cursor: 'move',
                }}
            >
                <div >
                    EMPTY
                </div>
            </div>);

        } else {
            return connectDropTarget(
                <div className={"Filling-slot-container " + (this.props.fillingObject.isRequired ? "disabled" : "enabled")}
                    style={{
                        cursor: 'move',
                    }}
                >
                    <div>
                        {this.props.fillingObject.title}
                    </div>
                </div>
            );
        }


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
    sandwichUID: PropTypes.number.isRequired,
}

FillingSlot.contextType = AppContext;

// React DnD configuration

const fillingTarget = {
    drop(props, monitor, component) {
        console.log("FillingSlot: DROP");
        let data = monitor.getItem();
        console.log("Data: %o", data);

        // TODO
        // component.context.updateSandwichInUserCurriculum(props.index, data);
        console.log("props.fillingIndex ", props.fillingIndex);
        store.dispatch(setFilling(props.sandwichUID, props.fillingIndex, data));
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
    }
}

function mapStateToProps(state, props) {
    let thisSandwich = state.sandwiches[props.sandwichUID];
    let thisFilling = thisSandwich.contents[props.fillingIndex];
    console.log("FillingSlot.mapStateToProps() called");
    return {fillingObject: thisFilling};
}

// export default FillingSlot

export default connect(mapStateToProps)(DropTarget(ItemTypes.FILLING, fillingTarget, collect)(FillingSlot));