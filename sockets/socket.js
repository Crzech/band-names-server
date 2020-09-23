const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();


// Mensajes de sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands());


    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
    });

    client.on('mensaje', payload => {
        console.log('se escucho el mensaje', payload);
        io.emit('mensaje', {admin: "Nuevo mensaje"});
    });

    client.on('vote-band', payload => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', payload => {
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', payload => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    // client.on('emitir-mensaje', (payload) => {
    //     // io.emit('nuevo-mensaje', payload); // a todos los conectados
    //     client.broadcast.emit('nuevo-mensaje', payload); // a todos menos al que lo emitio
    // })
}); 