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

export const builderMoveFilling = (sandwichId, sourceListId, destinationListId, sourceIndex, destinationIndex) => ({
  type: "BUILDER_MOVE_FILLING",
  sandwichId: sandwichId,
  sourceListId: sourceListId,
  destinationListId: destinationListId,
  sourceIndex: sourceIndex,
  destinationIndex: destinationIndex,
});