import "./../../styles.css"
import React, { Component } from "react";

import NutritionFacts from "../modules/NutritionFacts";
import CondimentCard from "../modules/CondimentCard";
import SandwichFrame from "../modules/sandwich/SandwichFrame";
import FillingsBank from "../modules/sandwich/FillingsBank";

import PropTypes from 'prop-types';

class SandwichPage extends React.Component {
    render() {

        return (
            <div className="container">
                <div className="row Page-title">
                    <div className="col-sm">
                        <h1>{this.props.sandwich.title}</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <FillingsBank sandwichUID={this.props.sandwich.uid}></FillingsBank>
                    </div>
                    <div className="col-6">
                        <SandwichFrame sandwichUID={this.props.sandwich.uid}/>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-9 text-left">
                        <div className="row">
                            Tags: {this.props.sandwich.tags.join(", ")}
                        </div>
                        <div className="row">
                            Blurb: {this.props.sandwich.short_description}
                        </div>
                        <div className="row">
                            Grade versions:
                        </div>
                        <div className="row">
                            Related Modules:
                        </div>
                        <div className="row text-center">
                            <div className="col">
                                <h4> Resources:</h4>
                                {this.props.sandwich.resources.map((resource, index) => <div className="container" key={index}>
                                    <a key={index} href={process.env.PUBLIC_URL + resource.url}>{resource.text}</a>
                                </div>)}
                                <div className="container">
                                    <a href={process.env.PUBLIC_URL + "/sandwich/" + this.props.sandwich.uid + "/sandwich-" + this.props.sandwich.uid + ".zip"} className="btn btn-info" role="button">.ZIP File</a>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            Suggested Condiments:
                            {this.props.sandwich.suggested_condiments ? this.props.sandwich.suggested_condiments.map((uid) => <div className="col-sm" key={uid}>
                                <CondimentCard uid={uid} />
                            </div>) :
                            <div className="col">None</div>}
                        </div>
                    </div>

                    <div className="col-3">
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