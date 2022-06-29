import User from '../models/User'
import Role from '../models/Role'

import bcrypt from 'bcryptjs'

export const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount()

    if (count > 0) return

    const values = await Promise.all([
      new Role({ name: 'user' }).save(),
      new Role({ name: 'client' }).save(),
      new Role({ name: 'admin' }).save(),
    ])

    console.log(values)
  } catch (err) {
    console.log(err)
  }
}

export const createAdmin = async () => {
  const user = await User.findOne({ email: 'admin@localhost' })

  const roles = await Role.find({ name: { $in: ['admin', 'client'] } })

  if (!user) {
    await User.create({
      username: 'admin',
      email: 'admin@localhost',
      password: await bcrypt.hash('admin', 10),
      roles: roles.map((role) => role._id)
    })

    console.log('Admin User Created!')
  }
}
