import React, { Component } from "react";
import './NutritionFacts.js'

class NutritionFacts extends React.Component {
    render(props) {
        return (<div class="container border border-primary">
            <div class="row">
                <div class="col-sm">
                    <h1>Nutrition Facts</h1>
                </div>
            </div>
            <div class="row border">
                <div class="col-sm">
                    <h3>Content Type:</h3>
                </div>
                <div class="col-sm">
                    <h3>Curriculum Coverage:</h3>
                </div>
            </div>
            <div class="row border">
                <div class="col-sm">
                    Computational Thinking:
                </div>
                <div class="col-sm">
                    0
                </div>
            </div>
            <div class="row border">
                <div class="col-sm">
                    Design Thinking
                </div>
                <div class="col-sm">
                    0
                </div>
            </div>
            
        </div>)
    }
}

export default NutritionFacts;