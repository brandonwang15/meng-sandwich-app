import React, { Component } from "react";
import { connect } from 'react-redux'
import { DragDropContext } from 'react-beautiful-dnd';
import {
    NavLink
} from "react-router-dom";

import FillingBank from "./FillingBank";
import FillingList from "./FillingList";

import PropTypes from 'prop-types';

import { builderMoveFilling, setWeekAndDays, builderResetSandwichContents } from '../../../actions'
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

const SetButton = styled.button`
    margin: auto;
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

        let sandwich = store.getState().sandwiches[props.sandwichId];

        this.state = {
            nWeeks: sandwich.nWeeks,
            daysPerWeek: sandwich.daysInWeek,
            weeksDaysNeedUpdate: false,
        };

        // Bind class functions
        this.onDragEnd = this.onDragEnd.bind(this);
        this.setWeekAndDays = this.setWeekAndDays.bind(this);
        this.updateWeeksLabel = this.updateWeeksLabel.bind(this);
        this.updateDaysLabel = this.updateDaysLabel.bind(this);

    }

    makeTestBackendRequest() {
        const url = "/test";
        fetch(url)
            .then(data => { return data.text() })
            .then(res => { console.log("http response: ", res) });
    }

    setWeekAndDays() {
        console.log("setWeekAndDays() called: ", this.state.nWeeks, this.state.daysPerWeek);

        const totalDaysAvailable = this.state.nWeeks * this.state.daysPerWeek;
        console.log("sandwich: ", store.getState().sandwiches[this.props.sandwichId]);
        // Add one because class nums are 0-indexed
        const minRequiredDays = 1 + store.getState().sandwiches[this.props.sandwichId].latestSuggestedFillingClassNum();

        console.log("total: ", totalDaysAvailable, " minRequired: ", minRequiredDays);

        if (totalDaysAvailable < minRequiredDays) {
            alert("The contents of this sandwich require at least "+minRequiredDays+" days!");
            return;
        }

        this.setState({
            weeksDaysNeedUpdate: false,
        })
        
        store.dispatch(setWeekAndDays(this.props.sandwichId, this.state.nWeeks,  this.state.daysPerWeek));
        // Since store.dispatch happens synchrounously, this line will see the effect of the previous line, which
        // is required for correctness
        store.dispatch(builderResetSandwichContents(this.props.sandwichId, store.getState().sandwiches[this.props.sandwichId]));
    }

    updateWeeksLabel(val) {
        console.log("weeks: ", val);
        this.setState({
            nWeeks: parseInt(val),
            weeksDaysNeedUpdate: true,
        })
    }

    updateDaysLabel(val) {
        console.log("days: ", val);
        this.setState({
            daysPerWeek: parseInt(val),
            weeksDaysNeedUpdate: true,
        })
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
            this.props.sandwichId,
            source.droppableId,
            destination.droppableId,
            source.index,
            destination.index));
    }

    render() {
        const sandwich = store.getState().sandwiches[this.props.sandwichId];
        console.log("sandwich: ", sandwich)

        // Generate the components to hold each week's plan lists
        let fillingListComponents = {};
        for (let i = 0; i < sandwich.nWeeks; i++) {
            fillingListComponents[i] = [];
        }

        // Note: this assumes that we iterate in ascending order by week and then day
        for (const planListId in this.props.builderState.planLists) {

            let obj = this.props.builderState.planLists[planListId];
            let [week, day] = this.parsePlanListId(planListId);
            week = parseInt(week);
            day = parseInt(day);

            console.log("week: ", week);
            console.log("builderState: ", this.props.builderState);
            console.log("fillingListComponents: ", fillingListComponents);

            fillingListComponents[week].push(<FillingList
                key={obj.id}
                displayTitle={"Day " + (day + 1)}
                listID={obj.id}
                sandwich={sandwich}
                contents={obj.contents}
            />);

        }

        let finalComponents = [];

        // Generate the final layout by creating a row for each week.
        // The row will contain a column containing the planLists for the week, and a column containing
        // the bank for the week.
        for (let week = 0; week < sandwich.nWeeks; week++) {
            let totalDurationOfFillings = 0;
            finalComponents.push(<WeekDivider key={"week-divider-" + week}>{"Week " + (week + 1)}</WeekDivider>)


            let planCol = <div key="plan-col" className="col-6">{fillingListComponents[week]}</div>;

            let bankListObj = this.props.builderState.bankLists["bank-list-" + week];
            let bankCol = <div key="bank-col" className="col-6">
                <FillingBank
                    key={bankListObj.id}
                    displayTitle={"Suggested Fillings"}
                    listID={bankListObj.id}
                    sandwich={sandwich}
                    contents={bankListObj.contents}
                />
            </div>;

            finalComponents.push(<div key={"plan-bank-col-"+week} className="row text-center">{planCol}{bankCol}</div>)
        }

        return (
            <>
                <div className="row">
                        <div className="col">
                            <div className="form-group row">
                                <label className="col-6" id="num-weeks-label" htmlFor="num-weeks-field">{this.state.nWeeks} weeks</label>
                                <input type="range" className="custom-range col-6" min="1" max="20" value={this.state.nWeeks} id="num-weeks-field" onChange={(e) => this.updateWeeksLabel(e.target.value)}></input>
                            </div>
                            <div className="form-group row">
                                <label className="col-6" id="num-days-label" htmlFor="num-days-field">{this.state.daysPerWeek} days per week</label>
                                <input type="range" className="custom-range col-6" min="1" max="5" value={this.state.daysPerWeek} id="num-days-field" onChange={(e) => this.updateDaysLabel(e.target.value)}></input>

                            </div>
                            <div className="form-group row">
                                <SetButton className="btn btn-primary col" disabled={!this.state.weeksDaysNeedUpdate} onClick={this.setWeekAndDays}>Set (changes will be lost!)</SetButton>
                            </div>
                        </div>
                </div>
                <div className="row">
                    <div className="col-9 text-left">
                        <DragDropContext onDragEnd={this.onDragEnd}>
                            {finalComponents}
                        </DragDropContext>
                    </div>

                        <div className="col-3">
                        <WeeklySandwichNutritionFacts sandwichId={this.props.sandwichId} />
                        <ExportButtonContainer>
                            <NavLink className="btn btn-primary" to={"/sandwich/export/" + this.props.sandwichId}>Export</NavLink>
                        </ExportButtonContainer>
                    </div>
                </div>
            </>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        builderState: state.sandwichBuilder[props.sandwichId]
    };
}

SandwichBuilderWeekly.propTypes = {
    sandwichId: PropTypes.number.isRequired,
}

export default connect(mapStateToProps)(SandwichBuilderWeekly);