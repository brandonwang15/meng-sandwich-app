class CustomSandwichData {
  constructor(title, numSlots, requiredFillings, optionalFillings, weeklySlots) {
    this.title = title;
    this.numSlots = numSlots;
    this.requiredFillings = requiredFillings;
    this.optionalFillings = optionalFillings;
    this.contents = {}
  }
}

class SandwichFillingData {
  // sandwich slots: list containing the number of filling slots allocated to each week of 
  constructor(fillingJSON, sandwichSlots) {
    this.title = fillingJSON.title;
    this.isRequired = fillingJSON.isRequired;
    this.type = fillingJSON.type;

    this.suggestedIndex = 0;
    for (let i = 0; i < fillingJSON.suggestedWeek; i++) {
      this.suggestedIndex += sandwichSlots[i];
    }
    this.suggestedIndex += fillingJSON.suggestedDay;

    this.assignedIndex = -1;
  }


}
  
export {CustomSandwichData, SandwichFillingData};