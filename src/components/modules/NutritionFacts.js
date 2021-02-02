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


        return (<div className="container border border-nutrition-outline">
            <div className="row border-bottom border-nutrition-hr-thick">
                <div className="col-sm border-bottom">
                    <h3>Nutrition Facts</h3>
                </div>
            </div>
            <div className="row border-bottom border-nutrition-hr-med">
                <div className="col-9">
                    # of modules:
                </div>
                <div className="col-3">
                    {numSandwiches}
                </div>
            </div>
            <div className="row border-bottom border-nutrition-hr-thin text-left">
                <div className="col-12">
                    Tags covered:
                </div>
                <div className="col-12" style={{"fontSize": "12px"}}>
                    <em>
                        {this.getCoveredTags(this.props.sandwichData).join(', ')}
                    </em>
                </div>
            </div>
            <div className="row border-bottom border-nutrition-hr-thin text-left">
                <div className="col-9">
                    Artificial Intelligence
                </div>
                <div className="col-3">
                    75%
                </div>
            </div>
            <div className="row border-bottom border-nutrition-hr-thin text-left">
                <div className="col-9">
                    Computational Thinking
                </div>
                <div className="col-3">
                    90%
                </div>
            </div>
            <div className="row border-bottom border-nutrition-hr-med text-left">
                <div className="col-9">
                    Design Thinking
                </div>
                <div className="col-3">
                    50%
                </div>
            </div>
            <div className="row border-bottom border-nutrition-hr-thin text-left small-text">
                <div className="col-9">
                    Creativity
                </div>
                <div className="col-3">
                    Yes
                </div>
            </div>
            <div className="row border-bottom border-nutrition-hr-thin text-left small-text">
                <div className="col-9">
                    Collaboration
                </div>
                <div className="col-3">
                    Yes
                </div>
            </div>
            <div className="row border-nutrition-hr-thin text-left small-text">
                <div className="col-9">
                    Reflection
                </div>
                <div className="col-3">
                    Yes
                </div>
            </div>
            
        </div>)
    }
}

NutritionFacts.propTypes = {
    sandwichData: PropTypes.array.isRequired,
}

export default NutritionFacts;