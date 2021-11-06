const socket = io()
const chat = document.getElementById('chat');
const botonEnviar = document.getElementById('boton-enviar');
botonEnviar.addEventListener('click', (e) => {
    e.preventDefault()
    socket.emit('mensaje', chat.value);
})

socket.on('mensajes' , data => {
    let mailCliente = document.getElementById('mail-cliente').value
    const mensajesHTML = data
        .map(msj => `Nombre: ${mailCliente} -> Mensaje : ${msj.mensaje}` )
        .join('<br>')
    const chatHistory = document.getElementById('chat-history');
    chatHistory.innerHTML = mensajesHTML;
})