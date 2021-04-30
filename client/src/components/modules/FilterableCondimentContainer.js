import React, { Component } from "react";
import CondimentCard from "./CondimentCard";
import PropTypes from 'prop-types';

// TODO(bdnwang): Later on, consider whether we should share code with
// FilterableSandwichContainer via a higher-order-component "FilterableContainer" 
// or something.
class FilterableCondimentContainer extends React.Component {
    constructor(props) {
        super(props);

        this.onFilterTextChanged = this.onFilterTextChanged.bind(this);

        this.state = {
            indicesToShow: [...Array(this.props.data.condiments.length).keys()], // indices into sandwichData, indicating which values should be displayed
        };
    }

    isMatching(data, searchText) {
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
        let newIndicesToShow = []

        // if empty search text, show all results
        console.log("searchText: %s", searchText)
        if (searchText.trim() === "") {
            console.log("show all");

            newIndicesToShow = [...Array(this.props.data.condiments.length).keys()];
            this.setState({ indicesToShow: newIndicesToShow });
            return;
        }


        this.props.data.condiments.forEach((value, index) => {
            if (this.isMatching(value, searchText)) {
                newIndicesToShow.push(index);
            }
        });

        this.setState({ indicesToShow: newIndicesToShow });
    }

    render() {
        let filteredModules = this.props.data.condiments.filter((value, index) => {
            return this.state.indicesToShow.includes(index);
        });


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
                        <div className="row">
                            {filteredModules.map((module) =>
                                <div className="col-sm-4">
                                    <CondimentCard uid={module.uid} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

FilterableCondimentContainer.propTypes = {
    data: PropTypes.object.isRequired,
}


export default FilterableCondimentContainer;