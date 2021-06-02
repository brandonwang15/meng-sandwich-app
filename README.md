# Client 
Navigate to the client code directory: `cd client/`
Install node packages: `npm install`
Start the node server to serve client code:  `npm start`
You can now navigate to `localhost:3000/home` to access the site.
    
# Backend
## Starting the backend server
Navigate to the server code directory: `cd server/`
Install node packages: `npm install`
Start the backend server: `npm start`

## Setting up Google Apps Script
Follow the setup guide here: https://developers.google.com/apps-script/api/quickstart/nodejs
    - Create a new Google Cloud Console project
    - When asked to "Enable a Google Workspace API", enable: 
        - Apps Script API (TODO: why?)
        - Google Drive API (TODO: why?)
    - Authorization credentials for a desktop application. To learn how to create credentials for a desktop application, refer to Create credentials.
        - Create with the "External" usertype
        - Add scope: "Google Drive API	.../auth/drive	See, edit, create, and delete all of your Google Drive files"
        - Add the same gmail account you're using as a "Test User"
    