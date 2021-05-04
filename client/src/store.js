import rootReducer from './reducers'
import { createStore } from 'redux';
import data from "./data/all_modules";
import { CustomSandwichData, SandwichFillingData } from './misc/SandwichObjects';
import { createInitialBuilderStateFromSandwich } from './reducers/sandwichBuilder'

function setRequiredFillings(sandwichObject) {
    for (let i = 0; i < this.context.customSandwichData[this.props.sandwichUID].numSlots; i++) {
        // check if there is a required filling for this spot
        let found = false
        for (let j = 0; j < sandwichObject.requiredFillings.length; j++) {
            let filling = sandwichObject.requiredFillings[j];
            if (parseInt(filling.index) == i) {
                holderList.push(
                    <FillingSlot key={i} index={i+1} sandwichUID={this.props.sandwichUID} filling={filling} />
                )
                found = true;
                break;
            }
        }

        if (!found) {
            holderList.push(
                <FillingSlot key={i} index={i+1} sandwichUID={this.props.sandwichUID} />
            )
        }

    }

}


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