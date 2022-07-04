import { Schema, model } from 'mongoose'

const routeSchema = new Schema(
  {
    origin: {
      type: String
    },
    destination: {
      type: String
    },
    stops: [
      {
        type: String
      }
    ],
    bus: {
      type: Schema.Types.ObjectId,
      ref: 'Bus'
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

export default model('Route', routeSchema)
