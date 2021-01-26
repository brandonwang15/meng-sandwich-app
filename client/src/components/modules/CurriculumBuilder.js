import React, { Component } from "react";
import SandwichHolder from "../modules/SandwichHolder";
import NutritionFacts from "../modules/NutritionFacts";
import PropTypes from 'prop-types';

class CurriculumBuilder extends React.Component {
    constructor(props) {
        super(props);

        // bind class methods
        this.handleSandwichHolderUpdate = this.handleSandwichHolderUpdate.bind(this);

        const emptySandwich = {
            "uid": -1,
            "title": "N/A",
            "tags": []
        };

        this.state = {
            sandwichData: [],
        };

        for (let i = 0; i < props.numSlots; i++){
            this.state.sandwichData.push(emptySandwich);
        }
    }

    handleSandwichHolderUpdate(indexToUpdate, newData) {
        const updatedSandwichData = this.state.sandwichData.map((data, j) => {
            if (j == indexToUpdate) {
                return newData;
            } else {
                return data;
            }          
        });

        this.setState({sandwichData: updatedSandwichData});
    }

    render() {
        const holderList = []
        for (let i = 0; i < this.props.numSlots; i++) {
            holderList.push(
                <div class="col-sm">
                    <SandwichHolder key={i} index={i} onSandwichUpdate={this.handleSandwichHolderUpdate} sandwichData={this.state.sandwichData[i]}/>
                </div>)
            }

        return (
            <>
                <div class="row">
                    <div class="col-sm">
                        Your curriculum:
                                <NutritionFacts />
                    </div>
                </div>
                <br />
                <div class="row">
                    {holderList}
                </div>
            </>
        )
    }

}

CurriculumBuilder.propTypes = {
    numSlots: PropTypes.number.isRequired,
}

export default CurriculumBuilder;
