import React from "react"
import { Route } from "react-router-dom"
import { connect } from "react-redux"


import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils"

import { updateCollections } from "../../redux/shop/shop.actions"

import WithSpinner from "../../components/with-spinner/with-spinner.component"

import CollectionsOverview from "../../components/collections-overview/collections-overview.component"
import CollectionPage from "../collection/collection.component"

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends React.Component {
state = {
  loading: true
}
  unsubscribeFromSnapshot = null

  componentDidMount() {
    const { updateCollections } = this.props
    const collectionRef = firestore.collection('collections')

    // can use fetch but it has been made more challenging as the information is nested in 8 different levels of information
    // fetch('https://firestore.googleapis.com/v1/projects/crwn-db-7af58/databases/(default)/documents/collections'
    // )
    // .then (response => response.json())
    // .then (collections => console.log(collections))

    // promise based async request
    collectionRef.get().then(snapshot => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
        updateCollections(collectionsMap)
        this.setState({ loading: false })
      })
      // firebase methodology
      // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
    //   updateCollections(collectionsMap)
    //   this.setState({ loading: false })
    // collectionRef.onSnapshot(async snapshot => {
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
    //   console.log(collectionsMap)
    // })

  }
  render () {
    const { match } = this.props
    const { loading } = this.state
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props}/>} />
        <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props}/>} />
      </div>
    )
  }

}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage)
