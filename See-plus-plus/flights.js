const express = require('express');
const app = express();
const port = 6400;
app.get('/', (req, res) => {
    res.send("");
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))
