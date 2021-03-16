import { combineReducers } from "redux"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

import userReducer from "./user/user.reducer"
import cartReducer from "./cart/cart.reducer"
import directoryReducer from "./directory/directory.reducer"
import shopReducer from "./shop/shop.reducer"

const persistConfig = {
  key: "root",
  storage,
  // Pass in the reducer you want to persist into the whitelist array
  whitelist: ["cart"]
}

const rootReducer = combineReducers({
  // you do not have to persist user because firebase automatically does so
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer
})

export default persistReducer(persistConfig, rootReducer)
