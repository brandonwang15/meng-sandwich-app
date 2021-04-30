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
            <div className="card">
                <a className="card-header" data-toggle="collapse" href="#collapseInfo" role="button" aria-expanded="false" aria-controls="collapseInfo">
                    Learning Goals
                </a>
                <div className="card-body collapse show" id="collapseInfo">
                    <div className="row">
                        <div className="col">
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
                    </div>
                </div>
            </div>

        )
    }
}

LearningGoalsDisplay.propTypes = {
    sandwich: PropTypes.object.isRequired,
}

export default LearningGoalsDisplay;