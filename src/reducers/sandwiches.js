import { createReducer } from '@reduxjs/toolkit'


// TODO: clean this logic up: https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns
const initialState = { "a": 1 };
// const sandwiches = createReducer(initialState, {
//     SET_FILLING: (state, action) => {
//       state[action.uid].contents[action.index] = action.value;
// console.log("inside SET_FILLING: ", JSON.stringify(state, undefined, 2));
//     },
//     DELETE_FILLING: (state, action) => {
//       delete state[action.uid].contents[action.index] 
//     }
// })

const sandwiches = (state = initialState, action) => {
  var sandwich;
  var contents;

  sandwich = state[action.uid];
  if (sandwich != null) {
    contents = sandwich.contents;
  }

  switch (action.type) {
    case "SET_FILLING":
      console.log("inside SET_FILLING: ", JSON.stringify(state, undefined, 2));
      // return state;

      return {...state, 
        [action.uid]: {
          ...sandwich,
          contents: {
            ...contents,
            [action.index]: action.value
          }
        }
      }
    case "DELETE_FILLING":
      let newState = {...state, 
        [action.uid]: {
          ...sandwich,
          contents: {
            ...contents
          }
        }
      };
      delete newState[action.uid].contents[action.index]

      return newState;
    default:
      return state;
  }

  // state[action.uid].contents[action.index] = action.value;
  // console.log("inside SET_FILLING: ", JSON.stringify(state, undefined, 2));
}


export default sandwiches
