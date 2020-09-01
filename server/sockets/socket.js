const { io } = require('../server');
const { Users } = require('../classes/users')
const { crearMensaje } = require('../utilidades/utilidades')

const usuarios = new Users();

io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {


        if( !data.nombre || !data.sala){
            return callback({
                error: true,
                mensaje: 'El nombre/sala es necesario'
            })
        }

        client.join(data.sala)

        let personas = usuarios.agregarPersona( client.id, data.nombre, data.sala )

        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSalas(data.sala))

        callback ( personas )

    })

    client.on('crearMensaje', (data) => {

        let persona = usuarios.getPersona(client.id)

        let mensaje = crearMensaje( persona.nombre, data.mensaje )

        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje)

    })
    
    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona( client.id )
        // console.log(personaBorrada)
        // console.log(crearMensaje(personaBorrada))

        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salió`))
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSalas(personaBorrada.sala))


    })

    // Mensajes privados
    client.on('mensajePrivado', data => {

        let persona = usuarios.getPersona(client.id)

        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje))

    })

});