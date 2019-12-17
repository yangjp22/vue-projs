// loading the package
const express = require('express');
// initialize an app instance
const app = express();

app.use(express.static('dist'));

app.listen(process.env.PORT || 8080, () => console.log('All is ok'));