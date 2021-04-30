import React, { Component } from "react";
import { connect } from 'react-redux'

import './WeeklySandwichNutritionFacts.css';
import PropTypes from 'prop-types';

class WeeklySandwichNutritionFacts extends React.Component {
    

    render() {
        // Sum up durations of selected fillings
        let totalDurationOfFillings = 0;
        console.log("sdad:", this.props.builderData);
        Object.entries(this.props.builderData.planLists).forEach(tuple => {
            let planList = tuple[1];
            planList.contents.forEach(fillingId => {
                totalDurationOfFillings += this.props.sandwichData.allFillings[fillingId].duration;
            });
        });


        return (<div className="container border border-nutrition-outline">
            <div className="row border-bottom border-nutrition-hr-thick">
                <div className="col-sm border-bottom">
                    <h3>Nutrition Facts</h3>
                </div>
            </div>
            <div className="row border-bottom border-nutrition-hr-med text-left">
                <div className="col-9">
                    Total class time (hrs):
                </div>
                <div className="col-3">
                    <b>{totalDurationOfFillings/60}</b>
                </div>
            </div>
            <div className="row border-bottom border-nutrition-hr-thin text-left">
                <div className="col-12">
                    Tags covered:
                </div>
                <div className="col-12" style={{"fontSize": "12px"}}>
                    <em>
                        {this.props.sandwichData.tags.join(", ")}
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


function mapStateToProps(state, props) {
    console.log("state", state);
    return {
        builderData: state.sandwichBuilder[props.sandwichId],
        sandwichData: state.sandwiches[props.sandwichId],
    };
}

WeeklySandwichNutritionFacts.propTypes = {
    sandwichId: PropTypes.number.isRequired,
}

export default connect(mapStateToProps)(WeeklySandwichNutritionFacts);