class CustomSandwichData {
  
  constructor(rawJSON) {
    this.uid = rawJSON.uid;
    this.title = rawJSON.title;
    this.tags = rawJSON.tags;
    this.resources = rawJSON.resources;
    
    this.allFillings = {}; // filling_id -> SandwichFillingData map 
    if ("fillings" in rawJSON) {
      rawJSON.fillings.forEach((rawJSON) => {
        let filling = new SandwichFillingData(rawJSON);
        this.allFillings[filling.uid] = filling;
      });
    }

    this.nWeeks = rawJSON.numWeeks; // number of weeks in the curriculum
    
    // Array of the contents of each week
    // this.contents[i] = an ordered list of the fillings in week i
    this.contents = [];
    for (let i = 0; i < this.nWeeks; i++) {
      this.contents.push([]);
    }
  }
}

class SandwichFillingData {
  // sandwich slots: list containing the number of filling slots allocated to each week of 
  constructor(fillingJSON, sandwichSlots) {
    this.uid = fillingJSON.id;
    this.title = fillingJSON.title;
    this.isRequired = fillingJSON.isRequired;
    this.type = fillingJSON.type;

    this.suggestedWeek = fillingJSON.suggested_week;
    this.suggestedDay = fillingJSON.suggested_day;

  }


}
  
export {CustomSandwichData, SandwichFillingData};