import mongoose from 'mongoose'

mongoose.connect('',{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(db => {
  console.log('DB is Connected')
}).catch(err => {
  console.log(err)
})
