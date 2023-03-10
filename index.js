const express = require('express')
const app = express()
const port = 3000
const nodemailer = require('nodemailer')
require('dotenv').config()
const cors = require('cors')

app.use(cors())
app.use(express.json());

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL, // generated ethereal user
      pass: process.env.PASSWORD, // generated ethereal password
    },
  });

app.get('/', (req,res) => {
  res.send('hola')
})

app.post('/sendmail', async (req, res) => {
    const { name, mail, msg } = req.body
    console.log(await req.body)
    try {
        let info = await transporter.sendMail({
            from: 'Web Portafolio', // sender address
            to: "ricardopsf1@gmail.com", // list of receivers
            subject: "Contacto de tu pagina", // Subject line
            text:`El usuario: ${name} te ha escrito a tu pagina web datos:
            Correo: ${mail}
            Mensaje: ${msg}`, // plain text body
            html: `<h1>Mensaje desde tu Web</h1>
            <h2>Datos:</h2>
            <ul>
            <li>Nombre: ${name}</li>
            <li>Email: ${mail}</li>
            <li>Mensaje: ${msg}</li>
            </ul>`, // html body
          });
          console.log("Message sent: %s", info.messageId);
    
        
    } catch (error) {
        console.error(error)
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})