import React, { Component } from 'react';

import AppContext from "../context/app_context";
import PropTypes from 'prop-types';

// function StarButton(props) {
//     return (
//         <AppContext.Consumer>
        
//         {value => 
//             value.curriculumSandwiches.array.forEach(element => 
//                 <p>a</p>
//             )
//             // <button className={value.isSandwichStarred(props.sandwichUID) ? "btn primary" : "btn warning"} onClick={() => value.toggleStarSandwich(props.sandwichUID)}>Star</button>}
        
//         </AppContext.Consumer>
//     ) 
// }

class StarButton extends React.Component {
    render() {
        let isStarred = this.context.isSandwichStarred(this.props.sandwichUID)
        console.log(this.props.sandwichUID + ": "+isStarred.toString())
        return (
            <button className={isStarred ? "btn btn-warning" : "btn btn-secondary"} onClick={() => this.context.toggleStarSandwich(this.props.sandwichUID)}>{isStarred ? "Unstar" : "Star"}</button>
        )
    }
}

StarButton.propTypes = {
    sandwichUID: PropTypes.number.isRequired,
}

StarButton.contextType = AppContext;

export default StarButton;