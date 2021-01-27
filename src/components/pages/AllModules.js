import React, { Component } from "react";
import Sandwich from '../modules/Sandwich';
import FilterableSandwichContainer from "../modules/FilterableSandwichContainer";

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import "./../../styles.css"

import data from "../../data/all_modules";

class AllModules extends React.Component {
    render() {
        return (
            <DndProvider backend={HTML5Backend}>
                <>
                    <div class="Page-title">
                        <h1>Browse All Sandwiches</h1>
                    </div>
                    <div>
                        <FilterableSandwichContainer sandwichData={data}/>
                    </div>
                </>
            </DndProvider>
        )
    }
}

export default AllModules;