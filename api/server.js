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
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.options("*",cors())

db.sequelize.sync().then((req)=>{
    var server = app.listen(process.env.PORT || 3000, function () {
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
    Urls.findAll({}).then(function(url) {
        url.forEach(valor=>{
            console.log("Para el sitio "+valor.dataValues.direccion_url)
            console.log("Del usuario "+valor.dataValues.id_usuario)
            axios.get(valor.dataValues.direccion_url)
            .then(function (response) {
                    console.log("El sitio "+ valor.dataValues.direccion_url+ " esta bien");
                    console.log(response.data.code);  
                    //Guardar registro en base de datos
                    Historiales.create({
                        status: response.data.code,
                        id_url: valor.dataValues.direccion_url,
                    }).then((historial)=>{
                        console.log("almacenado")
                    }).catch((error)=>{
                        console.log(error)
                    })
            })
        
            .catch(function (error) {
                    console.log("A este correo va: "+valor.dataValues.id_usuario)
                    mandarCorreo(valor.dataValues.id_usuario,valor.dataValues.direccion_url)
                    Historiales.create({
                        status: 500,
                        id_url: valor.dataValues.direccion_url,
                    }).then((historial)=>{
                        console.log("almacenado")
                    }).catch((error)=>{
                        console.log(error)
                    })
                
    
            })
        })

    })



});



app.get('/', (req, res) => {
  res.send('Hello World!')
});
/* Endpoints Usuarios */
app.post("/usuarios",function(req,res){
    const nombre = req.body.nombre
    const correo = req.body.correo
    const idAuth = req.body.idAuth
    Usuarios.create({
        nombre: nombre,
        correo: correo,
        auth_id: idAuth
    }).then((users)=>{
        res.status(201).json({response:"Creado con éxito"})
    }).catch((error)=>{
        res.status(500).json({Error:error})
    })
});

app.get("/usuarios/:idAuth",function(req,res){
    const idAuth = req.params.idAuth 
    Usuarios.findOne({ where: {auth_id: idAuth} }).then(function(user) {
        if (user != null){
            const resultUser = JSON.stringify(user)
            res.status(200).json({response:resultUser})
        } else {
            res.status(404).json({response:"Usuario no encontrado"})
        }

    })
});

/*Endpoint Urls */ 
app.post("/urls",function(req,res){
    const direccionUrl = req.body.direccionUrl
    const idUser = req.body.idUsuario
    Urls.create({
        direccion_url: direccionUrl,
        id_usuario: idUser,
    }).then((urls)=>{
        res.status(201).json({response:"Creado con éxito"})
    }).catch((error)=>{
        res.status(500).json({Error:error})
    })
});

app.get("/urls/:idUser",function(req,res){
    const idUser = req.params.idUser 
    Urls.findAll({ where: {id_usuario: idUser} }).then(function(url) {
        if (url != null){
            const resultUrl = JSON.stringify(url)
            res.status(200).json({response:resultUrl})
        } else {
            res.status(404).json({response:"Url no encontrado"})
        }

    })
});

/*Endpoint Historiales */ 
app.post("/historial",function(req,res){
    const status = req.body.status
    const idUrl = req.body.idUrl
    Historiales.create({
        status: status,
        id_url: idUrl,
    }).then((historial)=>{
        res.status(201).json({response:"Creado con éxito"})
    }).catch((error)=>{
        res.status(500).json({Error:error})
    })
});

app.get("/historial/:idUrl",function(req,res){
    const idUrl = req.params.idUrl 
    Historiales.findAll({ where: {id_url: idUrl} }).then(function(historial) {
        if (historial != null){
            const resultHistorial = JSON.stringify(historial)
            res.status(200).json({response:resultHistorial})
        } else {
            res.status(404).json({response:"Historial no encontrado"})
        }

    })
});

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

