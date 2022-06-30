import User from '../models/User'
import Company from '../models/Company'

export const getCompany = async (req, res) => {
  const data = await Company.find()

  return res.status(200).json(data)
}

export const getCompanyById = async (req, res) => {
  const { companyId } = req.params
  const data = await Company.findById(companyId)

  return res.status(200).json(data)
}

export const createCompany = async (req, res) => {
  const { name, rut, email, phone, address, account } = req.body

  try {
    const newCompany = new Company({
      name,
      rut,
      email,
      phone,
      address
    })

    if (req.body.account) {
      const foundUser = await User.find({ username: { $in: account } })

      newCompany.account = foundUser.map((usr) => usr._id)
    }

    const savedCompany = await newCompany.save()

    return res.status(201).json(savedCompany)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
}

export const updateCompany = async (req, res) => {
  const { companyId } = req.params
  const { account } = req.body

  if (req.body.account) {
    const foundUser = await User.find({ username: { $in: account } })

    req.body.account = foundUser.map((usr) => usr._id)
  }

  const data = await Company.findByIdAndUpdate(companyId, req.body, { new: true })

  return res.status(200).json(data)
}

export const deleteCompany = async (req, res) => {
  const { companyId } = req.params

  await Company.findByIdAndDelete(companyId)

  return res.status(204).json()
}
