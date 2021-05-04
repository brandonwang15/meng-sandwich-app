import { combineReducers } from 'redux'
import sandwiches from './sandwiches'
import { sandwichBuilder } from './sandwichBuilder'


export default combineReducers({
  sandwiches, sandwichBuilder
})
