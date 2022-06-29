import { Schema, model } from 'mongoose'

const scheduleSchema = new Schema(
  {
    check_in: {
      type: String
    },
    check_out: {
      type: String
    },
    date: {
      type: String
    },
    platform: {
      type: String
    },
    cost: {
      type: Number
    }
  }, {
    timestamps: true,
    versionKey: false
  }
)
export default model('Schedule', scheduleSchema)
