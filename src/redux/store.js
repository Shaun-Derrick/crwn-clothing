import { createStore, applyMiddleware } from "redux"
import { persistStore } from "redux-persist"
import logger from "redux-logger"
import thunk from "redux-thunk"

import rootReducer from "./root-reducer"
// using an array to store middleware allows you to dynamically add additional middleware as required
const middlewares = [thunk]

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger)
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares))

export const persistor = persistStore(store)

// export default { store, persistor }
