import React, { Component, useState } from 'react';

import { connect } from 'react-redux'
import { deleteFilling, setFilling } from '../../../actions'

import { FillingColors } from '../../../constants';

import './FillingSlot.css';

import PropTypes from 'prop-types';

import ItemTypes from "../../../constants";

import { DropTarget } from 'react-dnd';

import AppContext from "../../context/app_context";

import store from '../../../store'

class FillingSlot extends React.Component {
    constructor(props) {
        super(props);
        this.removeFilling = this.removeFilling.bind(this);
    }

    removeFilling() {
        store.dispatch(deleteFilling(this.props.sandwichUID, this.props.fillingIndex));
    }

    render() {
        console.log("FillingSlot.render()");

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
                <div 
                    className={"Filling-slot-container " + (this.props.fillingObject.isRequired ? "disabled" : "enabled")}
                    style={{
                        cursor: 'move',
                        "background-color": FillingColors[this.props.fillingObject.type]
                    }}
                >
                    <div>
                        {this.props.fillingObject.title}<br />
                        {this.props.fillingObject.isRequired ? <div className="text-danger"><small>(required)</small></div> : <button className="btn btn-outline-danger btn-sm" onClick={this.removeFilling}>Remove</button>}
                    </div>
                </div>
            );
        }
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

        let fillingState = store.getState().sandwiches[props.sandwichUID].contents[props.fillingIndex];
        if (fillingState != null && fillingState.isRequired) {
            // Don't override required fillings
            console.log("onDrop(): ignoring, because would override required filling.");
            return;
        }

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
    return { fillingObject: thisFilling };
}

// export default FillingSlot

export default connect(mapStateToProps)(DropTarget(ItemTypes.FILLING, fillingTarget, collect)(FillingSlot));