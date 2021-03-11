import { createStore, applyMiddleware } from "redux"
import logger from "redux-logger"

import rootReducer from "./root-reducer"
// using an array to store middleware allows you to dynamically add additional middleware as required
const middlewares = [logger]

const store = createStore(rootReducer, applyMiddleware(...middlewares))

export default store
