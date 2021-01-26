import React, { Component } from "react";
import SandwichHolder from "../modules/SandwichHolder";
import NutritionFacts from "../modules/NutritionFacts";
import PropTypes from 'prop-types';

const emptySandwich = {
    "uid": -1,
    "title": "N/A",
    "tags": []
};

class CurriculumBuilder extends React.Component {
    constructor(props) {
        super(props);

        // bind class methods
        this.handleSandwichHolderUpdate = this.handleSandwichHolderUpdate.bind(this);
        this.clearSandwichHolder = this.clearSandwichHolder.bind(this);
        this.clearAll = this.clearAll.bind(this);

        this.state = {
            sandwichData: [],
        };

        for (let i = 0; i < props.numSlots; i++){
            this.state.sandwichData.push(emptySandwich);
        }
    }

    // TODO: figure out why this only clears the last holder
    clearAll() {
        for(let i = 0; i < this.props.numSlots; i++) {
            this.clearSandwichHolder(i);
        }
    }

    clearSandwichHolder(indexToClear) {
        console.log("CALLED CLEAR with %s", indexToClear);
        this.handleSandwichHolderUpdate(indexToClear, emptySandwich);
    }

    handleSandwichHolderUpdate(indexToUpdate, newData) {
        const updatedSandwichData = this.state.sandwichData.map((data, j) => {
            if (j === indexToUpdate) {
                console.log("updated %s", indexToUpdate);
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
                    <SandwichHolder key={i} index={i} onSandwichUpdate={this.handleSandwichHolderUpdate} sandwichData={this.state.sandwichData[i]} clearSandwich={this.clearSandwichHolder}/>
                </div>)
            }

        return (
            <>
                <div class="row">
                    <div class="col-sm">
                        Your curriculum:
                                <NutritionFacts sandwichData={this.state.sandwichData}/>
                    </div>
                </div>
                <input type="button" value="TODO: Clear All" onClick={this.clearAll}/>
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
