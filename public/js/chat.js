const socket = io.connect()
const botonEnviar = document.getElementById('boton-enviar')
const pushearMensaje = () => {
    const nuevoMensaje = {
        nombre: document.getElementById('mail-cliente').value,
        mensaje: document.getElementById('chat').value
    }
    socket.emit('mensaje-nuevo', nuevoMensaje);
    document.getElementById('mail-cliente').value = ''
    document.getElementById('chat').value = ''
    console.log(nuevoMensaje)
    return false
}
botonEnviar.addEventListener('click', (pushearMensaje) )


socket.on('mensajes' , data => {
    renderizarMensajes(data)
})

//renderizar mensajes 
const renderizarMensajes = (mensajes) => {
    const mensajesHTML = mensajes.map((element) => {
        return ( 
            `
                <div>
                    <p>
                        <strong>${element.nombre}</strong>
                        <em>${element.mensaje}</em>
                    </p>
                </div>
            `
        )
    }).join(' ')
    document.getElementById('chat-history').innerHTML = mensajesHTML
}