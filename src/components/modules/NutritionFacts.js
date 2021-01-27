import React, { Component } from "react";
import './NutritionFacts.js';
import './NutritionFacts.css';
import PropTypes from 'prop-types';

class NutritionFacts extends React.Component {
    
    // returns set of tags as a list
    getCoveredTags(sandwiches) {
        let allTags = new Set();

        sandwiches.forEach(sw => {
            if (Object.keys(sw).length !== 0) {
                sw.tags.forEach(tag => allTags.add(tag));
            }
        });

        return Array.from(allTags);
    }

    render() {
        let numSandwiches = 0;

        this.props.sandwichData.forEach((wich) => {
            if (Object.keys(wich).length > 0) {
                numSandwiches++;
            }
        });


        return (<div class="container border border-nutrition-outline">
            <div class="row border-bottom border-nutrition-hr-thick">
                <div class="col-sm border-bottom">
                    <h3>Nutrition Facts</h3>
                </div>
            </div>
            <div class="row border-bottom border-nutrition-hr-med">
                <div class="col-9">
                    # of modules:
                </div>
                <div class="col-3">
                    {numSandwiches}
                </div>
            </div>
            <div class="row border-bottom border-nutrition-hr-thin text-left">
                <div class="col-12">
                    Tags covered:
                </div>
                <div class="col-12" style={{"font-size": "12px"}}>
                    <em>
                        {this.getCoveredTags(this.props.sandwichData).join(', ')}
                    </em>
                </div>
            </div>
            <div class="row border-bottom border-nutrition-hr-thin text-left">
                <div class="col-9">
                    Artificial Intelligence
                </div>
                <div class="col-3">
                    75%
                </div>
            </div>
            <div class="row border-bottom border-nutrition-hr-thin text-left">
                <div class="col-9">
                    Computational Thinking
                </div>
                <div class="col-3">
                    90%
                </div>
            </div>
            <div class="row border-bottom border-nutrition-hr-med text-left">
                <div class="col-9">
                    Design Thinking
                </div>
                <div class="col-3">
                    50%
                </div>
            </div>
            <div class="row border-bottom border-nutrition-hr-thin text-left small-text">
                <div class="col-9">
                    Creativity
                </div>
                <div class="col-3">
                    Yes
                </div>
            </div>
            <div class="row border-bottom border-nutrition-hr-thin text-left small-text">
                <div class="col-9">
                    Collaboration
                </div>
                <div class="col-3">
                    Yes
                </div>
            </div>
            <div class="row border-nutrition-hr-thin text-left small-text">
                <div class="col-9">
                    Reflection
                </div>
                <div class="col-3">
                    Yes
                </div>
            </div>
            
        </div>)
    }
}

NutritionFacts.propTypes = {
    sandwichData: PropTypes.object.isRequired,
}

export default NutritionFacts;