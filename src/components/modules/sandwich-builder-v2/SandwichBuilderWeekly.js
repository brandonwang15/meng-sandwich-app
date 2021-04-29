import React, { Component } from "react";

import { DragDropContext } from 'react-beautiful-dnd';

import NutritionFacts from "../NutritionFacts";
import FillingBank from "./FillingBank";
import FillingList from "./FillingList";

import PropTypes from 'prop-types';

class SandwichBuilderWeekly extends React.Component {

    onDragEnd(result) {
        // TODO: implement
        console.log("onDragEnd(): ", result);
    }

    render() {

        let fillings = [1,2,3,4,5];

        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-9 text-left">
                            <div className="row text-center">
                                <DragDropContext onDragEnd={this.onDragEnd}>
                                    <div className="col-6">
                                        <FillingList sandwichID={this.props.sandwich.uid} fillingListID={"list-1"}/>
                                    </div>
                                    <div className="col-6">
                                        {/* <FillingBank id={"A"} sandwichID={this.props.sandwich.uid} fillingIDs={fillings}/> */}
                                    </div>
                                </DragDropContext>
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