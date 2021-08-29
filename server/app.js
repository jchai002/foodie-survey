const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const routes = require("./routes");

const app = express();

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.use("/uploads", express.static("./uploads"));

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
