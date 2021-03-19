import React, { Component } from "react";
import PropTypes from 'prop-types';

import AppContext from "../../context/app_context";
import data from "../../../data/all_modules"
import FillingSlot from "./FillingSlot";
import DraggableFilling from "./DraggableFilling";

class FillingsBank extends React.Component {
    render() {
        let fillingsList = []

        console.log(this.props.sandwichUID)
        let sandwichObject = this.context.customSandwichData[this.props.sandwichUID];
        let numOptional = sandwichObject.optionalFillings.length;

        for (let i = 0; i < numOptional; i++) {
            let filling = sandwichObject.optionalFillings[i]
            fillingsList.push(
                <DraggableFilling key={i} filling={filling} canDrag={true}/>
            )
        }

        return (
            <>
                Fillings Bank
                {fillingsList}
            </>
        )
    }

}

FillingsBank.propTypes = {
    sandwichUID: PropTypes.number.isRequired,
}

FillingsBank.contextType = AppContext;

export default FillingsBank;
