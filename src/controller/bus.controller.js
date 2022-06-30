import Bus from '../models/Bus'
import Driver from '../models/Driver'
import Company from '../models/Company'

export const getBus = async (req, res) => {
  const data = await Bus.find()

  return res.status(200).json(data)
}

export const getBusById = async (req, res) => {
  const { busId } = req.params
  const data = await Bus.findById(busId)

  return res.status(200).json(data)
}

export const createBus = async (req, res) => {
  const { plate, label, passenger, servicetech, conveniences, drivers, company } = req.body

  try {
    const newBus = new Bus({
      plate,
      label,
      passenger,
      servicetech,
      conveniences
    })

    if (req.body.drivers) {
      const foundDriver = await Driver.find({ run: { $in: drivers } })

      newBus.drivers = foundDriver.map((dvr) => dvr._id)
    }

    if (req.body.company) {
      const foundCompany = await Company.find({ rut: { $in: company } })

      newBus.company = foundCompany.map((cmy) => cmy._id)
    }

    const savedBus = await newBus.save()

    return res.status(201).json(savedBus)
  } catch (err) {
    console.erro(err)
    return res.status(500).json(err)
  }
}

export const updateBus = async (req, res) => {
  const { busId } = req.params
  const { drivers, company } = req.body

  if (req.body.drivers) {
    const foundDriver = await Driver.find({ run: { $in: drivers } })

    req.body.drivers = foundDriver.map((dvr) => dvr._id)
  }

  if (req.body.company) {
    const foundCompany = await Company.find({ rut: { $in: company } })

    req.body.company = foundCompany.map((cmy) => cmy._id)
  }

  const data = await Bus.findByIdAndUpdate(busId, req.body, { new: true })

  return res.status(200).json(data)
}

export const deleteBus = async (req, res) => {
  const { busId } = req.params

  await Bus.findByIdAndDelete(busId)

  return res.status(204).json()
}
