import React, { Component } from "react";

import PropTypes from 'prop-types';

class SandwichPage extends React.Component {
    render() {

        return (
            <div class="container">
                <div class="row">
                    <div class="col-sm">
                        <h1>{this.props.sandwich.title}</h1>
                    </div>
                </div>
                <div class="row">
                    Tags: {this.props.sandwich.tags.join(", ")}
                </div>
                <div class="row">
                    TODO: PUT MORE MODULE INFO HERE.
                </div>
                <div class="row">
                    ex) links, resources, etc
                </div>
            </div>
        )
    }
}

SandwichPage.propTypes = {
    sandwich: PropTypes.object.isRequired,
}

export default SandwichPage;