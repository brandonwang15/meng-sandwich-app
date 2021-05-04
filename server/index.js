// server/index.js

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.get('/test', (req, res) => {

  console.log("start");
  // Simulate processing time
  setTimeout(() => {
    console.log("done");
    res.send({
      class_slides_url: 'slides.google.com/test/class_slides',
      student_workbook_url: 'slides.google.com/test/student_workbook',
      teacher_guide_url: 'slides.google.com/test/teacher_guide',
      summary_doc_url: "slides.google.com/test/summary_doc",

    });

  }, 3000);

});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});