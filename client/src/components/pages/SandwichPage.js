import "./../../styles.css"
import React, { Component } from "react";


import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import CondimentCard from "../modules/CondimentCard";

import PropTypes from 'prop-types';
import SandwichBuilderWeekly from "../modules/sandwich-builder-v2/SandwichBuilderWeekly";
import LearningGoalsDisplay from "../modules/sandwich-builder-v2/LearningGoalsDisplay";


import styled from "styled-components";

const InfoBox = styled.div`
    border: 1px solid lightgray;
    padding: 10px;
    margin-bottom: 20px;
`;

const MainHeading = styled.h1`
    margin-top: 20px;
    margin-left: 10%;
    margin-left: 10%;
`;

const Subheading = styled.h4`
    text-align: left;
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

const BuilderContainer = styled.div`
    border: 1px solid lightgray;
    padding: 20px;
`;

class SandwichPage extends React.Component {
    render() {

        return (
            <DndProvider backend={HTML5Backend}>
                <>
                    <div className="container">
                        <MainHeading>{this.props.sandwich.title}</MainHeading>
                        <Subheading>At a glance:</Subheading>
                        <InfoBox className="row">
                            <div>
                                Driving question: <em>{this.props.sandwich.drivingQuestion}</em><br />
                                Project question: <em>{this.props.sandwich.projectQuestion}</em><br />
                            </div>
                        </InfoBox>
                        <InfoBox className="row">
                            <div className="col">
                                <div className="row">
                                    Tags: {this.props.sandwich.tags.join(", ")}
                                </div>
                                <div className="row">
                                    Blurb: {this.props.sandwich.short_description}
                                </div>
                                <div className="row">
                                    Grade versions:
                                </div>
                                <div className="row">
                                    Related Modules:
                                </div>

                                <div className="row">
                                    Suggested Condiments:
                            {this.props.sandwich.suggested_condiments ? this.props.sandwich.suggested_condiments.map((uid) => <div className="col-sm" key={uid}>
                                    <CondimentCard uid={uid} />
                                </div>) :
                                        <div className="col">None</div>}
                                </div>
                            </div>

                            <div className="col">

                                <div className="row">
                                    <h6>Additional Resources:</h6>
                                </div>
                                {this.props.sandwich.resources.map((resource, index) =>
                                    <div className="row">
                                        <a key={index} href={process.env.PUBLIC_URL + resource.url}>{resource.text}</a>
                                    </div>
                                )}
                                {/* <div className="row">
                                        <a href={process.env.PUBLIC_URL + "/sandwich/" + this.props.sandwich.uid + "/sandwich-" + this.props.sandwich.uid + ".zip"} className="btn btn-info" role="button">.ZIP File</a>
                                    </div> */}
                            </div>

                        </InfoBox>
                        <LearningGoalsDisplay sandwich={this.props.sandwich} />

                        <Subheading>Customize it!</Subheading>
                        <BuilderContainer className="row">
                            <SandwichBuilderWeekly sandwich={this.props.sandwich} />
                        </BuilderContainer>



                    </div>
                </>
            </DndProvider>
        )
    }
}

SandwichPage.propTypes = {
    sandwich: PropTypes.object.isRequired,
}

export default SandwichPage;