import User from '../models/User'
import Role from '../models/Role'

export const getUser = (req, res) => {

}

export const getUserById = (req, res) => {

}

export const createUser = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body
    const roleFound = await Role.find({ name: { $in: roles } })

    const user = new User({
      username,
      email,
      password,
      roles: roleFound.map((role) => role._id)
    })

    user.password = await User.encryptPassword(user.password)

    const savedUser = await user.save()

    return res.status(200).json({
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      roles: savedUser.roles
    })
  } catch (err) {
    console.error(err)
  }
}

export const updateUser = (req, res) => {

}

export const deleteUser = (req, res) => {

}
