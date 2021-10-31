const express = require('express');
const app = express();
const cors = requir('cors')
const port = 3001;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
})