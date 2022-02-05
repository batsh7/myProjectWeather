const User = require('../models/user')
const Admin = require('../models/admin')
const jwt = require('jsonwebtoken')
const requestApi = require('./requestApi')



const createUser = async (req, res) => {
    try {
        let user = new User(req.body)
        user = await user.save()
        const admin = await Admin.findByIdAndUpdate(user.adminId, { $push: { users: user._id } }, { new: true })
        res.status(200).json({ user: user, admin: admin })
    } catch (error) {
        res.status(404).json({ err: error })
    }
}

const loginUser = async (req, res) => {
    try {
        let user = await User.findById(req.params.userId)
        const token = jwt.sign({ id: user._id, name: user.name, password: user.password }, process.env.SECRET)
        await requestApi.sendEmail(user.email, user.name)
        res.status(200).json({ token: token })

    } catch (error) {
        res.status(404).json({ err: error })

    }
}


const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.id, req.body, { new: true })
        res.status(200).json({ user: user })

    } catch (error) {
        res.status(500).json({ error: err })

    }
}

const getUserById = async (req, res) => {
    try {
        let user = await User.findById(req.id);
        res.status(200).json({ user: user })

    } catch (error) {
        res.status(404).json({ error: err })
    }
}


module.exports = { createUser, loginUser, updateUser, getUserById }