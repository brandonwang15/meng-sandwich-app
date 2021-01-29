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
                <div class="col-sm">
                    <SandwichHolder
                        key={i}
                        index={i}/>
                </div>)
        }

        return (
            <>
                <div class="row">
                    <div class="col">
                    </div>
                </div>
                <input type="button" value="TODO: Clear All" onClick={this.context.clearUserCurriculum} />
                <br />
                <div class="row">
                    <div class="col-9">
                        <div class="row">
                            {holderList}
                        </div>
                    </div>
                    <div class="col-3">
                                <NutritionFacts sandwichData={this.context.curriculumSandwiches} />
                    </div>
                </div>
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
