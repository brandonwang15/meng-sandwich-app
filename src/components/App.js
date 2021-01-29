import './App.css';
import './../styles.css';

import React, { Component } from 'react';

import Sandwich from './modules/Sandwich';
import Navbar from './modules/Navbar';
import SandwichPage from './pages/SandwichPage';

import Home from './pages/Home';
import AllModules from './pages/AllModules';
import BuildYourOwn from "./pages/BuildYourOwn";

import data from "../data/all_modules";
import AppContext from "./context/app_context";

import {
  Route,
  Switch,
} from "react-router-dom";

const EMPTY_SANDWICH_DATA = {};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.clearUserCurriculum = this.clearUserCurriculum.bind(this);
    this.isSandwichInUserCurriculum = this.isSandwichInUserCurriculum.bind(this);
    this.deleteSandwichFromUserCurriculum = this.deleteSandwichFromUserCurriculum.bind(this);
    this.updateSandwichInUserCurriculum = this.updateSandwichInUserCurriculum.bind(this);
    this.isSandwichSlotEmpty = this.isSandwichSlotEmpty.bind(this);

    // App-wide state propagated via React Context
    this.state = {
      curriculumSlots: 3,
      curriculumSandwiches: [],
    }

    for (let i = 0; i < this.state.curriculumSlots; i++) {
      this.state.curriculumSandwiches.push({});
    }

  }

  clearUserCurriculum() {
    for (let i = 0; i < this.state.curriculumSlots; i++) {
      this.deleteSandwichFromUserCurriculum(i);
    }
  }

  isSandwichInUserCurriculum(uid) {
    for (let i = 0; i < this.state.curriculumSlots; i++) {
      if (this.state.curriculumSandwiches[i].uid === uid) {
        return true;
      }
    }

    return false;
  }

  isSandwichSlotEmpty(index) {
    console.log("isSandwichSlotEmpty(): " + (Object.keys(this.state.curriculumSandwiches[index]).length === 0));
    return Object.keys(this.state.curriculumSandwiches[index]).length === 0;
  }

  deleteSandwichFromUserCurriculum(index) {
    this.updateSandwichInUserCurriculum(index, EMPTY_SANDWICH_DATA);
  }

  updateSandwichInUserCurriculum(index, newData) {
    const updatedSandwichData = this.state.curriculumSandwiches.map((data, j) => {
      if (j === index) {
        console.log("updated %s", index);
        return newData;
      } else {
        return data;
      }
    });

    this.setState({ curriculumSandwiches: updatedSandwichData });
  }

  render() {
    return (
      <AppContext.Provider value={{
        curriculumSlots: this.state.curriculumSlots,
        curriculumSandwiches: this.state.curriculumSandwiches,
        clearUserCurriculum: this.clearUserCurriculum,
        isSandwichInUserCurriculum: this.isSandwichInUserCurriculum,
        deleteSandwichFromUserCurriculum: this.deleteSandwichFromUserCurriculum,
        updateSandwichInUserCurriculum: this.updateSandwichInUserCurriculum,
        isSandwichSlotEmpty: this.isSandwichSlotEmpty,
      }}>
        <div className="App">
          <header className="App-header">
            Ethical AI for Computational Action
        </header>
          <Navbar />
          <Switch>
            <Route path="/home">
              <Home />
            </Route>


            <Route path="/builder">
              <BuildYourOwn />
            </Route>

            <Route path="/all">
              <AllModules />
            </Route>

            {
              // TODO: generate Routes for each module page
              data.all_modules.map(module => {
                return <Route key={module.uid} path={"/sandwich/" + module.uid}>
                  <SandwichPage sandwich={module} />
                </Route>
              })
            }

            <Route path="/">
              <h1 class="Page-title">404 - Page not found!</h1>
            </Route>

          </Switch>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
