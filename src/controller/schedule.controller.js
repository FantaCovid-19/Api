import Schedule from '../models/Schedule'
import Route from '../models/Route'
import Company from '../models/Company'

export const getAllSchedule = async (req, res) => {
  const data = await Schedule.find()
  return res.status(200).json(data)
}

export const getAllSpecificDetailsSchedule = async (req, res) => {
  const data = await Schedule.find().populate('company').populate('routes')
  return res.status(200).json(data)
}

export const getScheduleById = async (req, res) => {
  const { scheduleId } = req.params
  const data = await Schedule.findById(scheduleId)

  return res.status(200).json(data)
}

export const getScheduleByIdAllDetails = async (req, res) => {
  const { scheduleId } = req.params
  const data = await Schedule.findById(scheduleId).populate('company').populate('routes')

  return res.status(200).json(data)
}

export const createSchedule = async (req, res) => {
  const { check_in, check_out, date, platform, routes, company, cost } = req.body

  try {
    const newSchedule = new Schedule({
      check_in,
      check_out,
      date,
      platform,
      cost
    })

    if (req.body.routes) {
      const foundRoutes = await Route.find({ _id: { $in: routes } })

      newSchedule.routes = foundRoutes.map((rt) => rt._id)
    }

    if (req.body.company) {
      const foundCompany = await Company.find({ rut: { $in: company }})

      newSchedule.company = foundCompany.map((cmy) => cmy._id)
    }

    const dataSaved = await newSchedule.save()

    return res.status(201).json(dataSaved)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
}

export const updateSchedule = async (req, res) => {
  const { scheduleId } = req.params
  const { routes, company } = req.body

  if (req.body.routes) {
    const foundRoutes = await Route.find({ _id: { $in: routes } })

    req.body.routes = foundRoutes.map((rt) => rt._id)
  }

  if (req.body.company) {
    const foundCompany = await Company.find({ rut: { $in: company }})

    req.body.company = foundCompany.map((cmy) => cmy._id)
  }

  const dataUpdated = await Schedule.findByIdAndUpdate(scheduleId, req.body, { new: true })

  return res.status(204).json(dataUpdated)
}

export const deleteSchedule = async (req, res) => {
  const { scheduleId } = req.params

  await Schedule.findByIdAndDelete(scheduleId)

  return res.status(204).json()
}
