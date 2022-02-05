const router = require('express').Router()
const admin = require('../controllers/admin')
const user = require('../controllers/user')
const weather = require('../controllers/weather')

router.post('/createAdmin', admin.createAdmin)
router.post('/createUser', user.createUser)
// router.patch('/updateUser/:userId', user.updateUser)
router.patch('/updateUser', user.updateUser)


router.get('/getUserById', user.getUserById)
router.patch('/updateAdmin', admin.updateAdmin)
router.delete('/deleteUser', admin.deleteUser)
router.get('/loginUser/:userId', user.loginUser)
router.get('/loginAdmin/:adminId', admin.loginAdmin)

router.get('/getAllUsersByAdmin', admin.getAllUsersByAdmin)
router.get('/CreateWeather/:city', weather.CreateWeather)
router.delete('/DeleateWeather/:id', weather.DeleateWeather)
router.get('/getWeather/:id', weather.getWeather)
router.get('/getWeathersByUserId', weather.getWeathersByUserId)








module.exports = router