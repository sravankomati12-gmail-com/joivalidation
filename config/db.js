const mongoose = require('mongoose');
mongoose
  .connect(
    "mongodb://localhost:27017/joidb",
  )
  .then(console.log("database is connected"))
  .catch((err) => console.log(err));
