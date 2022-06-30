import { Schema, model } from 'mongoose'

const driverSchema = new Schema(
  {
    name: {
      type: String
    },
    last_name: {
      type: String
    },
    run: {
      type: String,
      unique: true,
      max: 10
    },
    license: [
      {
        type: String,
        max: 3
      }
    ],
    phone: {
      type: String,
      max: 12
    },
    email: {
      type: String,
      unique: true
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: 'Company'
    }
  }, {
    timestamps: true,
    versionKey: false
  }
)

export default model('Driver', driverSchema)
