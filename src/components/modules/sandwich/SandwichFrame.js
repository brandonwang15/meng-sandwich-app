import React, { Component } from "react";
import PropTypes from 'prop-types';

import AppContext from "../../context/app_context";
import data from "../../../data/all_modules"
import FillingSlot from "./FillingSlot";

class SandwichFrame extends React.Component {
    render() {
        let holderList = []

        let sandwichObject = this.context.customSandwichData[this.props.sandwichUID]

        for (let i = 0; i < this.context.customSandwichData[this.props.sandwichUID].numSlots; i++) {
            // check if there is a required filling for this spot
            let found = false
            // for (let j = 0; j < sandwichObject.requiredFillings.length; j++) {
            //     let filling = sandwichObject.requiredFillings[j];
            //     if (parseInt(filling.index) == i) {
            //         holderList.push(
            //             <FillingSlot key={i} index={i+1} sandwichUID={this.props.sandwichUID} filling={filling} />
            //         )
            //         found = true;
            //         break;
            //     }
            // }

            if (!found) {
                holderList.push(
                    <FillingSlot key={i} fillingIndex={i} sandwichUID={this.props.sandwichUID} />
                )
            }

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
    sandwichUID: PropTypes.number.isRequired
}

SandwichFrame.contextType = AppContext;

export default SandwichFrame;
