const express = require('express')
const app = express()
const port = 3000
var db = require("./models")
const cron = require('node-cron');
const cors= require("cors")
const nodemailer = require('nodemailer');
const axios = require('axios');
const transporter = nodemailer.createTransport({
    name:"smtp.gmail.com",
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'oscardevcaposcar@gmail.com',
        pass: 'labichota'
    }
});

const { Usuarios } = require("./models")
const { Urls } = require("./models") 
const { Historiales } = require("./models") 

var corsOptions = {
    origin:"*",
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions));
app.options("*",cors())

db.sequelize.sync().then((req)=>{
    var server = app.listen(process.env.PORT || 5000, function () {
        var port = server.address().port;
        console.log("App now running on port", port);
    });
})

/*Esta lista se tiene que sustituir por datos en la base de datos, dentro del cron llamar base y loop*/

const usuarios = [
    {"nombre": "El oski", "sitiosAsociados": ["https://la.maquina.ninja/","https://google.com","https://google.com.mx"],"correos":["oscarcontrerascap@gmail.com"], "historial":[{"sitio":"algo","status":200}]},
    {"nombre": "El profe", "sitiosAsociados": ["https://la.maquina.ninja/"],"correos":["alejandrofloresm@gmail.com","alejandrofloresm@tec.mx"], "historial":[{"sitio":"algo","status":200}]},
    {"nombre": "El papi", "sitiosAsociados": ["https://google.com"],"correos":["papi@gmail.com"], "historial":[{"sitio":"algo","status":200}]}
]

cron.schedule('*/1 * * * *', () => {
    usuarios.forEach(usuario =>{
        usuario.sitiosAsociados.forEach(sitio =>{
            console.log("Para el sitio: "+sitio)
            axios.get(sitio)
            .then(function (response) {
                    console.log("El sitio "+ sitio+ " esta bien");
                    console.log(response.data.code);  
                    //Guardar registro en base de datos
            })
        
            .catch(function (error) {
                usuario.correos.forEach(correo =>{
                    console.log("A este correo va: "+correo)
                    mandarCorreo(correo,sitio)
                    //Guardar registro en base de datos
                })
    
            })
        })

    })


});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

app.get('/', (req, res) => {
  res.send('Hello World!')
})


function mandarCorreo(correo, sitio){
    const mailData = {
        from: 'oscardevcaposcar@gmail.com',  // sender address
          to: correo,   // list of receivers
          subject: "Sitio caido",
          text: "Hola, tu pagina no esta arriba",
          html: `<h1>${sitio} esta con status 500, revisar</h1>`,
        };

    transporter.sendMail(mailData, (error, info) =>{
        if (error) {
            console.log(error)
        }
        if (info) {
            console.log("Se manda con exito")
        }
    })
}

