import servicioContacto from "../services/Contacto_servicio";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import ContactosBuscador from "./ContactosBuscador";
import ContactosAgregar from "./ContactosAgregar";


function Contactos() {
  const [lista, setLista] = useState([]);
  const [modoAgregar, setModoAgregar] = useState(false);

  const cambiarModo = () => {
    setModoAgregar(!modoAgregar);
  };

  useEffect(() => {
    servicioContacto
      .listar()
      .then((data) => {
        setLista(data.data);
        console.log(data.data);
      })
      .catch(() => console.log("No se pudo traer la información"));
  }, []);



  const listaContactos = lista
    .sort((item1, item2) => (item1.nombre > item2.nombre ? 1 : -1))
    .map((item, i, lis) => {
      return (
        <tr key={item._id}>
          <td>{item.nombre}</td>
          <td>{item.apellido}</td>
          <td>{item.ciudad}</td>
          <td>{item.empresa}</td>
          <td>{item.cargo}</td>
          <td>{item.canalPreferido}</td>
          <td>{item.interes}</td>
        </tr>
      );
    });

  return (
    <div>
      <h3>Contactos</h3>

      <ContactosBuscador lista={lista}/>

      <button onClick={cambiarModo}>
        {!modoAgregar ? "Agregar" : "Listar"}
      </button>

      {!modoAgregar ? (
        <div>
          <Table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Ciudad</th>
                <th>Empresa</th>
                <th>Cargo</th>
                <th>Canal Preferido</th>
                <th>Interés</th>
              </tr>
            </thead>
            <tbody>{listaContactos ? listaContactos : "Problemas"}</tbody>
          </Table>
        </div>
      ) : <ContactosAgregar />}
    </div>
  );
}

export default Contactos;
