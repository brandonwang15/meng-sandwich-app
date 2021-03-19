import React, { Component } from "react";
import PropTypes from 'prop-types';

import AppContext from "../../context/app_context";
import data from "../../../data/all_modules"
import FillingSlot from "./FillingSlot";

class SandwichFrame extends React.Component {
    render() {
        let holderList = []

        for (let i = 0; i < this.props.numLayers; i++) {
            holderList.push(
                <FillingSlot key={i}/>
            )
        }

        return (
            <>
            SANDWICH FRAME
            {holderList}
            </>
        )
    }

}

SandwichFrame.propTypes = {
    numLayers: PropTypes.number.isRequired,
}

SandwichFrame.contextType = AppContext;

export default SandwichFrame;
