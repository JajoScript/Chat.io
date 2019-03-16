//constantes globales.
const path = require('path');
const express = require('express');
const app = express();

const SocketIO = require('socket.io');

//configuracion.
app.set('port', process.env.PORT || 3000); //toma un puerto definido o por defecto el puerto 3000.

//archivos estaticos.
app.use(express.static(path.join(__dirname, 'public'))); //enviara informacion a la carpeta public.

//inicia el servidor.
const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});

//webSockets 
const io = SocketIO(server);

io.on('connection' , (socket) => {
    console.log('socket connection opened', socket.id);

    socket.on('chat:message', function(data) {
        io.sockets.emit('chat:message', data);
    });

    socket.on('chat:typing', function(data) {
        socket.broadcast.emit('chat:typing', data);
    });
});



