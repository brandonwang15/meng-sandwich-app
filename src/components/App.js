import './App.css';
import './../styles.css';
import Sandwich from './modules/Sandwich';
import Navbar from './modules/Navbar';
import SandwichPage from './pages/SandwichPage';

import Home from './pages/Home';
import AllModules from './pages/AllModules';
import BuildYourOwn from "./pages/BuildYourOwn";

import data from "../data/all_modules";


import {
  Route,
  Switch,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Ethical AI for Computational Action
      </header>
      <Navbar/>
      <Switch>
        <Route path="/home">
          <Home />
        </Route> 


        <Route path="/builder">
          <BuildYourOwn/>
        </Route>

        <Route path="/all">
          <AllModules/>
        </Route>
        
        {
          // TODO: generate Routes for each module page
          data.all_modules.map(module => {
            return <Route key={module.uid} path={"/sandwich/"+module.uid}>
              <SandwichPage sandwich={module}/>
            </Route>
          })
        }

        <Route path="/">
          <h1 class="Page-title">404</h1>
        </Route>

      </Switch>
    </div>
  );
}

export default App;
