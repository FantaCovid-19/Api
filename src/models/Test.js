import { Schema, model } from 'mongoose'

const testSchema = new Schema({
  name: String,
  price: Number
}, {
  timestamps: true,
  versionKey: false
})

export default model('Test', testSchema)
