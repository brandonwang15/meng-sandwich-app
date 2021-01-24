import React, { Component } from "react";
import Sandwich from '../modules/Sandwich';

class AllModules extends React.Component {
    render() {
        return (
            <>
                <h1>All Modules page</h1>
                <div>
                    TODO: modules list goes here.

                    <Sandwich 
                        uid="1"
                        title="City of the Future"
                        tags="[ai, Scratch, TODO]"
                        /> 

                </div>
            </>
        )
    }
}

export default AllModules;