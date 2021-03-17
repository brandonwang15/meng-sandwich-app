import React, { Component } from "react";
import DraggableSandwich from "./DraggableSandwich";
import Sandwich from "./Sandwich";
import PropTypes from 'prop-types';
import AppContext from "../context/app_context"
import './FilterableSandwichContainer.css';

class FilterableSandwichContainer extends React.Component {
    constructor(props) {
        super(props);

        this.onFilterTextChanged = this.onFilterTextChanged.bind(this);
        this.onStarButtonClicked = this.onStarButtonClicked.bind(this);
        this.updateTextFiltering = this.updateTextFiltering.bind(this);

        this.state = {
            sandwichIndicesToShow: [...Array(this.props.sandwichData.all_modules.length).keys()], // indices into sandwichData, indicating which sandwiches should be displayed
            starFilter: false,
            filterText: "",
        };
    }

    isSandwichMatching(data, searchText) {
        searchText = searchText.toLowerCase();
        // check tags for match
        if (data.tags.join(" ").toLowerCase().includes(searchText)) {
            return true;
        }

        // check title for match
        if (data.title.toLowerCase().includes(searchText)) {
            return true;
        }

        // TODO: add more matching conditions
        return false;
    }

    updateTextFiltering(starFilter, searchText) {
        let newSandwichIndicesToShow = []

        console.log("starFilter: ", starFilter)

        // Apply searchText filter
        console.log("searchText: %s", searchText)
        if (searchText.trim() === "") {
            console.log("show all");

            newSandwichIndicesToShow = [...Array(this.props.sandwichData.all_modules.length).keys()];
        } else {
            this.props.sandwichData.all_modules.forEach((value, index) => {    
                if (this.isSandwichMatching(value, searchText)) {
                    newSandwichIndicesToShow.push(index);
                }
            });
        }

        // Apply star filter
        newSandwichIndicesToShow = newSandwichIndicesToShow.filter((index) => {
            let uid = this.props.sandwichData.all_modules[index].uid
            let passesStarFilter = (!starFilter || this.context.isSandwichStarred(uid))

            return passesStarFilter
        })




        this.setState({ 
            starFilter: starFilter,
            filterText: searchText,
            sandwichIndicesToShow: newSandwichIndicesToShow 
        });
    }

    onStarButtonClicked() {
        this.updateTextFiltering(!this.state.starFilter, this.state.filterText)
    }

    onFilterTextChanged(e) {
        const searchText = e.target.value;
        this.updateTextFiltering(this.state.starFilter, searchText)
    
    }

    render() {
        let filteredModules = this.props.sandwichData.all_modules.filter((value, index) => {
            return this.state.sandwichIndicesToShow.includes(index);
        });

        // TODO: if we ever add a StarButton to the cards on this page, we need to do extra work to make sure
        // this.state.sandwichIndiciesToShow is updated when that changes.
        // The context update will only cause render() to be called again, but render does not currently force
        // a recalculation of this.state.sandwichIndiciesToShow

        if (this.props.draggableMode) {
            return (
                <>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-2">
                                Filter:
                            </div>
                            <div className="col-sm-8">
                                <input id="searchField" type="text" className="form-control" placeholder="Add search terms!" onChange={this.onFilterTextChanged} />
                            </div>
                            <div className="col-sm-2">
                                <button className={this.state.starFilter ? "btn btn-warning" : "btn btn-dark"} onClick={this.onStarButtonClicked}>{this.state.starFilter ? "Starred Only" : "Starred + Unstarred"}</button>
                            </div>
                        </div>

                        <div className="Scrollable-container">
                            <div className="row">
                                {filteredModules.map((module) => {
                                    let sandwichDiv = <div className="col-sm-4" key={module.uid}>
                                        <DraggableSandwich
                                            data={module}
                                            canDrag={!this.props.isSandwichDraggable(module.uid)}
                                        />
                                    </div>;
                                    return sandwichDiv;
                                }
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )


        } else {
            return (
                <>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-2">
                                Filter:
                            </div>
                            <div className="col-sm-8">
                                <input id="searchField" type="text" className="form-control" placeholder="Add search terms!" onChange={this.onFilterTextChanged} />
                            </div>
                        </div>
                        <div className="container">
                            <div key={module.uid} className="row">
                                {filteredModules.map((module) =>
                                    <div className="col-sm-4">
                                        <Sandwich
                                            data={module}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    }
}

FilterableSandwichContainer.propTypes = {
    sandwichData: PropTypes.object.isRequired,
    draggableMode: PropTypes.bool.isRequired,
    // TODO: this whole draggable flow is a candidate for refactoring
    isSandwichDraggable: PropTypes.func, // a function that determines whether the sandwich with the given uid is draggable
}

FilterableSandwichContainer.contextType = AppContext


export default FilterableSandwichContainer;