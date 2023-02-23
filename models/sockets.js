const BandList = require("./band-list");


class Sockets {

    constructor( io ) {

        this.io = io;

        this.bandList = new BandList();

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

            console.log('Cliente conectado');

            // Emitir al cliente conectado todas las bandas actuales
            socket.emit('current-bands', this.bandList.getBands());

            // Votar por la banda
            socket.on('votar-banda', (id) => {
                this.bandList.increaseVotes(id);
                this.io.emit('current-bands', this.bandList.getBands());
            })

            // Eliminar banda
            socket.on('delete-band', (id) => {
                this.bandList.removeBands(id);
                this.io.emit('current-bands', this.bandList.getBands());
            })
            
            // Cambiar nombre de banda
            socket.on('change-band-name', ({id, name}) => {
                this.bandList.changeName(id, name);
                this.io.emit('current-bands', this.bandList.getBands());
            })

            // Añadir nueva banda
            socket.on('add-band', ({name}) => {
                this.bandList.addBand(name);
                this.io.emit('current-bands', this.bandList.getBands());
            })
        
        });
    }


}


module.exports = Sockets;