import {combineReducers} from 'redux'
import Example from '../Example/ExampleReducers'

const rootReducer = combineReducers({
  Example
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer
