class CustomSandwichData {

  constructor(rawJSON) {
    this.uid = rawJSON.uid;
    this.title = rawJSON.title;
    this.tags = rawJSON.tags;
    this.resources = rawJSON.resources;

    this.learningGoals = rawJSON.learning_goals;
    this.toothpick = rawJSON.toothpick;
    this.drivingQuestion = rawJSON.driving_question;
    this.projectQuestion = rawJSON.project_question;

    this.allFillings = {}; // filling_id -> SandwichFillingData map 
    if ("fillings" in rawJSON) {
      rawJSON.fillings.forEach((rawJSON) => {
        let filling = new SandwichFillingData(rawJSON);
        this.allFillings[filling.uid] = filling;
      });
    }

    this.nWeeks = rawJSON.numWeeks; // number of weeks in the curriculum
    this.daysInWeek = rawJSON.daysInWeek;

    // Array of the contents of each week
    // this.contents[i] = an ordered list of the fillings in week i
    this.contents = [];
    for (let i = 0; i < this.nWeeks; i++) {
      this.contents.push([]);
    }

    // bind instance functions
    this.latestSuggestedFillingClassNum = this.latestSuggestedFillingClassNum.bind(this);
  }

  // Returns the latest suggested day of a filling (0-indexed)
  latestSuggestedFillingClassNum() {
    let fillingsList = Object.entries(this.allFillings);

    if (fillingsList.length == 0) {
      return -1;
    } 
    let latest = -1;
    fillingsList.forEach(filling => {
      const fillingObj = filling[1];
      if (fillingObj.suggestedDay > latest) {
        latest = fillingObj.suggestedDay;
      }
    });

    return latest;
  }
}

class SandwichFillingData {
  // sandwich slots: list containing the number of filling slots allocated to each week of 
  constructor(fillingJSON, sandwichSlots) {
    this.uid = fillingJSON.id;
    this.title = fillingJSON.title;
    this.isRequired = fillingJSON.isRequired;
    this.type = fillingJSON.type;

    // suggestedDay refers to the suggested order in the class sequence for this filling
    this.suggestedDay = fillingJSON.suggested_day;

    this.duration = fillingJSON.duration;

  }

  // Given a weekly schedule where the class meets {daysPerWeeks} days per week,
  // return the week num (0-indexed) and day num in that week (0-indexed) suggested for this filling 
  getDayAndWeek(daysPerWeek) {
    let week = Math.floor(this.suggestedDay / daysPerWeek);
    let day = this.suggestedDay - (week * daysPerWeek);
    return [week, day];
  }



}


export { CustomSandwichData, SandwichFillingData };