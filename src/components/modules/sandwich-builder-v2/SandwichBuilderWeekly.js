import React, { Component } from "react";

import { DragDropContext } from 'react-beautiful-dnd';

import NutritionFacts from "../NutritionFacts";
import FillingBank from "./FillingBank";
import FillingList from "./FillingList";

import PropTypes from 'prop-types';

import styled from 'styled-components';

const WeekDivider = styled.h3`
    margin-top: 20px;
    margin-bottom: 10px;
    border-bottom: 5px solid black;
    text-align: left;
    // padding-left: 10px;
    padding-bottom: 5px;
`

class SandwichBuilderWeekly extends React.Component {

    // Parse a plan id string of the format: "plan-list-{week}-{day}"
    // into [week, day]
    parsePlanListId(planListId) {
        let tokens = planListId.split("-");
        return [tokens[2], tokens[3]];
    }

    constructor(props) {
        super(props);
        const sandwich = props.sandwich;

        this.state = {
            planLists: {}, // entries for each day
            bankLists: {}, // entries in each bank
        }

        console.log("PROPS.sandwich", sandwich);

        for (let i = 0; i < sandwich.nWeeks; i++) {

            for (let day = 0; day < sandwich.daysInWeek; day++) {
                let listId = "plan-list-" + i + "-" + day;
                this.state.planLists[listId] = {
                    id: listId,
                    contents: [], // filling ids
                };
            }

            let bankId = "bank-list-" + i;
            this.state.bankLists[bankId] = {
                id: bankId,
                contents: [], // filling ids
            };
        }

        console.log("SandwichBuilderWeekly.state", this.state);

        // Seed initial fillings for the list from the required fillings
        Object.entries(props.sandwich.allFillings).forEach(tuple => {
            let filling = tuple[1];
            if (filling.isRequired) {
                this.state.planLists["plan-list-0-0"].contents.push(filling.uid);
            }
        })

        // Seed the bank with optional fillings
        Object.entries(props.sandwich.allFillings).forEach(tuple => {
            let filling = tuple[1];
            if (!filling.isRequired) {
                this.state.bankLists["bank-list-0"].contents.push(filling.uid);
            }
        })

        // Bind class functions
        this.onDragEnd = this.onDragEnd.bind(this);
        this.dragBetweenLists = this.dragBetweenPlanLists.bind(this);
        this.dragWithinList = this.dragWithinPlanList.bind(this);
        this.dragWithinBankList = this.dragWithinBankList.bind(this);
        this.dragBetweenDifferentTypedLists = this.dragBetweenDifferentTypedLists.bind(this);

    }

    dragBetweenPlanLists(result) {
        const { destination, source, draggableId } = result;

        // Check if no-op
        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        // Get the source list and destination list
        let sourceObj = this.state.planLists[result.source.droppableId];
        let destinationObj = this.state.planLists[result.destination.droppableId];

        // Get the object that was dragged
        let draggableObj = sourceObj.contents[source.index];


        const newSourceContents = Array.from(sourceObj.contents);
        const newDestinationContents = Array.from(destinationObj.contents);

        // Remove element from source        
        newSourceContents.splice(source.index, 1);
        // Insert element at destination
        newDestinationContents.splice(destination.index, 0, draggableObj);

        const newSourceObj = {
            ...sourceObj,
            contents: newSourceContents,
        }

        const newDestinationObj = {
            ...destinationObj,
            contents: newDestinationContents,
        }

        const newState = {
            planLists: {
                ...this.state.planLists,
                [newSourceObj.id]: newSourceObj,
                [newDestinationObj.id]: newDestinationObj,
            }
        }

        console.log("New state after drag: ", newState);

        this.setState(newState);

    }

    dragWithinPlanList(result) {
        const { destination, source, draggableId } = result;
        // Check if no-op
        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        // Get the list
        let sourceObj = this.state.planLists[result.source.droppableId];

        // Get the object that was dragged
        let draggableObj = sourceObj.contents[source.index];

        const newSourceContents = Array.from(sourceObj.contents);

        // Remove element from old index and insert at new index  
        newSourceContents.splice(source.index, 1);
        newSourceContents.splice(destination.index, 0, draggableObj);

        const newSourceObj = {
            ...sourceObj,
            contents: newSourceContents,
        }

        const newState = {
            planLists: {
                ...this.state.planLists,
                [newSourceObj.id]: newSourceObj,
            }
        }

        console.log("New state after drag: ", newState);

        this.setState(newState);
    }

    dragWithinBankList(result) {
        const { destination, source, draggableId } = result;
        // Check if no-op
        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        // Get the list
        let sourceObj = this.state.bankLists[result.source.droppableId];

        // Get the object that was dragged
        let draggableObj = sourceObj.contents[source.index];

        const newSourceContents = Array.from(sourceObj.contents);

        // Remove element from old index and insert at new index  
        newSourceContents.splice(source.index, 1);
        newSourceContents.splice(destination.index, 0, draggableObj);

        const newSourceObj = {
            ...sourceObj,
            contents: newSourceContents,
        }

        const newState = {
            bankLists: {
                ...this.state.bankLists,
                [newSourceObj.id]: newSourceObj,
            }
        }

        console.log("New state after drag: ", newState);

        this.setState(newState);
    }

    dragBetweenDifferentTypedLists(result) {
        const { destination, source, draggableId } = result;

        // Check if no-op
        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        // Get the source list and destination list
        let sourceType = result.source.droppableId.substring(0, 4);
        let destinationType = result.destination.droppableId.substring(0, 4);


        let sourceObj;
        let destinationObj;

        switch (sourceType) {
            case "plan":
                sourceObj = this.state.planLists[result.source.droppableId];
                break;
            case "bank":
                sourceObj = this.state.bankLists[result.source.droppableId];
                break;
            default:
                throw "unrecognized type: " + sourceType;
        }

        switch (destinationType) {
            case "plan":
                destinationObj = this.state.planLists[result.destination.droppableId];
                break;
            case "bank":
                destinationObj = this.state.bankLists[result.destination.droppableId];
                break;
            default:
                throw "unrecognized type: " + sourceType;
        }

        // Get the object that was dragged
        let draggableObj = sourceObj.contents[source.index];

        const newSourceContents = Array.from(sourceObj.contents);
        const newDestinationContents = Array.from(destinationObj.contents);

        // Remove element from source        
        newSourceContents.splice(source.index, 1);
        // Insert element at destination
        newDestinationContents.splice(destination.index, 0, draggableObj);

        const newSourceObj = {
            ...sourceObj,
            contents: newSourceContents,
        }

        const newDestinationObj = {
            ...destinationObj,
            contents: newDestinationContents,
        }

        let newState;
        if (sourceType === "plan" && destinationType === "bank") {
            newState = {
                planLists: {
                    ...this.state.planLists,
                    [newSourceObj.id]: newSourceObj,
                },
                bankLists: {
                    ...this.state.bankLists,
                    [newDestinationObj.id]: newDestinationObj,
                }
            }

        } else if (sourceType === "bank" && destinationType === "plan") {
            newState = {
                planLists: {
                    ...this.state.planLists,
                    [newDestinationObj.id]: newDestinationObj,
                },
                bankLists: {
                    ...this.state.bankLists,
                    [newSourceObj.id]: newSourceObj,
                }
            }
        } else {
            throw "Unexpected combination of source and destination types: " + sourceType + ", " + destinationType;
        }

        console.log("New state after drag: ", newState);

        this.setState(newState);

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

        if (sameList) {
            if (destinationListType == "plan") {
                this.dragWithinPlanList(result);
                return;
            } else if (destinationListType == "bank") {
                this.dragWithinBankList(result);
                return;
            } else {
                throw "unrecognized list type: " + destinationListType;
            }
        } else {
            if (destinationListType == sourceListType) {
                if (destinationListType == "plan") {
                    this.dragBetweenPlanLists(result);
                    return;
                } else if (destinationListType == "bank") {
                    return; // no-op, we don't allow dragging between bank lists
                } else {
                    throw "unrecognized list type: " + destinationListType;
                }
            }

            // TODO: Handle dragging between list types
            this.dragBetweenDifferentTypedLists(result);
            return;
        }

        throw "should never get here";
    }

    render() {
        console.log("sandwich: ", this.props.sandwich)

        // Generate the components to hold each week's plan lists
        let fillingListComponents = {}; 
        for (let i = 0; i < this.props.sandwich.nWeeks; i++) {
            fillingListComponents[i] = [];
        }

        // Note: this assumes that we iterate in ascending order by week and then day
        for (const planListId in this.state.planLists) {

            let obj = this.state.planLists[planListId];
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
                   
            finalComponents.push(<WeekDivider key={"week-divider-" + week}>{"Week " + (week + 1)}</WeekDivider>)

            let planCol = <div className="col-6">{fillingListComponents[week]}</div>;
            
            let bankListObj = this.state.bankLists["bank-list-"+week];
            let bankCol = <div className="col-6">
                <FillingBank
                    key={bankListObj.id}
                    displayTitle={"Suggested Fillings for Week " + (week + 1)}
                    listID={bankListObj.id}
                    sandwich={this.props.sandwich}
                    contents={bankListObj.contents}
                />
            </div>;

            finalComponents.push(<div className="row text-center">{planCol}{bankCol}</div>)
        }

        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-9 text-left">
                            <DragDropContext onDragEnd={this.onDragEnd}>
                                {finalComponents}
                            </DragDropContext>
                        </div>
                        
                        <div className="col-3">
                            <NutritionFacts sandwichData={[this.props.sandwich]} />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

SandwichBuilderWeekly.propTypes = {
    sandwich: PropTypes.object.isRequired,
}

export default SandwichBuilderWeekly;