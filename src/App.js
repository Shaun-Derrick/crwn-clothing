import React from "react"
import { Switch, Route } from "react-router-dom"
import "./App.css"
import HomePage from "./pages/homepage/homepage.component"
import ShopPage from "./pages/shop/shop.component"
import Header from "./components/header/header.component"

function App() {
  return (
    <div>
      {/* header exists outside of the switch so it is always rendered regardless of what page is actively being rendered */}
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
      </Switch>
    </div>
  )
}

export default App
