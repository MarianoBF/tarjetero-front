import { CIUDADES } from "./DatosInicio"
import serviCiudad from "../services/serviCiudad_servicio.js"


const Cargador = () => {
    console.log("aa")
    CIUDADES.forEach((ciudadEjemplo)=> {
        const ciudad = {
            region: ciudadEjemplo.region, 
            pais: ciudadEjemplo.pais,
            ciudad: ciudadEjemplo.ciudad,
        }
        serviCiudad.create(ciudad)
        .then((res)=>console.log(res))

    })
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