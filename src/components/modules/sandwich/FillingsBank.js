import React, { Component } from "react";
import PropTypes from 'prop-types';

import AppContext from "../../context/app_context";
import data from "../../../data/all_modules"
import FillingSlot from "./FillingSlot";
import DraggableFilling from "./DraggableFilling";

class FillingsBank extends React.Component {
    render() {
        let fillingsList = []

        for (let i = 0; i < this.props.numLayers; i++) {
            fillingsList.push(
                <DraggableFilling key={i}/>
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
    // numLayers: PropTypes.number.isRequired,
}

FillingsBank.contextType = AppContext;

export default FillingsBank;
