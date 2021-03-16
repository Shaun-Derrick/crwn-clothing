import { createSelector } from "reselect"
import memoize from "lodash.memoize"

// refactored shop_data array to an object to eliminate the need to use find to return the user selected collection-data normalization
// const COLLECTION_ID_MAP = {
//   hats: 1,
//   sneakers: 2,
//   jackets: 3,
//   womens: 4,
//   mens: 5
// }

const selectShop = (state) => state.shop

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
)

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  // converts a object into an array
  (collections) => Object.keys(collections).map((key) => collections[key])
)

// export const selectCollection = (collectionUrlParam) =>
//   createSelector([selectCollections], (collections) =>
//     collections.find(
//       (collection) => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
//     )
//   )
// selector changed to memoize url parameter -- COLLECTION_ID_MAP no longer needed
export const selectCollection = memoize((collectionUrlParam) =>
  createSelector(
    [selectCollections],
    (collections) => collections[collectionUrlParam]
  )
)
