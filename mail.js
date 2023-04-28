const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
require("dotenv").config();

//mail prueba
//const mailer = require('../../mail');
//mailer.sendMail('mail@mail.com','titulo',"cuerpo del mensaje");

module.exports = {
    sendMail: function consulta(email,subject,text){
        const oauth2Client = new OAuth2(
            process.env.ID_CLIENTE,
            process.env.SECRET_CLIENTE,
            "https://developers.google.com/oauthplayground",
        );

        oauth2Client.setCredentials({
            refresh_token: process.env.REFRESH_TOKEN,
            tls: {
                rejectUnauthorized: false
            }
        });

        oauth2Client.getAccessToken((err, token) => {
            if(err){
                return console.log(err);
            }
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: "OAuth2",
                    user: process.env.USER,
                    pass: process.env.PASSWORD,
                    clientId: process.env.ID_CLIENTE,
                    clientSecret: process.env.SECRET_CLIENTE,
                    refreshToken: process.env.REFRESH_TOKEN,
                    accessToken: token,
                }
            });

            const mailOptions = {
                from: process.env.USER,
                to: email,
                subject: subject,
                text: text,
            };
            
            transporter.sendMail(mailOptions, function(error, info){
                if (error){
                    console.log(error);
                }
                else {
                    console.log('Email enviado: '+ info.response);
                }
            });
        });
    }
}
