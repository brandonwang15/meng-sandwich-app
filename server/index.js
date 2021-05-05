// server/index.js

const { response } = require("express");
const express = require("express");
const appsScript = require("./apps_script");

const PORT = process.env.PORT || 3001;

const app = express();

app.get('/test', (req, res) => {

  console.log("start");
  console.log(req.body);

  appsScript.callStitchSlides((result) => {
    console.log(result);
    const success = result.success;
    
    if (!success) { 
      res.send({
        class_slides_url: "n/a",
        student_workbook_url: "n/a",
        teacher_guide_url: "n/a",
        summary_doc_url: "n/a",
  
      });  
    } else {
      const responsePayload = result.response.response.result;

      console.log("Number of slides: ", responsePayload.totalSlides);
      const url = responsePayload.url;

      res.send({
        class_slides_url: url,
        student_workbook_url: 'slides.google.com/test/student_workbook',
        teacher_guide_url: 'slides.google.com/test/teacher_guide',
        summary_doc_url: "slides.google.com/test/summary_doc",
  
      });  
    }
    
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

console.log("Server starting up in index.js...");
