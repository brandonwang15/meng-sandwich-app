import React, { Component } from "react";

import DraggableSandwich from "../modules/DraggableSandwich";
import SandwichHolder from "../modules/SandwichHolder";

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


import data from "../../data/all_modules"

class BuildYourOwn extends React.Component {
    render() {
        return (
            <DndProvider backend={HTML5Backend}>
                <>
                    <h1>Build Your Own Module</h1>
                    <hr />
                Your curriculum:
                TODO: modules go under here
                Slot 1: <SandwichHolder />
                    <hr />
                    <div>
                        {data.all_modules.map((module) =>
                            <DraggableSandwich
                                key={module.uid}
                                data={module}
                            />
                        )}
                    </div>
                </>
            </DndProvider>
        )
    }
}

export default BuildYourOwn;