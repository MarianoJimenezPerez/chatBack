const express = require ('express');
const { Server: HttpServer} = require('http');
const { Server: IOServer} = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const handlebars = require('express-handlebars');

app.use(express.static( __dirname + '/public'));

let socketGuardado
const mensajes = [];
app.get('/', (req, res) => {
    res.render("main")
    /*res.sendFile('index.html', { root: __dirname} )*/
})

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
app.set("view engine", "hbs")
app.engine("hbs", handlebars({
    extname: 'hbs',
    defaultLayout: 'index',
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials"
}))
httpServer.listen(8080, () => console.log('Server iniciado'));