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

export const setWeekAndDays = (sandwichUID, numWeeks, daysInWeek) => ({
  type: "SET_WEEKS_AND_DAYS_FOR_SANDWICH",
  uid: sandwichUID,
  numWeeks: numWeeks,
  daysInWeek: daysInWeek,
})

export const builderMoveFilling = (sandwichId, sourceListId, destinationListId, sourceIndex, destinationIndex) => ({
  type: "BUILDER_MOVE_FILLING",
  sandwichId: sandwichId,
  sourceListId: sourceListId,
  destinationListId: destinationListId,
  sourceIndex: sourceIndex,
  destinationIndex: destinationIndex,
});

export const builderResetSandwichContents = (sandwichId, sandwichObj) => ({
  type: "BUILDER_RESET_SANDWICH_CONTENTS",
  sandwichId: sandwichId,
  sandwichObj, sandwichObj,
});