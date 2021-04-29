import React, { Component } from "react";

import { DragDropContext } from 'react-beautiful-dnd';

import NutritionFacts from "../NutritionFacts";
import FillingBank from "./FillingBank";
import FillingList from "./FillingList";

import PropTypes from 'prop-types';

class SandwichBuilderWeekly extends React.Component {

    constructor(props) {
        super(props);
        const sandwich = props.sandwich;

        this.state = {
            weekLists: {}, // entries in each week
            bankLists: {}, // entries in each bank
        }

        console.log("PROPS.sandwich", sandwich);

        for (let i = 0; i < sandwich.nWeeks; i++) {
            let weekId = "week-list-" + i;
            this.state.weekLists[weekId] = {
                id: weekId,
                contents: [], // filling ids
            };

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
                this.state.weekLists["week-list-0"].contents.push(filling.uid);
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
        this.dragBetweenLists = this.dragBetweenWeekLists.bind(this);
        this.dragWithinList = this.dragWithinWeekList.bind(this);
        this.dragWithinBankList = this.dragWithinBankList.bind(this);
        this.dragBetweenDifferentTypedLists = this.dragBetweenDifferentTypedLists.bind(this);

    }

    dragBetweenWeekLists(result) {
        const { destination, source, draggableId } = result;

        // Check if no-op
        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        // Get the source list and destination list
        let sourceObj = this.state.weekLists[result.source.droppableId];
        let destinationObj = this.state.weekLists[result.destination.droppableId];

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
            weekLists: {
                ...this.state.weekLists,
                [newSourceObj.id]: newSourceObj,
                [newDestinationObj.id]: newDestinationObj,
            }
        }

        console.log("New state after drag: ", newState);

        this.setState(newState);

    }

    dragWithinWeekList(result) {
        const { destination, source, draggableId } = result;
        // Check if no-op
        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        // Get the list
        let sourceObj = this.state.weekLists[result.source.droppableId];

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
            weekLists: {
                ...this.state.weekLists,
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
            case "week":
                sourceObj = this.state.weekLists[result.source.droppableId];
                break;
            case "bank":
                sourceObj = this.state.bankLists[result.source.droppableId];
                break;
            default:
                throw "unrecognized type: " + sourceType;
        }

        switch (destinationType) {
            case "week":
                destinationObj = this.state.weekLists[result.destination.droppableId];
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
        if (sourceType === "week" && destinationType === "bank") {
            newState = {
                weekLists: {
                    ...this.state.weekLists,
                    [newSourceObj.id]: newSourceObj,
                },
                bankLists: {
                    ...this.state.bankLists,
                    [newDestinationObj.id]: newDestinationObj,
                }
            }

        } else if (sourceType === "bank" && destinationType === "week") {
            newState = {
                weekLists: {
                    ...this.state.weekLists,
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
            if (destinationListType == "week") {
                this.dragWithinWeekList(result);
                return;
            } else if (destinationListType == "bank") {
                this.dragWithinBankList(result);
                return;
            } else {
                throw "unrecognized list type: " + destinationListType;
            }
        } else {
            if (destinationListType == sourceListType) {
                if (destinationListType == "week") {
                    this.dragBetweenWeekLists(result);
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
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-9 text-left">
                            <div className="row text-center">
                                <DragDropContext onDragEnd={this.onDragEnd}>
                                    <div className="col-6">
                                        {
                                            Object.entries(this.state.weekLists).map((tuple, index) => {
                                                let obj = tuple[1];
                                                return <FillingList
                                                    key={obj.id}
                                                    displayTitle={"Week " + (index+1)}
                                                    listID={obj.id}
                                                    sandwich={this.props.sandwich}
                                                    contents={obj.contents}
                                                />
                                            }
                                            )
                                        }

                                    </div>
                                    <div className="col-6">
                                        {Object.entries(this.state.bankLists).map((tuple, index) => {
                                            let obj = tuple[1];
                                            return <FillingBank
                                                key={obj.id}
                                                displayTitle={"Suggested Fillings for Week " + (index+1)}
                                                listID={obj.id}
                                                sandwich={this.props.sandwich}
                                                contents={obj.contents}
                                            />
                                        })}

                                        {/* <FillingBank id={"A"} sandwichID={this.props.sandwich.uid} fillingIDs={fillings}/> */}
                                    </div>
                                </DragDropContext>
                            </div>
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