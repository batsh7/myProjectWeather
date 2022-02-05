const Admin = require('../models/admin')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



const createAdmin = async (req, res) => {
    try {
        let admin = new Admin(req.body)
        admin = await admin.save()
        res.status(200).json({ admin: admin })
    } catch (error) {
        res.status(404).json({ error: error })
    }
}

const loginAdmin = async (req, res) => {
    try {
        let admin = await Admin.findById(req.params.adminId)
        console.log(admin);
        const token = jwt.sign({ id: req.params.adminId, name: admin.name, password: admin.password }, process.env.SECRET)
        //await requestApi.sendEmail(admin.email, admin.name)
        res.status(200).json({ token: token })
    } catch (error) {
        res.status(404).json({ err: error })
    }
}

const deleteUser = async (req, res) => {
    try {
        let user = await User.findById(req.id)
        let admin = await Admin.findByIdAndUpdate(user.adminId, { $pull: { users: user._id } }, { new: true })
        await User.findByIdAndDelete(req.id)
        res.status(200).json({ user: user })
    } catch (error) {
        res.status(404).json({ error: error })
    }
}

const updateAdmin = async (req, res) => {
    try {
        let admin = await Admin.findByIdAndUpdate(req.id, req.body, { new: true })
        res.status(200).json({ admin: admin })

    } catch (error) {
        res.status(500).json({ error: error })

    }
}

const getAllUsersByAdmin = async (req, res) => {
    try {
        const admin = await (await Admin.findById(req.id).populate({ path: 'users', select: ['name', 'password'] }))
        res.status(200).json({ admin: admin })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

module.exports = { createAdmin, loginAdmin, deleteUser, updateAdmin, getAllUsersByAdmin }