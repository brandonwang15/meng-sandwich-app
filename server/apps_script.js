const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

// Adapted from the Google Apps Script NodeJS quickstart:
// https://developers.google.com/apps-script/api/quickstart/nodejs

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/script.projects', 'https://www.googleapis.com/auth/presentations', 'https://www.googleapis.com/auth/drive'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

function callStitchSlides(params, responseCallback) {
    // Load client secrets from a local file.
    fs.readFile('credentials.json', (err, content) => {
        console.log("GAS.initialze()");
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Apps Script API.
        authorize(JSON.parse(content), (auth) => callAppsScriptSlideMerge(params, auth, responseCallback));
    });
}


/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

/**
 * Call an Apps Script function to test slide merging
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function callAppsScriptSlideMerge(params, auth, responseCallback) { // eslint-disable-line no-unused-vars
    // scriptID = the "Deployment ID" from the "Manage Deployments" page in the Google Apps Script Editor
    const scriptId = 'AKfycbxjd8HAeKptkojKHENVQbphOAPgyGtrMeqE-WamYmw2DKpbSxpFEdURz7RQavz6LUUMPg';
    const script = google.script('v1');
    
    // Make the API request. The request object is included here as 'resource'.
    console.log('Calling stitchSlides()... with params: ', params);

    var input = [];

    input.push({
      url: "https://docs.google.com/presentation/d/12svaHbSKQvc9wwbT1kcQ8N-IEAqmxjMY1HD22Tf8Gzk/edit#slide=id.p",
      startIndex: 0,
      nSlides: -1,
    });
  
    input.push({
      url: "https://docs.google.com/presentation/d/12svaHbSKQvc9wwbT1kcQ8N-IEAqmxjMY1HD22Tf8Gzk/edit#slide=id.p",
      startIndex: 0,
      nSlides: -1,
    });
  
    input.push({
      url: "https://docs.google.com/presentation/d/12svaHbSKQvc9wwbT1kcQ8N-IEAqmxjMY1HD22Tf8Gzk/edit#slide=id.p",
      startIndex: 0,
      nSlides: -1,
    });


    script.scripts.run({
        auth: auth,
        resource: {
            function: 'stitchSlides',
            parameters: [params["presentationTitle"], input],
            // parameters: [params["presentationTitle"], params["slideRanges"]],
        },
        devMode: true,
        scriptId: scriptId,
    }, function (err, resp) {
        if (err) {
            // The API encountered a problem before the script started executing.
            console.log('The API returned an error: ' + err);
            responseCallback({
                success: false,
                error: 'The API returned an error: ' + err,
            })
            return;
        }
        if (resp.error) {
            // The API executed, but the script returned an error.

            // Extract the first (and only) set of error details. The values of this
            // object are the script's 'errorMessage' and 'errorType', and an array
            // of stack trace elements.
            const error = resp.error.details[0];
            console.log('Script error message: ' + error.errorMessage);
            console.log('Script error stacktrace:');

            if (error.scriptStackTraceElements) {
                // There may not be a stacktrace if the script didn't start executing.
                for (let i = 0; i < error.scriptStackTraceElements.length; i++) {
                    const trace = error.scriptStackTraceElements[i];
                    console.log('\t%s: %s', trace.function, trace.lineNumber);
                }
            }
            responseCallback({
                success: false,
                error: 'The script returned an error: ' + error.errorMessage,
            });
            
        } else {
            // The structure of the result will depend upon what the Apps Script
            // function returns. 
            console.log("Got response: ", resp);
            console.log("Got error: ", resp.data.error);
            console.log("Got return value: ", resp.data.response.result);

            responseCallback({
                success: true,
                response: resp.data,
            });

            // Here, the function returns an Apps Script Object
            // with String keys and values, and so the result is treated as a
            // Node.js object (folderSet).
            // const folderSet = resp.response.result;
            // if (Object.keys(folderSet).length == 0) {
            //   console.log('No folders returned!');
            // } else {
            //   console.log('Folders under your root folder:');
            //   Object.keys(folderSet).forEach(function(id) {
            //     console.log('\t%s (%s)', folderSet[id], id);
            //   });
            // }
        }
    });
}

module.exports = {
    callStitchSlides: callStitchSlides,
}