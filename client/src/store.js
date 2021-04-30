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

function initialStoreStateForSandwichBuilder(sandwich) {
    const state = {
        planLists: {}, // entries for each day
        bankLists: {}, // entries in each bank
    }

    for (let i = 0; i < sandwich.nWeeks; i++) {

        for (let day = 0; day < sandwich.daysInWeek; day++) {
            let listId = "plan-list-" + i + "-" + day;
            state.planLists[listId] = {
                id: listId,
                contents: [], // filling ids
            };
        }

        let bankId = "bank-list-" + i;
        state.bankLists[bankId] = {
            id: bankId,
            contents: [], // filling ids
        };
    }

    // Seed initial fillings for the list from the required fillings
    Object.entries(sandwich.allFillings).forEach(tuple => {
        let filling = tuple[1];
        if (filling.isRequired) {
            state.planLists["plan-list-"+filling.suggestedWeek+"-"+filling.suggestedDay].contents.push(filling.uid);
        }
    })

    // Seed the bank with optional fillings
    Object.entries(sandwich.allFillings).forEach(tuple => {
        let filling = tuple[1];
        if (!filling.isRequired) {
            state.bankLists["bank-list-"+filling.suggestedWeek].contents.push(filling.uid);
        }
    })

    return state;
}

function createInitialReduxStoreState() {
    let initialState = {sandwiches: {}, sandwichBuilder: {}};
  
    data.all_modules.forEach((rawJSON) => {
      let sandwich = new CustomSandwichData(rawJSON);
      initialState.sandwiches[sandwich.uid] = sandwich;
      initialState.sandwichBuilder[sandwich.uid] = initialStoreStateForSandwichBuilder(sandwich);
    })
  

    console.log("initial redux store state: ", initialState);
  
    return initialState
  }
  
  
  const store = createStore(rootReducer,createInitialReduxStoreState());

  export default store;