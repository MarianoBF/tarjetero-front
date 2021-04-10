import servicioContacto from "../services/Contacto_servicio";
import {useState, useEffect} from "react";
import Table from "react-bootstrap/Table";
import ContactosBuscador from "./ContactosBuscador";
import ContactosAgregar from "./ContactosAgregar";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function Contactos() {
  const [lista, setLista] = useState([]);
  const [results, setResults] = useState([]);
  const [modoAgregar, setModoAgregar] = useState(false);
  const [modoEditar, setModoEditar] = useState(false);

  const cambiarModo = () => {
    setModoAgregar(!modoAgregar);
  };

  useEffect(() => {
    servicioContacto
      .listar()
      .then(data => {
        setLista(data.data);
        setResults(data.data);
      })
      .catch(() => console.log("No se pudo traer la información"));
  }, []);

  const valorInicial = {
    nombre: "",
    apellido: "",
    empresa: "",
    cargo: "",
    email: "",
    region: "",
    pais: "",
    ciudad: "",
    interes: "",
    canalPreferido: "",
  };

  const [modalCanales, setModalCanales] = useState(false);
  const [contenidosModalCanales, setContenidosModalCanales] = useState([]);
  const manejarCerrar = () => setModalCanales(false);
  const manejarMostrar = item => {
    setModalCanales(true);
    setContenidosModalCanales(item);
  };

  const contenidosMod = contenidosModalCanales.map((item, i) => {
    return (
      <tbody>
        <tr>
          <td>{contenidosModalCanales[i].canal}</td>
          <td>{contenidosModalCanales[i].cuenta}</td>
          <td>{contenidosModalCanales[i].preferencia}</td>
        </tr>
      </tbody>
    );
  });

  const [modalBorrar, setModalBorrar] = useState(false);
  const [contactoParaBorrar, setContactoParaBorrar] = useState("");

  const manejarBorrar = (id, nombre, apellido) => {
    setModalBorrar(true);
    setContactoParaBorrar({id: id, nombre: nombre, apellido: apellido});
  };

  const manejarCerrarBorrar = item => {
    setModalBorrar(false);
  };

  const manejarModalBorrar = () => {
    setModalBorrar(false);
    try {
      servicioContacto.borrar(contactoParaBorrar.id);
    } catch {
      console.log("No se pudo borrar la ubicación");
    } finally {
      window.location.reload();
    }
  };

  const initialCheckboxes = [
    {id: "", checked: "false"},
    {id: "", checked: "false"},
    {id: "", checked: "false"},
    {id: "", checked: "false"},
    {id: "", checked: "false"},
    {id: "", checked: "false"},
    {id: "", checked: "false"},
    {id: "", checked: "false"},
    {id: "", checked: "false"},
    {id: "", checked: "false"},
  ];

  const [checkboxes, setCheckboxes] = useState(initialCheckboxes);
  const [checkboxesActivos, setCheckboxesActivos] = useState(false);

  const manejarCheckbox = (e, id, i) => {
    let nuevosCheckboxes = [...checkboxes];
    nuevosCheckboxes[i].id = id;
    nuevosCheckboxes[i].checked = e.target.checked;
    setCheckboxes(nuevosCheckboxes);
    checkboxes.filter((item)=>item.checked===true).length>0?setCheckboxesActivos(true):setCheckboxesActivos(false)
  };

  const borrarCheckboxes = () =>{
    const borrables = checkboxes.filter((item)=>item.checked===true);
    console.log(borrables)
    try {
      borrables.forEach((item)=>{servicioContacto.borrar(item.id)});
    } catch {
      console.log("No se pudo borrar la ubicación");
    } finally {
      window.location.reload();
    }
  }

  const listaContactos = results
    .sort((item1, item2) => (item1.nombre > item2.nombre ? 1 : -1))
    .map((item, i, lis) => {
      return (
        <tr key={item._id}>
          <td>
            <input
              type="checkbox"
              label=""
              value={checkboxes[i].checked}
              onChange={(e) => manejarCheckbox(e, item._id, i)}
            />
          </td>
          <td>{item.nombre}</td>
          <td>{item.apellido}</td>
          <td>{item.ciudad}</td>
          <td>{item.empresa}</td>
          <td>{item.cargo}</td>
          <td>
            <p onClick={() => manejarMostrar(item.canales)}>
              {item.canalPreferido}
            </p>
          </td>
          <td>{item.interes}</td>
          <td>
            <p onClick={() => manejarEditar(item)}>Editar</p>
          </td>
          <td>
            <p
              onClick={() =>
                manejarBorrar(item._id, item.nombre, item.apellido)
              }>
              Borrar
            </p>
          </td>
        </tr>
      );
    });

  const filtrador = filtro => {
    setResults(
      lista.filter(
        item =>
          item.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
          item.apellido.toLowerCase().includes(filtro.toLowerCase()) ||
          item.ciudad.toLowerCase().includes(filtro.toLowerCase()) ||
          item.empresa.toLowerCase().includes(filtro.toLowerCase()) ||
          item.cargo.toLowerCase().includes(filtro.toLowerCase())
      )
    );
  };

  const [entradaEditar, setEntradaEditar] = useState();

  const manejarEditar = item => {
    setModoEditar(true);
    setModoAgregar(false);
    setEntradaEditar(item);
  };

  const manejarCancelarEdicion = () => {
    setModoEditar(false);
    setModoAgregar(false);
    setEntradaEditar(valorInicial);
  };

  return (
    <div>
      <h3>Contactos</h3>

      {!modoAgregar || modoEditar ? (
        <ContactosBuscador lista={lista} onChange={filtrador} />
      ) : null}

      {!modoAgregar || modoEditar ? (
        <button onClick={cambiarModo}>Agregar</button>
      ) : null}

      {checkboxesActivos ? (
        <button onClick={borrarCheckboxes}>Borrar seleccionados</button>
      ) : null}

      {!modoAgregar && !modoEditar ? (
        <div>
          <Table>
            <thead>
              <tr>
                <th>

                </th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Ciudad</th>
                <th>Empresa</th>
                <th>Cargo</th>
                <th>Canal Preferido</th>
                <th>Interés</th>
                <th>Editar</th>
                <th>Borrar</th>
              </tr>
            </thead>
            <tbody>{listaContactos ? listaContactos : "Problemas"}</tbody>
          </Table>
        </div>
      ) : null}
      {modoAgregar ? (
        <ContactosAgregar
          entrada={valorInicial}
          editar={modoEditar}
          cancelar={manejarCancelarEdicion}
        />
      ) : null}
      {modoEditar ? (
        <ContactosAgregar
          entrada={entradaEditar}
          editar={modoEditar}
          cancelar={manejarCancelarEdicion}
        />
      ) : null}

      {modalCanales && (
        <Modal show={modalCanales} onHide={manejarCerrar}>
          <Modal.Header closeButton>
            <Modal.Title>Canales de contacto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table>
              <thead>
                <tr>
                  <th>Canal</th>
                  <th>Cuenta</th>
                  <th>Preferencia</th>
                </tr>
              </thead>
              {contenidosMod}
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={manejarCerrar}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {modalBorrar && (
        <Modal show={modalBorrar} onHide={manejarCerrarBorrar}>
          <Modal.Header closeButton>
            <Modal.Title>Confirma Borrar la entrada?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              {contactoParaBorrar.nombre + " " + contactoParaBorrar.apellido}
            </p>
            <Button variant="danger" onClick={manejarModalBorrar}>
              Sí, borrar
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={manejarCerrarBorrar}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default Contactos;
