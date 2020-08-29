class Users {

    cosntructor() {
        this.personas = [];
    }

    agregarPersona(is, nombre){

        let persona = {
            id,
            persona
        }

        this.personas.push(persona);
        return this.personas;
    }

    getPersona(id){

        let persona = this.personas.filter(persona => {
            return persona.id === id
        })[0]

        return persona;
    }

    getPersonas(){
        return this.personas;
    }

    GerPersonasPorSalas(sala){
        // ....
    }

    borrarPersona(id){

        let personaBorrada = getPersona(id)

        this.personas = this.personas.filter( persona => {
            return persona.id != id
        })

        return personaBorrada;
    }

}


module.exports = {
    Users
}