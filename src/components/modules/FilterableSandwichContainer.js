import React, { Component } from "react";
import DraggableSandwich from "./DraggableSandwich";
import Sandwich from "./Sandwich";
import PropTypes from 'prop-types';

class FilterableSandwichContainer extends React.Component {
    constructor(props) {
        super(props);

        this.onFilterTextChanged = this.onFilterTextChanged.bind(this);

        this.state = {
            sandwichIndicesToShow: [...Array(this.props.sandwichData.all_modules.length).keys()], // indices into sandwichData, indicating which sandwiches should be displayed
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

    onFilterTextChanged(e) {
        const searchText = e.target.value;
        let newSandwichIndicesToShow = []

        // if empty search text, show all results
        console.log("searchText: %s", searchText)
        if (searchText.trim() === "") {
            console.log("show all");
         
            newSandwichIndicesToShow = [...Array(this.props.sandwichData.all_modules.length).keys()]; 
            this.setState({sandwichIndicesToShow: newSandwichIndicesToShow});
            return;
        }


        this.props.sandwichData.all_modules.forEach((value, index) => {
            if (this.isSandwichMatching(value, searchText)) {
                newSandwichIndicesToShow.push(index);
            }
        });

        this.setState({sandwichIndicesToShow: newSandwichIndicesToShow});
    }

    render() {
        let filteredModules = this.props.sandwichData.all_modules.filter((value, index) => {
            return this.state.sandwichIndicesToShow.includes(index);
        });

        return (
            <>
                <div class="container">
                    <div class="row">
                        <div class="col-sm-2">
                            Filter:
                        </div>
                        <div class="col-sm-8">
                            <input id="searchField" type="text" class="form-control" placeholder="Add search terms!" onChange={this.onFilterTextChanged}/>
                        </div>
                    </div>

                    {filteredModules.map((module) =>
                        <div class="row">
                            <div class="col-sm">
                                <Sandwich
                                    key={module.uid}
                                    data={module}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </>
        )
    }
}

FilterableSandwichContainer.propTypes = {
    sandwichData: PropTypes.object.isRequired,
}


export default FilterableSandwichContainer;