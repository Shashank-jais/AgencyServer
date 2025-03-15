import express from 'express';
import cors from 'cors';
import cookeParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import helmet from 'helmet';
import connectDB from './config/connectDB.js';
import routes from './routes/agencyRoutes.js';
dotenv.config()



const app = express();
app.use(cors({
  credentials:true,
  origin:"https://pressledger.vercel.app"
}));

app.use(express.json())
app.use(cookeParser())
app.use(morgan('combined'))
app.use(helmet(
{
crossOriginResourcePolicy:false
}))

const PORT = process.env.PORT || 5000;

app.get("/",(request,response)=>{
  // server to client
  response.json({
    message:"Server is running at " + PORT
  })
  
})

app.use('/api',routes)


connectDB().then(()=>{
  app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
  })
})






