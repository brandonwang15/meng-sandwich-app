import "./../../styles.css"
import React, { Component } from "react";

import NutritionFacts from "../modules/NutritionFacts"

import PropTypes from 'prop-types';

class SandwichPage extends React.Component {
    render() {

        return (
            <div class="container">
                <div class="row Page-title">
                    <div class="col-sm">
                        <h1>{this.props.sandwich.title}</h1>
                    </div>
                </div>
                <div class="row">
                    <div class="col-9 text-left">

                        <div class="row">
                            Tags: {this.props.sandwich.tags.join(", ")}
                        </div>
                        <div class="row">
                            Blurb: {this.props.sandwich.short_description}
                        </div>
                        <div class="row">
                            Grade versions:
                        </div>
                        <div class="row">
                            Related Modules:
                        </div>
                        <div class="row text-center">
                            <div class="col">
                                <h4> Resources:</h4>
                                {this.props.sandwich.resources.map((resource) => <div class="container">
                                    <a href={process.env.PUBLIC_URL + resource.url}>{resource.text}</a>
                                </div>)}
                                <div class="container">
                                    <a href={process.env.PUBLIC_URL + "/sandwich/" + this.props.sandwich.uid + "/sandwich-" + this.props.sandwich.uid + ".zip"} class="btn btn-info" role="button">.ZIP File</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-3">
                        <NutritionFacts sandwichData={[this.props.sandwich]} />
                    </div>
                </div>

            </div>
        )
    }
}

SandwichPage.propTypes = {
    sandwich: PropTypes.object.isRequired,
}

export default SandwichPage;