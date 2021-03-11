import React from "react"
import { Switch, Route } from "react-router-dom"
import { connect } from "react-redux"

import "./App.css"

import HomePage from "./pages/homepage/homepage.component"
import ShopPage from "./pages/shop/shop.component"
import Header from "./components/header/header.component"
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component"
import { auth, createUserProfileDocument } from "./firebase/firebase.utils"
import { setCurrentUser } from "./redux/user/user.actions"

class App extends React.Component {
  unsubscribeFromAuth = null

  componentDidMount() {
    const { setCurrentUser } = this.props
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // this.setState({ currentUser: user })
      // createUserProfileDocument(user)
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)
        // createUserProfileDocument(userAuth)

        userRef.onSnapshot((snapShot) => {
          // console.log(snapShot.data())
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        })
      } else {
        setCurrentUser(userAuth)
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }
  render() {
    return (
      <div>
        {/* header exists outside of the switch so it is always rendered regardless of what page is actively being rendered */}
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  // using dispatch tells redux it is going to be receiving an action object that it has to pass to every reducer
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App)
