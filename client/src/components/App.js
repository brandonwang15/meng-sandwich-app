import './App.css';
import Sandwich from './modules/Sandwich';
import Navbar from './modules/Navbar';
import Home from './pages/Home';
import AllModules from './pages/AllModules';
import BuildYourOwn from "./pages/BuildYourOwn";

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

        <Route path="/">
          <h1>404</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
