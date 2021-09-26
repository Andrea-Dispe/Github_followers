const express = require("express");
const app = express();
const router = require("./routers");
const cors = require("cors");
const PORT = 3101;
app.use(cors());
app.use(express.json());
app.use(router);
app.listen(PORT, () => {
  console.log(`listening on http://localhost:3101/`); // eslint-disable-line no-console
});
