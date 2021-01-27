import './Navbar.css';
import React, { Component } from "react";
import {
    BrowserRouter as Router,
    NavLink
} from "react-router-dom";

class Navbar extends React.Component {
    // TODO: figure out how to get NavLinks working
    render() {
        return (
                <div className="Navbar">
                    <nav>
                    <ul>
                        <NavLink to="/home">Home</NavLink> 
                        {' '}|{' '}
                        <NavLink to="/builder">Build Your Curriculum</NavLink>
                        {' '}|{' '}
                        <NavLink to="/presets">Preset Curriculum</NavLink>
                        {' '}|{' '}
                        <NavLink to="/all">All Modules</NavLink>
                    </ul>
                    </nav>

                </div>
        )
    }
}

export default Navbar;