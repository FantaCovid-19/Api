import { Schema, model } from 'mongoose'

const busSchema = new Schema(
  {
    plate: {
      type: String,
      unique: true,
      max: 6
    },
    label: {
      type: String,
    },
    passenger: {
      type: Number
    },
    servicetech: {
      type: Boolean
    },
    conveniences: [
      {
        type: String
      }
    ],
    drivers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Driver'
      }
    ],
    company: {
      type: Schema.Types.ObjectId,
      ref: 'Company'
    }
  }, {
    timestamps: true,
    versionKey: false
  }
)

export default model('Bus', busSchema)
