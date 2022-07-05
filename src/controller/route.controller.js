import mongoose from 'mongoose'
import Route from '../models/Route'
import Company from '../models/Company'
import Bus from '../models/Bus'

export const getAllRoute = async (req, res) => {
  const data = await Route.find()

  return res.status(200).json(data)
}

export const getAllSpecificDetails = async (req, res) => {
  const data = await Route.aggregate([
    {
      $lookup: {
        from: 'companies',
        localField: 'Company',
        foreignField: 'company',
        as: 'company'
      }
    },
    {
      $lookup: {
        from: 'buses',
        localField: 'Bus',
        foreignField: 'bus',
        as: 'bus'
      }
    }
  ])

  return res.status(200).json(data)
}

export const getRouteById = async (req, res) => {
  const { routeId } = req.params
  const data = Route.findById(routeId)

  return res.status(200).json(data)
}

export const getRouteByIdDetails = async (req, res) => {
  const { routeId } = req.params
  const data = await Route.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(routeId)
      }
    },
    {
      $lookup: {
        from: 'companies',
        localField: 'Company',
        foreignField: 'company',
        as: 'company'
      }
    },
    {
      $lookup: {
        from: 'buses',
        localField: 'Bus',
        foreignField: 'bus',
        as: 'bus'
      }
    },
  ])

  const body = {
    _id: data[0]._id,
    origin: data[0].origin,
    destination: data[0].destination,
    stops: data[0].stops,
    company: {
      _id: data[0].company[0]._id,
      name: data[0].company[0].name,
      email: data[0].company[0].email,
      phone: data[0].company[0].phone,
      address: data[0].company[0].address
    },
    bus: {
      _id: data[0].bus[0]._id,
      plate: data[0].bus[0].plate,
      label: data[0].bus[0].label,
      passenger: data[0].bus[0].passenger,
      servicetech: data[0].bus[0].passenger,
      conveniences: data[0].bus[0].conveniences,
      drivers: data[0].bus[0].drivers,
    }
  }

  return res.status(200).json(body)
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
