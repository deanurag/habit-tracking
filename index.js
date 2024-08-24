const express = require('express');
const bodyParser = require('body-parser');
const { createHabit, getHabit, logHabit, deleteHabit } = require('./controllers');

const app = express()
const PORT = 3000;

app.use(express.json());  

app.post('/habits', createHabit);
app.post('/habits/:id/log', logHabit)
app.get('/habits', getHabit);
app.delete('/habits/:id', deleteHabit);
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));