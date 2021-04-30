import "./../../styles.css"
import React, { Component } from "react";
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import styled from "styled-components";
import WeeklySandwichNutritionFacts from "../modules/sandwich-builder-v2/WeeklySandwichNutritionFacts";

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

const ExportedContent = styled.div`
    background-color: #8bff61;
    margin: 30px;
    padding: 15px;
    text-align: left;

`;

const ExportedContentDescription = styled.div`
    color: black;
    font-size: 20px;
`;

const LinkTextField = styled.div`
    background-color: #bfffa8;
    border: 1px solid gray;
    padding: 5px;
    width: 100%;
    font-family: monospace;
`;

const ZipButton = styled.button`
    padding: 10px;
    margin-top: 20px;
`;

class SandwichExportPage extends React.Component {
    render() {
        return (
            <>
                <div className="row">
                    <MainHeading>{this.props.sandwichData.title}</MainHeading>
                </div>
                <div className="row">
                    <div className="col-9">
                        <ExportedContent className="row">
                            <ExportedContentDescription className="col-4">
                                Class slides:
                            </ExportedContentDescription>
                            <LinkTextField className="col">
                                https://reactjs.org/docs/refs-and-the-dom.html
                            </LinkTextField>
                        </ExportedContent>
                        <ExportedContent className="row">
                            <ExportedContentDescription className="col-4">
                                Student Workbook:
                            </ExportedContentDescription>
                            <LinkTextField className="col">
                                https://reactjs.org/docs/refs-and-the-dom.html
                            </LinkTextField>
                        </ExportedContent>
                        <ExportedContent className="row">
                            <ExportedContentDescription className="col-4">
                                Teacher Facilitation Guide:
                            </ExportedContentDescription>
                            <LinkTextField className="col">
                                https://reactjs.org/docs/refs-and-the-dom.html
                            </LinkTextField>
                        </ExportedContent>
                    </div>
                    <div className="col-3">
                        <WeeklySandwichNutritionFacts sandwichId={[this.props.sandwichId]} />
                    </div>
                </div>
                <div className="row">
                    <ExportedContent className="col-9">
                        <h4>Additional Resources:</h4>
                        {this.props.sandwichData.resources.map((resource, index) =>
                            <div>
                                <a key={index} href={process.env.PUBLIC_URL + resource.url}>{resource.text}</a>
                            </div>
                        )}
                        <ZipButton className="btn btn-primary">Download ZIP</ZipButton>
                    </ExportedContent>
                </div>

            </>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        sandwichData: state.sandwiches[props.sandwichId],
        builderData: state.sandwichBuilder[props.sandwichId],
    }
}

SandwichExportPage.propTypes = {
    sandwichId: PropTypes.number.isRequired,
}

export default connect(mapStateToProps)(SandwichExportPage);