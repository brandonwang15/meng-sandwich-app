import store from "../store";
import { setExportInProgress, setExportResults } from '../actions'

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

    const url = "/test";
    fetch(url)
        .then(data => { return data.json() })
        .then(text => {
            console.log("http response text: ", text);
            console.log("calling callback");
            store.dispatch(setExportInProgress(sandwich.uid, false));
            return callback(text);
        });

    return true;
}

export {startExport};