import { CIUDADES, EMPRESAS, CONTACTOS } from "./DatosInicio";
import servicioUbicacion from "../services/Ubicacion_servicio.js";
import servicioEmpresa from "../services/Empresa_servicio.js";
import servicioContacto from "../services/Contacto_servicio.js";

const Cargador = () => {
  try {
    CIUDADES.forEach((ciudadEjemplo) => {
      const ciudad = {
        region: ciudadEjemplo.region,
        pais: ciudadEjemplo.pais,
        ciudad: ciudadEjemplo.ciudad,
      };
      servicioUbicacion.sumar(ciudad).then((res) => console.log(res));
    });
    EMPRESAS.forEach((empresaEjemplo) => {
      const ciudad = {
        nombre: empresaEjemplo.nombre,
        pais: empresaEjemplo.pais,
        ciudad: empresaEjemplo.ciudad,
        direccion: empresaEjemplo.direccion,
        email: empresaEjemplo.email,
        telefono: empresaEjemplo.telefono,
      };
      servicioEmpresa.sumar(ciudad).then((res) => console.log(res));
    });
    CONTACTOS.forEach((contactoEjemplo) => {
      const ciudad = {
        nombre: contactoEjemplo.nombre,
        apellido: contactoEjemplo.apellido,
        ciudad: contactoEjemplo.ciudad,
        empresa: contactoEjemplo.empresa,
        cargo: contactoEjemplo.cargo,
        canalPreferido: contactoEjemplo.canalPreferido,
        interes: contactoEjemplo.interes,
      };
      servicioContacto.sumar(ciudad).then((res) => console.log(res));
    });
  } catch {
    alert("No se pudieron cargar los datos de ejemplo");
  }
};

const Borrador = () => {
  try {
    servicioUbicacion.borrarTodo().then((res) => console.log(res));
    servicioEmpresa.borrarTodo().then((res) => console.log(res));
    servicioContacto.borrarTodo().then((res) => console.log(res));
  } catch {
    alert("No se pudieron borrar los datos");
  }
};

function Config() {
  return (
    <div>
      <h3>Configuración</h3>

      <button onClick={Cargador}>Cargar datos de prueba</button>

      <button onClick={Borrador}>Borrar todos los datos</button>
    </div>
  );
}

export default Config;
