import express from 'express';
import { connectDB } from './config/connectDB';
import { Routers } from './global/router';
import cors from 'cors';
import morgan from 'morgan';


require('dotenv').config();
connectDB();
const app = express();
app.use(express.json());


app.use(morgan('dev'));
app.use(cors())
const port = process.env.PORT;

app.use('/api', Routers);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
