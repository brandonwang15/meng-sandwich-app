import "./../../styles.css"
import React, { Component } from "react";


import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


import NutritionFacts from "../modules/NutritionFacts";
import SandwichFrame from "../modules/sandwich/SandwichFrame";
import FillingsBank from "../modules/sandwich/FillingsBank";

import PropTypes from 'prop-types';

class SandwichBuilderWeekly extends React.Component {
    render() {
        return (
            <DndProvider backend={HTML5Backend}>
                <>
                    <div className="container">
                        <div className="row Page-title">
                            <div className="col-sm">
                                <h1>{this.props.sandwich.title}</h1>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-9 text-left">
                        
                                <div className="row text-center">
                                    <div className="col-6">
                                        <FillingsBank sandwichUID={this.props.sandwich.uid}></FillingsBank>
                                    </div>
                                    <div className="col-6">
                                        <SandwichFrame sandwichUID={this.props.sandwich.uid} />
                                    </div>
                                </div>


                            </div>

                            <div className="col-3">
                                <NutritionFacts sandwichData={[this.props.sandwich]} />
                            </div>
                        </div>
                    </div>
                </>
            </DndProvider>
        )
    }
}

SandwichBuilderWeekly.propTypes = {
    sandwich: PropTypes.object.isRequired,
}

export default SandwichBuilderWeekly;