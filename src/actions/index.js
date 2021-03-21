export const setFilling = (sandwichUID, fillingIndex, newValue) => ({
    type: 'SET_FILLING',
    uid: sandwichUID,
    index: fillingIndex,
    value: newValue,
  })

  export const deleteFilling = (sandwichUID, fillingIndex) => ({
    type: 'DELETE_FILLING',
    uid: sandwichUID,
    index: fillingIndex,
  })