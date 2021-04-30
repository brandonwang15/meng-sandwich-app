import React, { Component } from "react";
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import AppContext from "../../context/app_context";
import data from "../../../data/all_modules"
import FillingSlot from "./FillingSlot";
import DraggableFilling from "./DraggableFilling";

class FillingsBank extends React.Component {

    constructor(props) {
        super(props);
        this.isFillingPickedAlready = this.isFillingPickedAlready.bind(this);
    }

    isFillingPickedAlready(filling) {
        console.log("inside is fillingpickedalready");
        console.log(this.props.fillingContents);
        let pickedFillings = Object.values(this.props.fillingContents);
        for (let i = 0; i < pickedFillings.length; i++){
            if (pickedFillings[i].title == filling.title) {
                return true;
            }
        }
        return false;
    }

    render() {
        console.log("fillingsBank: ", this.props.optionalFillings);

        let fillingsList = []

        console.log(this.props.sandwichUID)
        let numOptional = this.props.optionalFillings.length;

        for (let i = 0; i < numOptional; i++) {
            let filling = this.props.optionalFillings[i]
            fillingsList.push(
                <DraggableFilling key={i} filling={filling} canDrag={!this.isFillingPickedAlready(filling)} />
            )
        }

        return (
            <>
                <h3>Fillings Bank</h3>
                {fillingsList}
            </>
        )
    }

}

function mapStateToProps(state, ownProps) {
    let thisSandwichData = state.sandwiches[ownProps.sandwichUID]
    console.log("FillingsBank: mapStateToProps() called: ", thisSandwichData);
    return {
        optionalFillings: thisSandwichData.optionalFillings,
        fillingContents: thisSandwichData.contents
    }
}

FillingsBank.propTypes = {
    sandwichUID: PropTypes.number.isRequired,
}

FillingsBank.contextType = AppContext;

export default connect(mapStateToProps)(FillingsBank);
