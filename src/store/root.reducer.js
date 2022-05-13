import {combineReducers} from 'redux'

import {statusReducer} from './reducers/status.reducer'
import {countReducer} from './reducers/count.reducer'
import { toyReducer } from './reducers/toy.reducer'
import { userReducer } from './reducers/user.reducer'

export const rootReducer = combineReducers({
    statusModule : statusReducer,
    countModule : countReducer,
    toyModule : toyReducer,
    userModule : userReducer

})



