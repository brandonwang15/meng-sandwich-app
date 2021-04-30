import React, { Component } from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";

const InfoBox = styled.div`
    border: 1px solid lightgray;
    padding: 10px;
    margin-bottom: 20px;
`;

const LearningGoalCategory = styled.div`
    margin-bottom: 20px;
`;

const LearningGoalContent = styled.div`
    text-align: left;
`;

const LearningSubgoals = styled.div`
    font-size: small;
`;

class LearningGoalsDisplay extends React.Component {
    render() {

        return (
            <InfoBox className="row">
                <div className="col">
                    Driving question: <em>{this.props.sandwich.drivingQuestion}</em><br />
                                    Project question: <em>{this.props.sandwich.projectQuestion}</em><br />
                    {Object.entries(this.props.sandwich.learningGoals).map(tuple => {
                        let obj = tuple[1];
                        let subComponents = obj.goals.map(goal =>
                            <LearningGoalContent>
                                <b>{goal.title} {goal.type !== "" ? "(" + goal.type + ")" : ""}</b>
                                <div>{goal.description}</div>
                                <LearningSubgoals>
                                    <ul>
                                        {goal.subgoals.map(subgoal =>
                                            <li>{subgoal}</li>
                                        )}
                                    </ul>
                                </LearningSubgoals>

                            </LearningGoalContent>
                        )
                        return <LearningGoalCategory><h5>{obj.title}</h5>{subComponents}</LearningGoalCategory>

                    })}
                </div>
            </InfoBox>
        )
    }
}

LearningGoalsDisplay.propTypes = {
    sandwich: PropTypes.object.isRequired,
}

export default LearningGoalsDisplay;