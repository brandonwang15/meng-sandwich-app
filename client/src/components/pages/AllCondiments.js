import React, { Component } from "react";
import FilterableCondimentContainer from "../modules/FilterableCondimentContainer";


import "./../../styles.css"

import data from "../../data/all_condiments";

class AllCondiments extends React.Component {
    render() {
        return (
                <>
                    <div className="Page-title">
                        <h1>Browse All Condiments</h1>
                    </div>
                    <div>
                        <FilterableCondimentContainer
                            data={data}
                        />
                    </div>
                </>
        )
    }
}

export default AllCondiments;