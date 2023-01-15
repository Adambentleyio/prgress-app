const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc GET all users
// @route GET /users
// @access Private

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean()
    if (!User) {
        return res.status(400).json({message: "No users found. Hmmph"})
    }
    res.json(users)
})

// @desc POST new users
// @route POST /users
// @access Private

const createNewUser = asyncHandler(async (req, res) => {
    const { username, password, roles } = req.body

    // confirm data
    if (!username || !password) {
        return res.status(400).json({message: "All fields are required"})
    }

    // check for duplicate
    const duplicate = await User.findOne({ username }).collation({locale: 'en', strength: 2}).lean().exec()

    if (duplicate) {
        res.status(409).json({message: "Duplicate username"})
    }

    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    const userObject = (!Array.isArray(roles) || !roles.length)
    ? { username, "password": hashedPwd}
    : {username, "password": hashedPwd, roles}
    // create and store new user

    const user =  await User.create(userObject)

    if(user) {
        res.status(201).json({message: `New user ${username} created`})
    } else {
        res.status(400).json({message: "invalid user data received"})
    }
})

// @desc update a user
// @route PATCH /users
// @access Private

const updateUser = asyncHandler(async (req, res) => {
    const { id, username, roles, active, password } = req.body

    // Confirm data
    if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'All fields except password are required' })
    }

    // Does the user exist to update?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    // Check for duplicate
    const duplicate = await User.findOne({ username }).collation({locale: 'en', strength: 2}).lean().exec()

    // Allow updates to the original user
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    user.username = username
    user.roles = roles
    user.active = active

    if (password) {
        // Hash password
        user.password = await bcrypt.hash(password, 10) // salt rounds
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} updated` })
})

// @desc DELETE a new user
// @route DELETE /users
// @access Private

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    // Does the user still have assigned notes?
    const note = await Note.findOne({ user: id }).lean().exec()
    if (note) {
        return res.status(400).json({ message: 'User has assigned notes' })
    }

    // Does the user exist to delete?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}
