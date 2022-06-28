import mongoose from 'mongoose'
import './config'

mongoose.connect(process.env.MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(db => {
  console.log('DB is Connected')
}).catch(err => {
  console.log(err)
})
