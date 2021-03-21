import React, { Component } from "react";
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import AppContext from "../../context/app_context";
import data from "../../../data/all_modules"
import FillingSlot from "./FillingSlot";
import DraggableFilling from "./DraggableFilling";

class FillingsBank extends React.Component {
    render() {
        console.log("fillingsBank: ", this.props.optionalFillings);

        let fillingsList = []

        console.log(this.props.sandwichUID)
        let numOptional = this.props.optionalFillings.length;

        for (let i = 0; i < numOptional; i++) {
            let filling = this.props.optionalFillings[i]
            fillingsList.push(
                <DraggableFilling key={i} filling={filling} canDrag={true} />
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

function mapStateToProps(state, ownProps) {
    let thisSandwichData = state.sandwiches[ownProps.sandwichUID]
    return { optionalFillings: thisSandwichData.optionalFillings }
}

FillingsBank.propTypes = {
    sandwichUID: PropTypes.number.isRequired,
}

FillingsBank.contextType = AppContext;

export default connect(mapStateToProps)(FillingsBank);
