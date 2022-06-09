const express = require('express');
const cors = require('cors');
// const path = require('path');

const app = express();

// Middleware
app.use(cors());

const game = require('./routes/api/game');

const PORT = 5000;

app.use('/api/game', game);

// var roombaFile = path.resolve('./index.html');

// app.get('/', (req, res) => {
//     res.sendFile(roombaFile);
// })

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
