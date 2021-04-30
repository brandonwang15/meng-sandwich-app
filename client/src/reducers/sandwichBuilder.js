import { createReducer } from '@reduxjs/toolkit'



const sandwichBuilderReducer = (state = {}, action) => {

  switch (action.type) {
    case "BUILDER_MOVE_FILLING":

      const { sourceListId, destinationListId, sourceIndex, destinationIndex } = action;

      const destinationListType = sourceListId.substring(0, 4);
      const sourceListType = destinationListId.substring(0, 4);

      const sameList = sourceListId === destinationListId;
      const sameListType = destinationListType === sourceListType;

      if (sameList) {
        if (destinationListType == "plan") {
          let newState = dragWithinPlanList(state, action);
          console.log("New state: ", newState);
          return newState;
        } else if (destinationListType == "bank") {
          return dragWithinBankList(state, action);
        } else {
          throw "unrecognized list type: " + destinationListType;
        }
      } else {
        if (destinationListType == sourceListType) {
          if (destinationListType == "plan") {
            return dragBetweenPlanLists(state, action);
          } else if (destinationListType == "bank") {
            return state; // no-op, we don't allow dragging between bank lists
          } else {
            throw "unrecognized list type: " + destinationListType;
          }
        }

        // TODO: Handle dragging between list types
        return dragBetweenDifferentTypedLists(state, action);
      }

      throw "should never get here";
    default:
      return state;
  }

}


function dragWithinPlanList(state, action) {
  let sandwichState = state[action.sandwichId];

  // Get the list
  let sourceObj = sandwichState.planLists[action.sourceListId];

  // Get the object that was dragged
  let draggableObj = sourceObj.contents[action.sourceIndex];

  const newSourceContents = Array.from(sourceObj.contents);

  // Remove element from old index and insert at new index  
  newSourceContents.splice(action.sourceIndex, 1);
  newSourceContents.splice(action.destinationIndex, 0, draggableObj);

  const newSourceObj = {
    ...sourceObj,
    contents: newSourceContents,
  }

  const newSandwichState = {
    ...sandwichState,
    planLists: {
      ...sandwichState.planLists,
      [newSourceObj.id]: newSourceObj,
    }
  }

  return {
    ...state,
    [action.sandwichId]: newSandwichState, 
  };
}

function dragBetweenPlanLists(state, action) {
  let sandwichState = state[action.sandwichId];


  // Get the source list and destination list
  let sourceObj = sandwichState.planLists[action.sourceListId];
  let destinationObj = sandwichState.planLists[action.destinationListId];

  // Get the object that was dragged
  let draggableObj = sourceObj.contents[action.sourceIndex];


  const newSourceContents = Array.from(sourceObj.contents);
  const newDestinationContents = Array.from(destinationObj.contents);

  // Remove element from source        
  newSourceContents.splice(action.sourceIndex, 1);
  // Insert element at destination
  newDestinationContents.splice(action.destinationIndex, 0, draggableObj);

  const newSourceObj = {
    ...sourceObj,
    contents: newSourceContents,
  }

  const newDestinationObj = {
    ...destinationObj,
    contents: newDestinationContents,
  }

  const newSandwichState = {
    ...sandwichState,
    planLists: {
      ...sandwichState.planLists,
      [newSourceObj.id]: newSourceObj,
      [newDestinationObj.id]: newDestinationObj,
    }
  }

  return {
    ...state,
    [action.sandwichId]: newSandwichState, 
  };

}

function dragWithinBankList(state, action) {
  let sandwichState = state[action.sandwichId];

  // Get the list
  let sourceObj = sandwichState.bankLists[action.sourceListId];

  // Get the object that was dragged
  let draggableObj = sourceObj.contents[action.sourceIndex];

  const newSourceContents = Array.from(sourceObj.contents);

  // Remove element from old index and insert at new index  
  newSourceContents.splice(action.sourceIndex, 1);
  newSourceContents.splice(action.destinationIndex, 0, draggableObj);

  const newSourceObj = {
    ...sourceObj,
    contents: newSourceContents,
  }

  const newSandwichState = {
    ...sandwichState,
    bankLists: {
      ...sandwichState.bankLists,
      [newSourceObj.id]: newSourceObj,
    }
  }

  return {
    ...state,
    [action.sandwichId]: newSandwichState, 
  };
}

function dragBetweenDifferentTypedLists(state, action) {
  const sandwichState = state[action.sandwichId];

  // Get the source list and destination list
  let sourceType = action.sourceListId.substring(0, 4);
  let destinationType = action.destinationListId.substring(0, 4);


  let sourceObj;
  let destinationObj;

  switch (sourceType) {
    case "plan":
      sourceObj = sandwichState.planLists[action.sourceListId];
      break;
    case "bank":
      sourceObj = sandwichState.bankLists[action.sourceListId];
      break;
    default:
      throw "unrecognized type: " + sourceType;
  }

  switch (destinationType) {
    case "plan":
      destinationObj = sandwichState.planLists[action.destinationListId];
      break;
    case "bank":
      destinationObj = sandwichState.bankLists[action.destinationListId];
      break;
    default:
      throw "unrecognized type: " + sourceType;
  }

  // Get the object that was dragged
  let draggableObj = sourceObj.contents[action.sourceIndex];

  const newSourceContents = Array.from(sourceObj.contents);
  const newDestinationContents = Array.from(destinationObj.contents);

  // Remove element from source        
  newSourceContents.splice(action.sourceIndex, 1);
  // Insert element at destination
  newDestinationContents.splice(action.destinationIndex, 0, draggableObj);

  const newSourceObj = {
    ...sourceObj,
    contents: newSourceContents,
  }

  const newDestinationObj = {
    ...destinationObj,
    contents: newDestinationContents,
  }

  let newSandwichState;
  if (sourceType === "plan" && destinationType === "bank") {
    newSandwichState = {
      ...sandwichState,
      planLists: {
        ...sandwichState.planLists,
        [newSourceObj.id]: newSourceObj,
      },
      bankLists: {
        ...sandwichState.bankLists,
        [newDestinationObj.id]: newDestinationObj,
      }
    }

  } else if (sourceType === "bank" && destinationType === "plan") {
    newSandwichState = {
      ...sandwichState,
      planLists: {
        ...sandwichState.planLists,
        [newDestinationObj.id]: newDestinationObj,
      },
      bankLists: {
        ...sandwichState.bankLists,
        [newSourceObj.id]: newSourceObj,
      }
    }
  } else {
    throw "Unexpected combination of source and destination types: " + sourceType + ", " + destinationType;
  }

  return {
    ...state,
    [action.sandwichId]: newSandwichState, 
  };

}

export default sandwichBuilderReducer
