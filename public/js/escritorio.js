
// Referencias del HTML
const lblEscritorio= document.querySelector('h1');
const btnAtender= document.querySelector('button');
const alertaDiv= document.querySelector('.alert');
const alertaDivMsj= document.querySelector('.alert span');
const ticketPendientesDiv=document.querySelector('#lblPendientes')

//


const socket = io();
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const escritorio = urlParams.get('escritorio');
const atendiendoSmall=document.querySelector('small');

alertaDiv.style.display='none'
lblEscritorio.innerText=`Escritorio : ${escritorio}`;




socket.on('connect', () => {
    // console.log('Conectado');
    btnAtender.disabled = false;


});


socket.on('tickets-pendientes',(pendientes)=>{
    ticketPendientesDiv.innerText=pendientes;
    if(pendientes!==0){
        alertaDiv.style.display='none';
    }
    

});

socket.on('disconnect', () => {

    btnAtender.disabled = true;

});



// socket.on('ultimo-ticket',(ticket)=>{
//     lblNuevoTicket.innerText=` Ticket ${ticket}`;
// })




btnAtender.addEventListener( 'click', () => {
  
    socket.emit( 'atender-ticker', {escritorio}, ( {ok,msj,ticket} ) => {
     if(!ok){
         alertaDiv.style.display="block";
        alertaDivMsj.textContent=msj;
        atendiendoSmall.innerText='Nadie..'
        return ;
     }
     console.log(ticket)
     alertaDiv.style.display='none';
     atendiendoSmall.innerText=`Ticket : ${ticket.numero}`

    });

});