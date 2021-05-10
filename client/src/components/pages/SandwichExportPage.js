import "./../../styles.css"
import React, { Component } from "react";
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import styled from "styled-components";

import WeeklySandwichNutritionFacts from "../modules/sandwich-builder-v2/WeeklySandwichNutritionFacts";

import { startExport } from "../../misc/SandwichHelpers"; 
import { setExportResults } from '../../actions'
import store from "../../store";

const InfoBox = styled.div`
    border: 1px solid lightgray;
    padding: 10px;
    margin-bottom: 20px;
`;

const MainHeading = styled.h1`
    margin-top: 20px;
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

    constructor(props) {
        super(props);

        // Bind class functions
        this.startExportingMaterialsForThisSandwich = this.startExportingMaterialsForThisSandwich.bind(this);
    }

    startExportingMaterialsForThisSandwich() {
        startExport(this.props.sandwichId, (responseJSON) => {
            console.log("Callback got responseJSON: ", responseJSON);
            store.dispatch(setExportResults(this.props.sandwichId, responseJSON));
        });
    }

    render() {
        const exportResults = this.props.sandwichData.exportResults;
        console.log("export results in render(): ", exportResults);


        const isLoaded = exportResults != null && !this.props.sandwichData.isExportInProgress;
        const inProgress = this.props.sandwichData.isExportInProgress;
        const noExport = exportResults == null && !this.props.sandwichData.isExportInProgress;
        const loadSuccessful = exportResults != null && exportResults.success

        const errorMessage = exportResults != null ? exportResults.errorMessage : "";

        var exportPairs = [];

        if (exportResults != null && exportResults.contents != null) {
            exportPairs = Object.entries(exportResults.contents);
        }

        console.log("isLoaded: ", isLoaded);
        console.log("inProgress: ", inProgress);
        console.log("noexport: ", noExport);
        console.log("loadSuccessful: ", loadSuccessful);

        return (
            <>
                <div className="row">
                    <div className="col">
                        <MainHeading>{this.props.sandwichData.title}</MainHeading>
                    </div>

                </div>
                <div className="row">
                    <div className="col">
                        <h3>Custom generated for your sandwich configuration</h3>
                    </div>
                </div>
                <div className="row">
                    <LoadingDiv className="col">
                        <h2>
                            <span hidden={!inProgress} className="badge badge-info">
                                Loading...
                                    <div hidden={!inProgress} className="spinner-border ml-auto text-light" role="status" aria-hidden="true"></div>
                            </span>
                            <span hidden={!noExport} className="badge badge-warning">No export started, please retry.</span>

                            <span hidden={!(isLoaded && loadSuccessful)} className="badge badge-success">Loaded</span>
                            <span hidden={!(isLoaded && !loadSuccessful)} className="badge badge-danger">Load error!</span>
                        </h2>
                        <div hidden={!(isLoaded && !loadSuccessful)}>
                            <div className="alert alert-danger" role="alert">
                                <b>Error: </b>
                                <em>{errorMessage}</em><br />
                                <button className="btn btn-info" onClick={this.startExportingMaterialsForThisSandwich}>Retry</button>
                            </div>
                        </div>
                    </LoadingDiv>
                </div>
                <div className="row">
                    <div className="col-9 mx-auto">
                        {
                            exportPairs.map(tuple => {
                                const [key, value] = tuple;

                                return <ExportedContent key={key} className="row">
                                    <ExportedContentDescription className="col-4">
                                        {key+":"}
                                    </ExportedContentDescription>
                                    <LinkTextField className="col">
                                        <a href={value} target="_blank">{value}</a>
                                    </LinkTextField>
                                </ExportedContent>
                            })
                        }
                    </div>

                </div>
                <div className="row">
                    <ExportedContent className="col-6 mx-auto">
                        <h4>Additional Resources:</h4>
                        {this.props.sandwichData.resources.map((resource, index) =>
                            <div key={index}>
                                <a href={process.env.PUBLIC_URL + resource.url}>{resource.text}</a>
                            </div>
                        )}
                        <ZipButton className="btn btn-primary">Download ZIP</ZipButton>
                    </ExportedContent>
                </div>
                <div className="row mx-auto">
                    <WeeklySandwichNutritionFacts sandwichId={this.props.sandwichId} />
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