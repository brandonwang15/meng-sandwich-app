import React, { Component } from "react";

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import CurriculumBuilder from "../modules/CurriculumBuilder";

class BuildYourOwn extends React.Component {
    render() {
        return (
            <DndProvider backend={HTML5Backend}>
                <>
                    <div class="container">
                        <div class="row">
                            <div class="col-sm">
                                <h1>Build Your Own Module</h1>
                                <hr />
                            </div>
                        </div>
                        <CurriculumBuilder numSlots="3"/>
                    </div>
                </>
            </DndProvider>
        )
    }
}

export default BuildYourOwn;