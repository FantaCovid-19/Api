import jwt from 'jsonwebtoken'

import User from '../models/User'
import Role from '../models/Role'

import '../config'

export const verifyToken = async (req, res, next) => {
  let token = req.headers['x-access-token']

  if (!token) return res.status(403).json({ message: 'No token provided' })

  try {
    const decoded = jwt.verify(token, process.env.SECRET)
    req.userId = decoded.id

    const user = await User.findById(req.userId, { password: 0 })
    if (!user) return res.status(404).json({ message: 'User not found' })

    next()
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized!' })
  }
}

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId)
    const roles = await Role.find({ _id: { $in: user.roles }})

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === 'admin') {
        next()
        return
      }
    }

    return res.status(403).json({ message: 'Require Admin Role!' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: err })
  }
}

export const isClient = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId)
    const roles = await Role.find({ _id: { $in: user.roles }})

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === 'client') {
        next()
        return
      }
    }

    return res.status(403).json({ message: 'Require Client Role!' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: err })
  }
}
