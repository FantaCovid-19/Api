import { Schema, model } from 'mongoose'

const companySchema = new Schema (
  {
    name: {
      type: String
    },
    rut: {
      type: String,
      unique: true,
      min: 9,
      max: 10
    },
    email: {
      type: String,
      unique: true
    },
    phone: {
      type: String,
      unique: true,
      max: 9
    },
    address: {
      type: String
    },
    account: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default model('Company', companySchema)
