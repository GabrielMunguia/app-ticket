const TicketControl=require('../models/ticket-control');
const ticketControl= new TicketControl();


const socketController = (socket) => {
    
    console.log('Cliente conectado',  );

    socket.on('disconnect', () => {
       
    });

    socket.emit('ultimo-ticket',ticketControl.ultimo);
   
    socket.emit( 'tickets-pendientes', ticketControl.tickets.length );




    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        const siguiente = ticketControl.siguiente();
        socket.broadcast.emit( 'tickets-pendientes', ticketControl.tickets.length );
        callback( siguiente );
      

    });
  

    socket.on('atender-ticker',({escritorio},callback)=>{
        if(!escritorio){
            return callback({
                ok:false,
                msj:"El escritorio es obligatorio"
            })
        }

        const ticket=ticketControl.atenderTicket(escritorio);
        socket.broadcast.emit( 'estado-actual', ticketControl.ultimos4 );
        socket.emit( 'tickets-pendientes', ticketControl.tickets.length );
        socket.broadcast.emit( 'tickets-pendientes', ticketControl.tickets.length );
        if(!ticket){
            return callback({
                ok:false,
                msj:"Ya no hay mas tickets por atender"
            })
        }

        callback({
            ok:true,
            ticket
        })


       

    })

    socket.emit('estado-actual',ticketControl.toJson.ultimos4)
}



module.exports = {
    socketController
}

