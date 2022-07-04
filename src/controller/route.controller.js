import Route from '../models/Route'
import Company from '../models/Company'
import Bus from '../models/Bus'

export const getAllRoute = async (req, res) => {
  const data = await Route.find()

  return res.status(200).json(data)
}

export const getAllSpecificDetails = async (req, res) => {
  const data = await Route.find()
  const foundCompany = await Company.find({ _id: data.company })

  data.company = foundCompany

  return res.status(200).json(data)
}

export const getRouteById = async (req, res) => {
  const { routeId } = req.params
  const data = Route.findById(routeId)

  return res.status(200).json(data)
}

export const createRoute = async (req, res) => {
  const { origin, destination, stops, bus, company } = req.body

  try {
    const newRoute = new Route({
      origin,
      destination,
      stops
    })

    if (req.body.company) {
      const foundCompany = await Company.find({ rut: { $in: company } })

      newRoute.company = foundCompany.map((cmy) => cmy._id)
    }

    if (req.body.bus) {
      const foundBus = await Bus.find({ plate: { $in: bus }})

      newRoute.bus = foundBus.map((bus) => bus._id)
    }

    const savedRoute = await newRoute.save()

    return res.status(201).json(savedRoute)
  } catch (err) {
    console.error(err)
    return res.status(500).json(err)
  }
}

export const updateRoute = async (req, res) => {
  const { routeId } = req.params
  const { company, bus } = req.body

  if (req.body.company) {
    const foundCompany = await Company.find({ rut: { $in: company } })

    req.body.company = foundCompany.map((cmy) => cmy._id)
  }

  if (req.body.company) {
    const foundBus = await Bus.find({ plate: { $in: bus } })

    req.body.bus = foundBus.map((bus) => bus._id)
  }

  const data = await Route.findByIdAndUpdate(routeId, req.body, { new: true })

  return res.status(200).json(data)
}

export const deleteRoute = async (req, res) => {
  const { routeId } = req.params

  await Route.findByIdAndDelete(routeId)

  return res.status(204).json()
}
