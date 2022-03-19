import { CIUDADES, EMPRESAS, CONTACTOS } from "./DatosInicio";
import servicioUbicacion from "../services/Ubicacion_servicio.js";
import servicioEmpresa from "../services/Empresa_servicio.js";
import servicioContacto from "../services/Contacto_servicio.js";

import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import { useState } from "react";
import excel from "../media/EjemploContactos.xlsx";

function Config() {
  const [show, setShow] = useState(true);
  const [alertMessage, setAlertMessage] = useState(true);
  const [alertType, setAlertType] = useState(true);

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
        servicioContacto.sumar(ciudad).then((res) => console.log(res));
        setAlertMessage("Se han cargado los datos");
        setAlertType("success")
        setShow(true)
      });
    } catch {
      setAlertMessage("No se pudieron cargar los datos de ejemplo");
      setAlertType("danger")
      setShow(true)
    }
  };

  const Borrador = () => {
    try {
      servicioUbicacion.borrarTodo().then((res) => console.log(res));
      servicioEmpresa.borrarTodo().then((res) => {
        console.log(res);
        console.log(res.data.ok);
      });
      servicioContacto.borrarTodo().then((res) => console.log(res));
      setAlertMessage("Se han borrado todos los datos");
      setAlertType("success")
      setShow(true)
    } catch {
      setAlertMessage("No se pudieron borrar los datos");
      setAlertType("danger")
      setShow(true)
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
      {show &&
      <Alert variant={alertType} onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Novedades</Alert.Heading>
        <p>
          {alertMessage}
        </p>
      </Alert>}
      <Button variant="warning" onClick={Cargador}>
        Cargar datos de prueba
      </Button>{" "}
      <Button variant="danger" onClick={Borrador}>
        Borrar todos los datos
      </Button>{" "}
      <Button onClick={CerrarSesion}>Cerrar sesión</Button>{" "}
      <a href={excel} download>
        <Button variant="info" onClick={descargarModelo}>
          Bajar .xlsx modelo para importar archivos
        </Button>
      </a>
    </div>
  );
}

export default Config;
