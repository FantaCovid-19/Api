import Schedule from '../models/Schedule'

export const getSchedule = async (req, res) => {
  const data = await Schedule.find()
  return res.status(200).json(data)
}

export const getScheduleById = async (req, res) => {
  const { scheduleId } = req.params
  const data = await Schedule.findById(scheduleId)

  return res.status(200).json(data)
}

export const createSchedule = async (req, res) => {
  const { check_in, check_out, date, platform, cost } = req.body

  try {
    const newSchedule = new Schedule({
      check_in,
      check_out,
      date,
      platform,
      cost
    })

    const dataSaved = await newSchedule.save()

    return res.status(201).json(dataSaved)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
}

export const updateSchedule = async (req, res) => {
  const dataUpdated = await Schedule.findByIdAndUpdate(req.params.scheduleId, req.body, { new: true })

  return res.status(204).json(dataUpdated)
}

export const deleteSchedule = async (req, res) => {
  const { scheduleId } = req.params

  await Schedule.findByIdAndDelete(scheduleId)

  return res.status(204).json()
}
