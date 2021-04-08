import servicioEmpresa from "../services/Empresa_servicio";
import {useState, useEffect} from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

function Ubicacion() {
  const [lista, setLista] = useState([]);
  const [modoAgregar, setModoAgregar] = useState(false);
  const [modoEditar, setModoEditar] = useState(false);

  useEffect(() => {
    servicioEmpresa
      .listar()
      .then(data => {
        setLista(data.data);
        console.log(data.data);
      })
      .catch(() => console.log("No se pudo traer la informcación"));
  }, []);

  const valorInicial = {
    nombre: "",
    pais: "",
    ciudad: "",
    direccion: "",
    email: "",
    telefono: "",
  };

  const [entrada, setEntrada] = useState(valorInicial);
  const [entradaEditar, setEntradaEditar] = useState(valorInicial);

  const manejarInput = event => {
    const {name, value} = event.target;
    setEntrada({...entrada, [name]: value});
  };

  const manejarInputEdit = event => {
    const {name, value} = event.target;
    setEntradaEditar({...entradaEditar, [name]: value});
  };

  const manejarAgregar = () => {
    setModoAgregar(true);
    setModoEditar(false);
    setEntrada(valorInicial);
  };

  const manejarEditar = (nombre, pais, ciudad, direccion, email, telefono) => {
    setModoEditar(true);
    setModoAgregar(false);
    setEntradaEditar({
      nombre: nombre,
      pais: pais,
      ciudad: ciudad,
      direccion: direccion,
      email: email,
      telefono: telefono,
    });
  };

  const manejarBorrar = nombre => {
    try {
      servicioEmpresa.borrar(nombre);
      console.log(nombre);
    } catch {
      console.log("No se pudo borrar la ubicación");
    } finally {
      window.location.reload();
    }
  };

  const listaEmpresas = lista
    .sort((item1, item2) => (item1.pais > item2.pais ? 1 : -1))
    .map((item, i, lis) => {
      return (
        <tr key={item._id}>
          <td>{item.nombre}</td>
          <td>{item.pais}</td>
          <td>{item.ciudad}</td>
          <td>{item.direccion}</td>
          <td>{item.email}</td>
          <td>{item.telefono}</td>
          <td>
            <p
              onClick={() =>
                manejarEditar(
                  item.nombre,
                  item.pais,
                  item.ciudad,
                  item.direccion,
                  item.email,
                  item.telefono
                )
              }>
              Editar
            </p>
          </td>
          <td>
            <p onClick={() => manejarBorrar(item.nombre)}>Borrar</p>
          </td>
        </tr>
      );
    });

  const editarEmpresa = e => {
    e.preventDefault();
    const data = {
      nombre: entradaEditar.nombre,
      pais: entradaEditar.pais,
      ciudad: entradaEditar.ciudad,
      direccion: entradaEditar.direccion,
      email: entradaEditar.email,
      telefono: entradaEditar.telefono,
    };
    try {
      servicioEmpresa.actualizar(data).then(response => {
        console.log(response.data);
      });
    } catch {
      console.log("No se pudo agregar la empresa");
    } finally {
      // window.location.reload();
    }
  };

  const sumarEmpresa = e => {
    e.preventDefault();
    const data = {
      nombre: entrada.nombre,
      pais: entrada.pais,
      ciudad: entrada.ciudad,
      direccion: entrada.direccion,
      email: entrada.email,
      telefono: entrada.telefono,
    };
    try {
      servicioEmpresa.sumar(data).then(response => {
        console.log(response.data);
      });
    } catch {
      console.log("No se pudo agregar la ubicación");
    } finally {
      window.location.reload();
    }
  };

  return (
    <div>
      <h3>Compañías</h3>

      <button onClick={manejarAgregar}>
        {!modoAgregar ? "Agregar" : "Listar"}
      </button>

      {!modoAgregar && !modoEditar ? (
        <div>
          <Table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>País</th>
                <th>Ciudad</th>
                <th>Dirección</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Editar</th>
                <th>Borrar</th>
              </tr>
            </thead>
            <tbody>{listaEmpresas ? listaEmpresas : "Problemas"}</tbody>
          </Table>
        </div>
      ) : null}
      {modoAgregar ? (
        <div>
          <h3>Agregar Compañía:</h3>
          <Form onSubmit={sumarEmpresa}>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Nombre: </Form.Label>
                <Form.Control
                  type="text"
                  value={entrada.nombre}
                  onChange={manejarInput}
                  name="nombre"
                  required></Form.Control>
                <Form.Label>País: </Form.Label>
                <Form.Control
                  type="text"
                  value={entrada.pais}
                  onChange={manejarInput}
                  name="pais"
                  required></Form.Control>
                <Form.Label>Ciudad: </Form.Label>
                <Form.Control
                  type="text"
                  value={entrada.ciudad}
                  onChange={manejarInput}
                  name="ciudad"
                  required></Form.Control>
                <Form.Label>Dirección: </Form.Label>
                <Form.Control
                  type="text"
                  value={entrada.direccion}
                  onChange={manejarInput}
                  name="direccion"
                  required></Form.Control>
                <Form.Label>Email: </Form.Label>
                <Form.Control
                  type="text"
                  value={entrada.email}
                  onChange={manejarInput}
                  name="email"
                  required></Form.Control>
                <Form.Label>Teléfono: </Form.Label>
                <Form.Control
                  type="text"
                  value={entrada.telefono}
                  onChange={manejarInput}
                  name="telefono"
                  required></Form.Control>
              </Form.Group>
            </Col>
            <Button type="submit">Guardar</Button>
          </Form>
        </div>
      ) : null}
      {modoEditar ? (
        <div>
          <h3>Editar Compañía:</h3>
          <Form onSubmit={editarEmpresa}>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Nombre: </Form.Label>
                <Form.Control
                  type="text"
                  value={entradaEditar.nombre}
                  onChange={manejarInputEdit}
                  name="nombre"
                  required></Form.Control>
                <Form.Label>País: </Form.Label>
                <Form.Control
                  type="text"
                  value={entradaEditar.pais}
                  onChange={manejarInputEdit}
                  name="pais"
                  required></Form.Control>
                <Form.Label>Ciudad: </Form.Label>
                <Form.Control
                  type="text"
                  value={entradaEditar.ciudad}
                  onChange={manejarInputEdit}
                  name="ciudad"
                  required></Form.Control>
                <Form.Label>Dirección: </Form.Label>
                <Form.Control
                  type="text"
                  value={entradaEditar.direccion}
                  onChange={manejarInputEdit}
                  name="direccion"
                  required></Form.Control>
                <Form.Label>Email: </Form.Label>
                <Form.Control
                  type="text"
                  value={entradaEditar.email}
                  onChange={manejarInputEdit}
                  name="email"
                  required></Form.Control>
                <Form.Label>Teléfono: </Form.Label>
                <Form.Control
                  type="text"
                  value={entradaEditar.telefono}
                  onChange={manejarInputEdit}
                  name="telefono"
                  required></Form.Control>
              </Form.Group>
            </Col>
            <Button type="submit">Guardar</Button>
          </Form>
        </div>
      ) : null}
    </div>
  );
}

export default Ubicacion;