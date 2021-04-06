import servicioEmpresa from "../services/Empresa_servicio";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

function Ubicacion() {
  const [lista, setLista] = useState([]);
  const [modoAgregar, setModoAgregar] = useState(false);

  const cambiarModo = () => {
    setModoAgregar(!modoAgregar);
  };

  useEffect(() => {
    servicioEmpresa
      .listar()
      .then((data) => {
        setLista(data.data);
        console.log(data.data);
      })
      .catch(() => console.log("No se pudo traer la informcación"));
  }, []);

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
        </tr>
      );
    });

  const valorInicial = {
    nombre: "",
    pais: "",
    ciudad: "",
    direccion: "",
    email: "",
    telefono: "",
  };

  const [entrada, setEntrada] = useState(valorInicial);

  const manejarInput = (event) => {
    const { name, value } = event.target;
    setEntrada({ ...entrada, [name]: value });
  };

  const guardarEmpresa = (e) => {
    e.preventDefault();
    const data = {
      nombre: entrada.nombre,
      pais: entrada.pais,
      ciudad: entrada.ciudad,
      direccion: entrada.direccion,
      email: entrada.email,
      telefono: entrada.telefono,
    };
    servicioEmpresa.sumar(data).then((response) => {
      console.log(response.data);
    })
    .catch(() => console.log("No se pudo agregar la empresa"));
  };

  return (
    <div>
      <h3>Empresas</h3>

      <button onClick={cambiarModo}>
        {!modoAgregar ? "Agregar" : "Listar"}
      </button>

      {!modoAgregar ? (
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
              </tr>
            </thead>
            <tbody>{listaEmpresas ? listaEmpresas : "Problemas"}</tbody>
          </Table>
        </div>
      ) : (
        <div>
          <h3>Agregar Empresa:</h3>
          <Form onSubmit={guardarEmpresa}>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Nombre: </Form.Label>
                <Form.Control
                  type="text"
                  value={entrada.nombre}
                  onChange={manejarInput}
                  name="nombre"
                  required
                ></Form.Control>
                <Form.Label>País: </Form.Label>
                <Form.Control
                  type="text"
                  value={entrada.pais}
                  onChange={manejarInput}
                  name="pais"
                  required
                ></Form.Control>
                <Form.Label>Ciudad: </Form.Label>
                <Form.Control
                  type="text"
                  value={entrada.ciudad}
                  onChange={manejarInput}
                  name="ciudad"
                  required
                ></Form.Control>
                <Form.Label>Dirección: </Form.Label>
                <Form.Control
                  type="text"
                  value={entrada.direccion}
                  onChange={manejarInput}
                  name="direccion"
                  required
                ></Form.Control>
                <Form.Label>Email: </Form.Label>
                <Form.Control
                  type="text"
                  value={entrada.email}
                  onChange={manejarInput}
                  name="email"
                  required
                ></Form.Control>
                <Form.Label>Teléfono: </Form.Label>
                <Form.Control
                  type="text"
                  value={entrada.telefono}
                  onChange={manejarInput}
                  name="telefono"
                  required
                ></Form.Control>
              </Form.Group>
            </Col>
            <Button type="submit">Guardar</Button>
          </Form>
        </div>
      )}
    </div>
  );
}

export default Ubicacion;
