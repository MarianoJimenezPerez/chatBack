const express = require ('express');
const { Server: HttpServer} = require('http');
const { Server: IOServer} = require('socket.io');

const app = express();
app.use(express.static( __dirname + '/public'));
app.get('/', (req, res) => {
    res.render("main")
})
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//Arrays 

const mensajes = [];
const productos = [
    {
        title: "Escuadra",
        price: 123.45,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        id: 1
    },
    {
        title: "Calculadora",
        price: 234.56,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
        id: 2
    },
    {
        title: "Globo Terráqueo",
        price: 345.67,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        id: 3
    }
]




let socketGuardado
io.on('connection', (socket) => {
    console.log("conectado");
    socket.emit('mensajes', mensajes)
    socketGuardado = socket
    socket.on('mensaje' , data => {
        mensajes.push({socketId: socket.id, mensaje: data});
        io.sockets.emit('mensajes', mensajes)
    })
})

//handlebars
const handlebars = require('express-handlebars');
app.set("view engine", "hbs")
app.engine("hbs", handlebars({
    extname: 'hbs',
    defaultLayout: 'index',
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials"
}))
httpServer.listen(8080, () => console.log('Server iniciado'));