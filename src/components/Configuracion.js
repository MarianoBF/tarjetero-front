import { CIUDADES, EMPRESAS, CONTACTOS } from "./DatosInicio"
import serviCiudad from "../services/Ubicacion_servicio.js"


const Cargador = () => {
    try {
    CIUDADES.forEach((ciudadEjemplo)=> {
        const ciudad = {
            region: ciudadEjemplo.region, 
            pais: ciudadEjemplo.pais,
            ciudad: ciudadEjemplo.ciudad,
        }
        serviCiudad.create(ciudad)
        .then((res)=>console.log(res))

    })
    EMPRESAS.forEach((empresaEjemplo)=> {
        const ciudad = {
            nombre: empresaEjemplo.nombre, 
            pais: empresaEjemplo.pais,
            ciudad: empresaEjemplo.ciudad,
            direccion: empresaEjemplo.direccion,
            email: empresaEjemplo.email,
            telefono: empresaEjemplo.telefono
        }
        serviCiudad.create(ciudad)
        .then((res)=>console.log(res))
    })
    CONTACTOS.forEach((contactoEjemplo)=> {
        const ciudad = {
            nombre: contactoEjemplo.nombre, 
            apellido: contactoEjemplo.apellido,
            ciudad: contactoEjemplo.ciudad,
            empresa: contactoEjemplo.empresa,
            cargo: contactoEjemplo.cargo,
            canalPreferido: contactoEjemplo.canalPreferido,
            interes: contactoEjemplo.interes,
        }
        serviCiudad.create(ciudad)
        .then((res)=>console.log(res))
    })
} catch {
    alert("No se pudieron cargar los datos de ejemplo")
}
}

function Config() {
    return(
       <div>
   
        <h3>Configuración</h3>

        <button onClick={Cargador}>Cargar datos de prueba</button>


       </div>
   
    )
   }
   
   export default Config;