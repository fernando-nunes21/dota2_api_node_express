const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());

app.use("/heroes", require('./api/route/routes'))

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});