import React, { Component } from "react";
import './NutritionFacts.js'
import PropTypes from 'prop-types';

class NutritionFacts extends React.Component {
    render() {
        let numSandwiches = 0;

        this.props.sandwichData.forEach((wich) => {
            if (wich.uid !== -1) {
                numSandwiches++;
            }
        });

        return (<div class="container border border-primary">
            <div class="row">
                <div class="col-sm">
                    <h1>Nutrition Facts</h1>
                </div>
            </div>
            <div class="row border">
                <div class="col-sm">
                    <h3>Content Type:</h3>
                </div>
                <div class="col-sm">
                    <h3>Curriculum Coverage:</h3>
                </div>
            </div>
            <div class="row border">
                <div class="col-sm">
                    # of modules:
                </div>
                <div class="col-sm">
                    {numSandwiches}
                </div>
            </div>
            <div class="row border">
                <div class="col-sm">
                    Design Thinking
                </div>
                <div class="col-sm">
                    0
                </div>
            </div>
            
        </div>)
    }
}

NutritionFacts.propTypes = {
    sandwichData: PropTypes.object.isRequired,
}

export default NutritionFacts;