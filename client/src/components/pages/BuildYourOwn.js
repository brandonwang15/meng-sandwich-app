import React, { Component } from "react";

import DraggableSandwich from "../modules/DraggableSandwich";

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import CurriculumBuilder from "../modules/CurriculumBuilder";

import data from "../../data/all_modules"

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
                    <hr />
                    <div class="container">
                        <div class="row">
                            {data.all_modules.map((module, index) => {
                                let sandwichDiv = <div class="col-sm">
                                    <DraggableSandwich
                                        key={module.uid}
                                        data={module}
                                    />
                                </div>;
                                return sandwichDiv;
                            }
                            )}
                        </div>
                    </div>
                </>
            </DndProvider>
        )
    }
}

export default BuildYourOwn;