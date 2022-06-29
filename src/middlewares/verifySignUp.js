import User from '../models/User'
import { ROLES } from '../models/Role'

const checkDuplicateDataUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username })

    if (user) return res.status(400).json({ message: 'The user already exists' })

    const email = await User.findOne({ email: req.body.email })

    if (email) return res.status(400).json({ message: 'The email already exists' })

    next()
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}

const checkRoleExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({
          message: `Role ${req.body.roles[i]} does not exists`
        })
      }
    }
  }

  next()
}

export { checkDuplicateDataUser, checkRoleExisted }
