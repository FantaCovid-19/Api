import Driver from '../models/Driver'
import Company from '../models/Company'

export const getDriver = async (req, res) => {
  const data = await Driver.find()

  return res.status(200).json(data)
}

export const getDriverById = async (req, res) => {
  const { driverId } = req.params
  const data = await Driver.findById(driverId)

  return res.status(200).json(data)
}

export const createDriver = async (req, res) => {
  const { name, last_name, run, license, phone, email, company } = req.body

  try {
    const newDriver = new Driver({
      name,
      last_name,
      run,
      license,
      phone,
      email
    })

    if (req.body.company) {
      const foundCompany = await Company.find({ rut: { $in: company } })

      newDriver.company = foundCompany.map((cmy) => cmy._id)
    }

    const savedCompany = await newDriver.save()

    return res.status(201).json(savedCompany)
  } catch (err) {
    console.error(err)
    return res.status(500).json(err)
  }
}

export const updateDriver = async (req, res) => {
  const { driverId } = req.params
  const { company } = req.body

  if (req.body.company) {
    const foundCompany = await Company.find({ rut: { $in: company } })

    req.body.company = foundCompany.map((cmy) => cmy._id)
  }

  const data = await Driver.findByIdAndUpdate(driverId, req.body, { new: true })

  return res.status(200).json(data)
}

export const deleteDriver = async (req, res) => {
  const { driverId } = req.params

  await Driver.findByIdAndDelete(driverId)

  return res.status(204).json()
}
