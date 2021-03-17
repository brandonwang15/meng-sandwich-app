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
        this.getVisibleSandwichIndices = this.getVisibleSandwichIndices.bind(this);

        this.state = {
            starFilter: false,
            filterText: "",
        };
    }

    getVisibleSandwichIndices() {
        let newSandwichIndicesToShow = []

        // Apply filterText filter
        console.log("filterText: %s", this.state.filterText)
        if (this.state.filterText.trim() === "") {
            console.log("show all");

            newSandwichIndicesToShow = [...Array(this.props.sandwichData.all_modules.length).keys()];
        } else {
            this.props.sandwichData.all_modules.forEach((value, index) => {    
                if (this.isSandwichMatching(value, this.state.filterText)) {
                    newSandwichIndicesToShow.push(index);
                }
            });
        }

        // Apply star filter
        newSandwichIndicesToShow = newSandwichIndicesToShow.filter((index) => {
            let uid = this.props.sandwichData.all_modules[index].uid
            let passesStarFilter = (!this.state.starFilter || this.context.isSandwichStarred(uid))

            return passesStarFilter
        })

        return newSandwichIndicesToShow
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

    onStarButtonClicked() {
        this.setState({ 
            starFilter: !this.state.starFilter,
        });

    }

    onFilterTextChanged(e) {
        const searchText = e.target.value;
        this.setState({
            filterText: searchText,
        })
    }

    render() {
        let indicesToShow = this.getVisibleSandwichIndices()

        let filteredModules = this.props.sandwichData.all_modules.filter((value, index) => {
            return indicesToShow.includes(index);
        });

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