import rootReducer from './reducers'
import { createStore } from 'redux';
import data from "./data/all_modules";
import { CustomSandwichData, SandwichFillingData } from './misc/SandwichObjects';

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
    let initialState = {sandwiches: {}};
  
    data.all_modules.forEach((value) => {
      let allFillings;

      if ("fillings" in value) {
        allFillings = value.fillings.map((rawJSON) => {
          return new SandwichFillingData(rawJSON);
        });
      }

      let requiredFillings = allFillings.filter(filling => filling.isRequired);
      let optionalFillings = allFillings.filter(filling => !filling.isRequired);

      let sandwich = new CustomSandwichData(value.title, value.numSlots, requiredFillings, optionalFillings);
      
      // Initialze the .contents map with required fillings
      requiredFillings.forEach((filling) => {
          sandwich.contents[filling] = value 
      })
  
      initialState.sandwiches[value.uid] = sandwich;
    })
  
    console.log("initial state: ", initialState);
  
    return initialState
  }
  
  
  const store = createStore(rootReducer,createInitialReduxStoreState());

  export default store;