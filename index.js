import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import connectDB from './db/connect.js'
import dotenv from'dotenv'
dotenv.config()
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'

const app = express();


app.use(bodyParser.json({limit:'30mb',extended: true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended: true}))
app.use(cors())

app.use('/posts',postRoutes)
app.use('/user',userRoutes)

const port = process.env.PORT || 5000;

const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI);
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };
  
  start();