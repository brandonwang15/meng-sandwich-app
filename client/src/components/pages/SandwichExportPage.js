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

const LoadingDiv = styled.div`
    padding-left: 50px;
    padding-right: 50px;
`;

class SandwichExportPage extends React.Component {
    render() {
        const exportResults = this.props.sandwichData.exportResults;
        console.log("export results in render(): ", exportResults);

        const exportPairs = exportResults != null ? Object.entries(exportResults) : [];

        const isLoaded = exportResults != null && !this.props.sandwichData.isExportInProgress;
        const inProgress = this.props.sandwichData.isExportInProgress;
        const noExport = exportResults == null && !this.props.sandwichData.isExportInProgress;

        console.log("isLoaded: ", isLoaded);
        console.log("inProgress: ", inProgress);
        console.log("noexport: ", noExport);

        return (
            <>
                <div className="row">
                    <MainHeading>{this.props.sandwichData.title}</MainHeading>

                </div>
                <div className="row">
                    <LoadingDiv className="col-9">
                        <div class="d-flex align-items-center">
                            <strong>Status: </strong>
                            <span hidden={!inProgress} className="badge badge-info">Loading...</span>
                            <div hidden={!inProgress} className="spinner-border ml-auto text-primary" role="status" aria-hidden="true"></div>
                            <span hidden={!isLoaded} className="badge badge-success">LOADED</span>
                            <span hidden={!noExport} className="badge badge-warning">No export started, please retry.</span>
                        </div>
                    </LoadingDiv>
                </div>
                <div className="row">
                    <div className="col-9">
                        {
                            exportPairs.map(tuple => {
                                const [key, value] = tuple;
                                
                                return <ExportedContent className="row">
                                <ExportedContentDescription className="col-4">
                                    {key}
                                </ExportedContentDescription>
                                <LinkTextField className="col">
                                    {value}
                                </LinkTextField>
                            </ExportedContent>
                            })
                        }
                    </div>
                    <div className="col-3">
                        <WeeklySandwichNutritionFacts sandwichId={this.props.sandwichId} />
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
    console.log("SandwichData in export page mapstatetoprops: ", state.sandwiches[props.sandwichId]);
    return {
        sandwichData: state.sandwiches[props.sandwichId],
        builderData: state.sandwichBuilder[props.sandwichId],
    }
}

SandwichExportPage.propTypes = {
    sandwichId: PropTypes.number.isRequired,
}

export default connect(mapStateToProps)(SandwichExportPage);