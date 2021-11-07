const socket = io.connect()
const botonEnviar = document.getElementById('boton-enviar')

//funcion para pushear un mensaje en el chat
const pushearMensaje = () => {
    const nuevoMensaje = {
        nombre: document.getElementById('mail-cliente').value,
        mensaje: document.getElementById('chat').value
    }
    socket.emit('mensaje-nuevo', nuevoMensaje);
    document.getElementById('mail-cliente').value = ''
    document.getElementById('chat').value = ''
    return false
}
botonEnviar.addEventListener('click', (pushearMensaje) )

//funcion para pushear un producto
const enviarProducto = document.getElementById('enviar-producto')
const pushearProducto = () => {
    const nuevoProducto = {
        title: document.getElementById('title-producto').value,
        price: document.getElementById('price-producto').value,
        thumbnail: document.getElementById('thumbnail-producto').value
    }
    socket.emit('producto-nuevo', nuevoProducto);
    document.getElementById('title-producto').value = ''
    document.getElementById('price-producto').value = ''
    document.getElementById('thumbnail-producto').value = ''
    return false
}
enviarProducto.addEventListener('click', (pushearProducto) )


socket.on('mensajes' , data => {
    renderizarMensajes(data)
})
socket.on('actualizar-listado-productos' , data => {
    renderizarProductos(data)
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
//renderizar productos
const renderizarProductos = (productos) => {
    const productosHTML = productos.map((element) => {
        return ( 
            `
                <tr>
                    <th scope="row" class="text-center">${element.id}</th>
                    <td class="text-center">${element.title}</td>
                    <td class="text-center">${element.price}</td>
                    <td class="text-center"><img src="${element.thumbnail}"></img></td>
                </tr>
            `
        )
    }).join(' ')
    document.getElementById('tabla-productos').innerHTML = productosHTML
}