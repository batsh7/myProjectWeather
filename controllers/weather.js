const weather = require('../models/weather')
const request = require('request');
const User = require('../models/user');
const jwt = require('jsonwebtoken')



const getWetherInCity = (userId, city) => {
    console.log(userId, city);
    return new Promise((resolve, reject) => {
        let options = {
            method: "GET",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2a21ce3abcda90a458c0303510fffc47`
        }
        request(options, async function (err, res, body) {
            if (err) {
                console.log(err)
                reject(err)
            }
            else {
                console.log('start');
                console.log(JSON.parse(body));
                const newWeather = new weather({
                    date: new Date,
                    city: city,
                    temp: JSON.parse(body).main.temp,
                    wind: JSON.parse(body).wind,
                    userId: userId
                })
                newWeather.date = new Date
                newWeather.city = city
                newWeather.temp = JSON.parse(body).main.temp
                newWeather.wind = JSON.parse(body).wind
                newWeather.userId = userId
                await newWeather.save();
                resolve(newWeather)
            }
        });
    })
}


const CreateWeather = async (req, res) => {
    try {
        console.log(req.id);
        // const user = await User.findById(req.params.id)
        const newWether = await getWetherInCity(req.id, req.params.city)
        const user = await User.findByIdAndUpdate(req.id, { $push: { weathers: newWether._id } }, { new: true })
        console.log(req.id);
        //  console.log(newWether);
        res.status(200).send(newWether)
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err)
    }

}
const DeleateWeather = async (req, res) => {
    try {
        const w = await weather.findByIdAndDelete(req.params.id)
        const user = await User.findByIdAndUpdate(w.userId, { $pull: { weathers: w._id } }, { new: true })
        console.log(`user:${user} weather:${w}`);
        res.status(200).send( w)

    }
    catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

const getWeather = async (req, res) => {
    try {
        const w = await weather.findById(req.params.id)
        res.status(200).send(w)
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error)
    }

}

const getWeathersByUserId = async (req, res) => {
    try {
        const w = await weather.find({ userId: req.id })
        res.status(200).send(w)
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error)
    }

}

module.exports = { CreateWeather, DeleateWeather , getWeather, getWeathersByUserId}