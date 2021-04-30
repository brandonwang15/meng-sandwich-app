import React, { Component } from "react";
import SandwichHolder from "../modules/SandwichHolder";
import NutritionFacts from "../modules/NutritionFacts";

import PropTypes from 'prop-types';

import AppContext from "../context/app_context";
import data from "../../data/all_modules"
import FilterableSandwichContainer from "../modules/FilterableSandwichContainer";

// Displays the state of the user's curriculum sandwiches, along with 
// a filterable list of all sandwiches. 
// Sandwiches from the list can be dragged and dropped into the user's 
// curriculum slots to modify the curriculum.
class CurriculumBuilder extends React.Component {
    render() {
        const holderList = []
        for (let i = 0; i < this.props.numSlots; i++) {
            holderList.push(
                <div className="col-sm" key={i}>
                    <SandwichHolder
                        index={i}/>
                </div>)
        }

        return (
            <>
                <div className="row">
                    <div className="col">
                    </div>
                </div>
                <div className="row">
                    <div className="col-9">
                        <div className="row">
                            {holderList}
                        </div>
                    </div>
                    <div className="col-3">
                                <NutritionFacts sandwichData={this.context.curriculumSandwiches} />
                    </div>
                </div>
                <button type="button" className="btn btn-danger" value="Clear Curriculum" onClick={this.context.clearUserCurriculum}>
                    Clear Curriculum
                </button>
                <hr />
                <FilterableSandwichContainer
                    sandwichData={data}
                    draggableMode={true}
                    isSandwichDraggable={this.context.isSandwichInUserCurriculum} />
            </>
        )
    }

}

CurriculumBuilder.propTypes = {
}

CurriculumBuilder.contextType = AppContext;

export default CurriculumBuilder;
