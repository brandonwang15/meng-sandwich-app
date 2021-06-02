import rootReducer from './reducers'
import { createStore } from 'redux';
import data from "./data/all_modules";
import { CustomSandwichData, SandwichFillingData } from './misc/SandwichObjects';
import { createInitialBuilderStateFromSandwich } from './reducers/sandwichBuilder'

function createInitialReduxStoreState() {
    let initialState = {sandwiches: {}, sandwichBuilder: {}};
  
    data.all_modules.forEach((rawJSON) => {
      let sandwich = new CustomSandwichData(rawJSON);
      initialState.sandwiches[sandwich.uid] = sandwich;
      initialState.sandwichBuilder[sandwich.uid] = createInitialBuilderStateFromSandwich(sandwich);
    })
  

    console.log("initial redux store state: ", initialState);
  
    return initialState
  }
  
  
  const store = createStore(rootReducer,createInitialReduxStoreState());

  export default store;