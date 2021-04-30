import React, { Component } from "react";
import { connect } from 'react-redux'
import { DragDropContext } from 'react-beautiful-dnd';
import {
    NavLink
} from "react-router-dom";

import FillingBank from "./FillingBank";
import FillingList from "./FillingList";

import PropTypes from 'prop-types';

import { builderMoveFilling } from '../../../actions'
import WeeklySandwichNutritionFacts from "./WeeklySandwichNutritionFacts";

import styled from 'styled-components';
import store from "../../../store";


const WeekDivider = styled.h3`
    margin-top: 20px;
    margin-bottom: 10px;
    border-bottom: 5px solid black;
    text-align: left;
    // padding-left: 10px;
    padding-bottom: 5px;
`

const ExportButtonContainer = styled.div`
    padding: 10px;
`;

class SandwichBuilderWeekly extends React.Component {

    // Parse a plan id string of the format: "plan-list-{week}-{day}"
    // into [week, day]
    parsePlanListId(planListId) {
        let tokens = planListId.split("-");
        return [tokens[2], tokens[3]];
    }

    constructor(props) {
        super(props);

        // Bind class functions
        this.onDragEnd = this.onDragEnd.bind(this);

    }

    makeTestBackendRequest() {
        const url = "/test";
        fetch(url)
            .then(data=>{return data.text()})
            .then(res => {console.log("http response: ", res)});        
    }

    onDragEnd(result) {
        // TODO: implement
        console.log("onDragEnd(): ", result);

        const { destination, source } = result;

        // Check for a no-op
        if (!destination) {
            return;
        }
        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }


        const destinationListType = destination.droppableId.substring(0, 4);
        const sourceListType = source.droppableId.substring(0, 4);

        const sameList = destination.droppableId === source.droppableId;
        const sameListType = destinationListType === sourceListType;

        store.dispatch(builderMoveFilling(
            this.props.sandwich.uid,
            source.droppableId,
            destination.droppableId,
            source.index,
            destination.index));
    }

    render() {
        console.log("sandwich: ", this.props.sandwich)

        // Generate the components to hold each week's plan lists
        let fillingListComponents = {};
        for (let i = 0; i < this.props.sandwich.nWeeks; i++) {
            fillingListComponents[i] = [];
        }

        // Note: this assumes that we iterate in ascending order by week and then day
        for (const planListId in this.props.builderState.planLists) {

            let obj = this.props.builderState.planLists[planListId];
            let [week, day] = this.parsePlanListId(planListId);
            week = parseInt(week);
            day = parseInt(day);

            fillingListComponents[week].push(<FillingList
                key={obj.id}
                displayTitle={"Day " + (day + 1)}
                listID={obj.id}
                sandwich={this.props.sandwich}
                contents={obj.contents}
            />);

        }

        let finalComponents = [];

        // Generate the final layout by creating a row for each week.
        // The row will contain a column containing the planLists for the week, and a column containing
        // the bank for the week.
        for (let week = 0; week < this.props.sandwich.nWeeks; week++) {
            let totalDurationOfFillings = 0;
            finalComponents.push(<WeekDivider key={"week-divider-" + week}>{"Week " + (week + 1)}</WeekDivider>)


            let planCol = <div className="col-6">{fillingListComponents[week]}</div>;

            let bankListObj = this.props.builderState.bankLists["bank-list-" + week];
            let bankCol = <div className="col-6">
                <FillingBank
                    key={bankListObj.id}
                    displayTitle={"Suggested Fillings"}
                    listID={bankListObj.id}
                    sandwich={this.props.sandwich}
                    contents={bankListObj.contents}
                />
            </div>;

            finalComponents.push(<div className="row text-center">{planCol}{bankCol}</div>)
        }

        return (
            <>
                <div className="col-9 text-left">
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        {finalComponents}
                    </DragDropContext>
                </div>

                <div className="col-3">
                    <WeeklySandwichNutritionFacts sandwichId={[this.props.sandwich.uid]} />
                    <ExportButtonContainer>
                        <NavLink className="btn btn-primary" to={"/sandwich/export/" + this.props.sandwich.uid }>Export</NavLink>
                    </ExportButtonContainer>
                </div>
            </>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        builderState: state.sandwichBuilder[props.sandwich.uid]
    };
}

SandwichBuilderWeekly.propTypes = {
    sandwich: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(SandwichBuilderWeekly);