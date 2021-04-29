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
            weekLists: {},
        }

        console.log("PROPS.sandwich", sandwich);

        for (let i = 0; i < sandwich.nWeeks; i++) {
            let id = "week-list-" + i;
            this.state.weekLists[id] = {
                id: "week-list-" + i,
                contents: []
            }; // push an empty list for each week
        }

        console.log("SandwichBuilderWeekly.state", this.state);

        // Seed initial fillings for the list
        this.state.weekLists["week-list-0"].contents.push(props.sandwich.allFillings['filling-launch']);
        this.state.weekLists["week-list-0"].contents.push(props.sandwich.allFillings['filling-bias']);
        this.state.weekLists["week-list-0"].contents.push(props.sandwich.allFillings['filling-comm-preso']);

        // Bind class functions
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(result) {
        // TODO: implement
        console.log("onDragEnd(): ", result);

        const {destination, source, draggableId} = result;

        // Check if no-op
        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        // Get the source list and destination list
        let sourceObj = this.state.weekLists[result.source.droppableId];
        
        // Get the object that was dragged
        let draggableObj = sourceObj.contents[source.index];

        // TODO: handle dragging between different lists
        // let destinationList = this.state.weekLists[result.destination.droppableId];
        const newSourceContents = Array.from(sourceObj.contents);
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
                                            Object.entries(this.state.weekLists).map(tuple => {
                                                let obj = tuple[1];
                                                return <FillingList
                                                    key={obj.id}
                                                    listID={obj.id}
                                                    sandwich={this.props.sandwich}
                                                    contents={obj.contents}
                                                />
                                            }
                                            )
                                        }

                                    </div>
                                    <div className="col-6">
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