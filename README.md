# Client 
Navigate to the client code directory: `cd client/`

## First-time setup
Install node packages: `npm install`

## Starting the server
Start the node server to serve client code:  `npm start`
You can now navigate to `localhost:3000/home` to access the site.
    
# Backend
Navigate to the server code directory: `cd server/`

## First-time setup
Install node packages: `npm install`    

## Starting the backend server
Start the backend server: `npm start`

Note: before the backend can make requests to Google Apps Script to stitch slides together, you'll need to follow the steps in the below "Setting up Google Apps Script" section.

# Setting up Google Apps Script

Google Apps Script is an API for various Google services that allows us to programatically do things like merge different Google Slides presentations into a single presentation. We use this functionality to give users customized teacher materials when they export a sandwich from the website.

We have Apps Script code that is writen here: `https://script.google.com/d/1HTr278_ioYQC6xJqyzd_sLsTSW51d0Uh5je96fn8_o6K_HTssO1puPu3/edit?usp=sharing`. 

The purpose of the backend is to accept requests from the client browser, and call this Apps Script code we've written. The backend is basically a middleman between the client browser and the Apps Script code. 

However, there's a bit of setup + configuration we need to do to get this running. The following sections explain what we need to do.

## Setting up the Google Cloud Console Project
First we need to set up a Google Cloud Console Project that we can associate everything with.

Follow the setup guide here: https://developers.google.com/apps-script/api/quickstart/nodejs. 

You'll need to do the pre-requisite steps too, in particular the ones labeled "A Google Cloud Platform project with the API enabled." and "Authorization credentials for a desktop application."

When following the steps for the "A Google Cloud Platform project with the API enabled." pre-requisite:
    * When asked to "Enable a Google Workspace API", enable: 
        * Apps Script API (TODO: why?)
        * Google Drive API (TODO: why?)

When following the steps for the "Authorization credentials for a desktop application" pre-requisite:
        * Create the credentials with the "External" usertype
        * Add the scopes: "Google Drive API	.../auth/drive	See, edit, create, and delete all of your Google Drive files"
        * Add the same Gmail account you're used to create the GCP project as a "Test User"
        * When creating the OAuth client ID credential:
            * Application type is "Desktop app"
            * Save it to `server/credentials.json`
    
## Create the Google Apps Script script 
Copy the code to a new file in your own Google Drive:
* The code is located here: https://script.google.com/d/1HTr278_ioYQC6xJqyzd_sLsTSW51d0Uh5je96fn8_o6K_HTssO1puPu3/edit?usp=sharing
* Create a new Apps Script file in your Drive and copy-paste the code into there.
* Deploy the script via the blue button in the top bar and copy the Deployment ID into `server/apps_script.js` where it says `const scriptId = "[deployment id goes here]"`
* In the Apps Script file settings, set the GCP Project Number to that of the GCP project you're using.

## Authorizing the app by making a first request
* The first time a request is made, messages will pop up on the CLI that walk you through the final step, which is authorizing your backend to actually make Google Apps Script requests.
* To make a request, make sure both the client and backend servers are running (see above sections).
* Navigate to a sandwich page like `http://localhost:3000/sandwich/2` and click the `Export` button in the bottom right.
* This takes you to the `Export Page` and makes a request to the backend. 
* The first time a request like this is made, on the CLI you will see a message:
    "Authorize this app by visiting this url: https://accounts.google.com/o/oauth2/v2/...
    Enter the code from that page here:"
* Navigate to the given URL and click through all the prompts, granting permission when asked. When you're done you'll be given a code string. Paste that into the CLI where it asks for it.
* Your app should be authorized and there should be a `token.json` file.  


    