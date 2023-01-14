import express from 'express';
import bodyParser from 'body-parser';

import usersRouter from './routes/users.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/users', usersRouter);

app.get('/', (req, res) => res.send("Get response from home page"));

app.listen(PORT, () => console.log(`Server is runing on port nummber : ${PORT}`));