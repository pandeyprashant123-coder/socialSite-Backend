import mongoose from 'mongoose'

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}
mongoose.set('strictQuery', false);
export default connectDB