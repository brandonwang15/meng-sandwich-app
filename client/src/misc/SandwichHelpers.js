import store from "../store";
import { setExportInProgress, setExportResults } from '../actions'
import { $CombinedState } from "redux";
const axios = require('axios');

// Start exporting the materials associated with the current state of builder for this sandwich
// Accepts a callback function takes a http response.
function startExport(sandwichId, callback) {
    // clear the old results
    store.dispatch(setExportResults(sandwichId, {}));

    const sandwich = store.getState().sandwiches[sandwichId];
    console.log("Starting sandwich export for: ", sandwichId, sandwich);
    // Cannot start export if one is still in progress
    if (sandwich.isExportInProgress) {
        return false;
    }

    store.dispatch(setExportInProgress(sandwichId, true));

    const requestParams = generateRequestParamsForExport(sandwichId);
    const requestBody =
    {
        slideRanges: requestParams["student_journal"],
    };

    const requestHeaders = {
        "Content-Type": "application/json",
    }

    const url = "/test";

    console.log("about to axios POST: ", requestBody);
    axios.post(url, requestBody, requestHeaders)
        .then(
            (response) => {
                console.log("axios POST response successful: ", response);
                store.dispatch(setExportInProgress(sandwich.uid, false));
                callback(response.data);
            },
            (error) => {
                console.log("axios POST failed: ", error);
                store.dispatch(setExportInProgress(sandwich.uid, false));
                callback({
                    success: false,
                    error: error,
                })
            });

    return true;
}

function generateRequestParamsForExport(sandwichId) {
    console.log("INSIDE generateRequestParamsForExport:");

    const sandwich = store.getState().sandwiches[sandwichId];
    const builderState = store.getState().sandwichBuilder[sandwichId];

    let fillingIdSequence = [];

    // Get the list of filling ids in the builder, in sequential order
    for (let week = 0; week < sandwich.nWeeks; week++) {
        for (let day = 0; day < sandwich.daysInWeek; day++) {
            let planId = "plan-list-" + week + "-" + day
            let planList = builderState.planLists[planId];

            fillingIdSequence.push(...planList.contents);
        }
    }

    console.log(fillingIdSequence);

    // Loop through each filling and obtain the slide ranges associated for each
    let fillingObjSequence = [];
    let slideRanges = {};

    fillingIdSequence.forEach(id => {
        let fillingObj = sandwich.allFillings[id];
        fillingObjSequence.push(fillingObj);

        let materials = fillingObj.materials;

        Object.entries(materials).forEach(tuple => {
            const [key, material] = tuple;

            // only can stitch slides (for now) 
            if (material.type != "googleslides") {
                return;
            }

            if (!(key in slideRanges)) {
                slideRanges[key] = [];
            }


            let nSlides;
            if (material.slides[1] == -1) {
                nSlides = -1;
            } else {
                nSlides = material.slides[1] - material.slides[0];
            }

            const slideRange = {
                url: material.url,
                startIndex: material.slides[0],
                nSlides: nSlides,
            }

            slideRanges[key].push(slideRange);
        });
    });

    console.log(slideRanges);

    return slideRanges;
}

export { startExport };