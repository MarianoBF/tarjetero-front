import {CIUDADES, EMPRESAS, CONTACTOS} from "./DatosInicio";
import servicioUbicacion from "../services/Ubicacion_servicio.js";
import servicioEmpresa from "../services/Empresa_servicio.js";
import servicioContacto from "../services/Contacto_servicio.js";
import Button from "react-bootstrap/Button";
import {useRef} from "react";
import excel from "../media/EjemploContactos.xlsx"

function Config() {
  const mensaje = useRef(null);

  const Cargador = () => {
    try {
      CIUDADES.forEach(ciudadEjemplo => {
        const ciudad = {
          region: ciudadEjemplo.region,
          pais: ciudadEjemplo.pais,
          ciudad: ciudadEjemplo.ciudad,
        };
        servicioUbicacion.sumar(ciudad).then(res => console.log(res));
      });
      EMPRESAS.forEach(empresaEjemplo => {
        const ciudad = {
          nombre: empresaEjemplo.nombre,
          pais: empresaEjemplo.pais,
          ciudad: empresaEjemplo.ciudad,
          direccion: empresaEjemplo.direccion,
          email: empresaEjemplo.email,
          telefono: empresaEjemplo.telefono,
        };
        servicioEmpresa.sumar(ciudad).then(res => console.log(res));
      });
      CONTACTOS.forEach(contactoEjemplo => {
        const ciudad = {
          nombre: contactoEjemplo.nombre,
          apellido: contactoEjemplo.apellido,
          direccion: contactoEjemplo.direccion,
          ciudad: contactoEjemplo.ciudad,
          pais: contactoEjemplo.pais,
          region: contactoEjemplo.region,
          email: contactoEjemplo.email,
          empresa: contactoEjemplo.empresa,
          cargo: contactoEjemplo.cargo,
          canalPreferido: contactoEjemplo.canalPreferido,
          interes: contactoEjemplo.interes,
          canales: contactoEjemplo.canales,
        };
        servicioContacto.sumar(ciudad).then(res => console.log(res));
        mensaje.current.innerText = "Se han cargado los datos";
      });
    } catch {
      mensaje.current.innerText = "No se pudieron cargar los datos de ejemplo";
    }
  };

  const Borrador = () => {
    try {
      servicioUbicacion.borrarTodo().then(res => console.log(res));
      servicioEmpresa.borrarTodo().then(res => console.log(res));
      servicioContacto.borrarTodo().then(res => console.log(res));
      mensaje.current.innerText = "Se han borrado todos los datos";
    } catch {
      mensaje.current.innerText = "No se pudieron borrar los datos";
    }
  };

  const CerrarSesion = () => {
    try {
      sessionStorage.removeItem("JWT");
      window.location.assign("/");
    } catch {
      console.log("No se pudo cerrar sesión");
    }
  };

  const descargarModelo = () => {};


  return (
    <div className="centrarContenidos">
      <h1>Configuración</h1>
      <Button variant="warning" onClick={Cargador}>
        Cargar datos de prueba
      </Button>{" "}
      <Button variant="danger" onClick={Borrador}>
        Borrar todos los datos
      </Button>{" "}
      <Button onClick={CerrarSesion}>Cerrar sesión</Button> {" "}
      <a href={excel} download> 
<Button variant="info" onClick={descargarModelo}>
          Bajar .xlsx modelo
        </Button></a>
      <p ref={mensaje} className="mensajeSeparado"></p>
    </div>
  );
}

export default Config;
