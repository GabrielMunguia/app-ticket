
// Referencias del HTML
const lblNuevoTicket= document.querySelector('#lblNuevoTicket');
const btnNuevoTicket= document.querySelector('button');

const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');
    btnNuevoTicket.disabled = false;


});

socket.on('disconnect', () => {

    btnNuevoTicket.disabled = true;

});

socket.on('ultimo-ticket',(ticket)=>{
    lblNuevoTicket.innerText=` Ticket ${ticket}`;
})




btnNuevoTicket.addEventListener( 'click', () => {

 console.log('holaa')
    socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText=ticket;
    });

});