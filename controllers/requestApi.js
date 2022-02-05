const nodemailer = require('nodemailer');

const requesaApi = (city) => {
    console.log('enter');
    return new Promise((resolve, reject) => {
        let options = {
            method: "GET",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2a21ce3abcda90a458c0303510fffc47`
        }
        request(options, function (err, res, body) {
            if (err) {
                reject(err)
            }
            else {
                console.log('sucss');

                console.log(body);
                resolve(body)


            }
            //json.parse
        });
    })
}
const sendEmail = (email, name) => {
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'batsheva8180@gmail.com',
                pass: 'SH0533109495'
            }
        });

        var mailOptions = {
            from: 'noreply@gmail.com',
            to: email,
            subject: 'wellcome',
            text: `hello ${name}`
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log("error send mail");
                reject(error);
            } else {
                console.log("send!!!!");
                resolve('Email sent: ');
                // resolve('Email sent: ' + info.response);
            }
        });
    })
}

module.exports = { requesaApi, sendEmail }