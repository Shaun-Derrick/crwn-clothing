export const setCurrentUser = (user) => ({
  // The type string needs to match the case string in the reducer file
  //   For type all letters are uppercase and use snake case...underscores where there would normally be spaces
  type: "SET_CURRENT_USER",
  payload: user
})
