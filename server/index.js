// server/index.js

const { response } = require("express");
const express = require("express");
const appsScript = require("./apps_script");

const PORT = process.env.PORT || 3001;

const app = express();

// For parsing application/json
app.use(express.json());

/*
  /api/stitchslides
  ---
  Parameters:
  {slideRanges: [
    {
      url: string,
      startIndex: int,
      nSlides, int,
    },
    ...
  ]}

  Returns:
  {
    success: bool,
    url: string,
    error: string,
  }
*/
app.post('/api/stitchslides', (req, res) => {
  // Validate request parameters
  if (!("slideRanges" in req.body)) {
    console.log("400: slideRanges not present in request body.");
    res.status(400).send("POST request missing 'slideRanges' key in body");
    return;
  }

  console.log("Passed request validation.");
  console.log("req.body: ", req.body);

  
  // Call the slide stitching function
  const stitchParams = req.body["slideRanges"];
  appsScript.callStitchSlides(stitchParams, (result) => {
    // Respond to the client
    console.log(result);
    const success = result.success;
    
    if (!success) { 
      res.send({
        success: false,
        url: "",
      });  
    } else {
      const responsePayload = result.response.response.result;

      console.log("Number of slides: ", responsePayload.totalSlides);
      const url = responsePayload.url;

      res.send({
        success: true,
        url: url,
      });  
    }
    
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

console.log("Server starting up in index.js...");
