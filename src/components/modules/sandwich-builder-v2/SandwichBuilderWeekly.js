import React, { Component } from "react";


import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


import NutritionFacts from "../NutritionFacts";
import FillingBank from "./FillingBank";
import FillingList from "./FillingList";

import PropTypes from 'prop-types';

class SandwichBuilderWeekly extends React.Component {
    render() {

        let fillings = [1,2,3,4,5];

        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-9 text-left">
                            <div className="row text-center">
                                <div className="col-6">
                                    <FillingList sandwichID={this.props.sandwich.uid} fillingListID={1}/>
                                </div>
                                <div className="col-6">
                                    <FillingBank id={"A"} sandwichID={this.props.sandwich.uid} fillingIDs={fillings}/>
                                </div>
                            </div>
                        </div>

                        <div className="col-3">
                            <NutritionFacts sandwichData={[this.props.sandwich]} />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

SandwichBuilderWeekly.propTypes = {
    sandwich: PropTypes.object.isRequired,
}

export default SandwichBuilderWeekly;