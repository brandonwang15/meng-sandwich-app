import React, { Component } from "react";

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import "./../../styles.css"

import CurriculumBuilder from "../modules/CurriculumBuilder";

class BuildYourOwn extends React.Component {
    render() {
        return (
            <DndProvider backend={HTML5Backend}>
                <>
                    <div class="col-sm Page-title">
                        <h1>Build Your Own Module</h1>
                    </div>
                    <div class="container">
                        <div class="row">
                        </div>
                        <CurriculumBuilder numSlots="3"/>
                    </div>
                </>
            </DndProvider>
        )
    }
}

export default BuildYourOwn;