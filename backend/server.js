import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import contactRouter from './routes/contactRoutes.js';
import mailRouter from './routes/mailRoutes.js';
import cookieParser from 'cookie-parser';


const app = express();
const port = process.env.PORT || 4000;



connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


// Serve static files with caching
app.use(
  express.static('public', {
    maxAge: '1y', // Cache for 1 year
    immutable: true, // Indicates content won't change
  })
);


app.use('/api/user', userRouter);
app.use('/api/contact', contactRouter);
app.use('/api/mail', mailRouter);

app.get('/', (req, res) => {
  res.send('Ha chl rha h');
});

app.listen(port, () => {
  console.log(`Backend chl rha h is wale port pe: ${port}`);
});
