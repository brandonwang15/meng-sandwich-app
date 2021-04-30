import "./../../styles.css"
import React, { Component } from "react";
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
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

class SandwichExportPage extends React.Component {
    render() {
        return (
                <>
                    <MainHeading>{this.props.sandwichData.title}</MainHeading>
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