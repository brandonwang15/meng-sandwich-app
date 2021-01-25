import React, { Component } from "react";

import Sandwich from "../modules/Sandwich";
import data from "../../data/all_modules"

class BuildYourOwn extends React.Component {
    render () {
        return (
            <>
                <h1>Build Your Own Module</h1>
                <hr/>
                Your curriculum:
                TODO: modules go under here
                Slot 1: <Sandwich/>
                <hr/>
                <div>
                    {data.all_modules.map((module) => 
                        <Sandwich
                        key={module.uid}
                        data={module}
                    />
                    )}
                </div>
            </>
        )
    }
}

export default BuildYourOwn;