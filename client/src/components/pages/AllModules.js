import React, { Component } from "react";
import Sandwich from '../modules/Sandwich';

import data from "../../data/all_modules";

class AllModules extends React.Component {
    render() {
        return (
            <>
                <h1>All Modules page</h1>
                <div>
                    TODO: modules list goes here.
                    All Modules:
                    {data.all_modules.map((module) => 
                        <Sandwich
                        key={module.uid}
                        data={module}
                    />
                    )}
                </div>
                <div>


                </div>
            </>
        )
    }
}

export default AllModules;