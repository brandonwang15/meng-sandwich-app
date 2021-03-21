export class CustomSandwichData {
  constructor(title, numSlots, requiredFillings, optionalFillings) {
    this.title = title;
    this.numSlots = numSlots;
    this.requiredFillings = requiredFillings;
    this.optionalFillings = optionalFillings;
    this.contents = {}
  }
}

export class SandwichFillingData {
    constructor(title, isRequired, index) {
      this.title = title;
      this.isRequired = isRequired;
      this.index = index;
    }
  }
  