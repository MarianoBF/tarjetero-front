import servicioContacto from "../services/Contacto_servicio";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

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
      .catch(() => console.log("No se pudo traer la informcación"));
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

  const valorInicial = {
    nombre: "",
    apellido: "",
    ciudad: "",
    empresa: "",
    cargo: "",
    canalPreferido: "",
    interes: "",
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
      apellido: entrada.apellido,
      ciudad: entrada.ciudad,
      empresa: entrada.empresa,
      cargo: entrada.cargo,
      canalPreferido: entrada.canalPreferido,
      interes: entrada.interes,
    };
    servicioContacto
      .sumar(data)
      .then((response) => {
        console.log(response.data);
      })
      .catch(() => console.log("No se pudo agregar el contacto"));
  };

  return (
    <div>
      <h3>Contactos</h3>

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
                <Form.Label>Apellido: </Form.Label>
                <Form.Control
                  type="text"
                  value={entrada.apellido}
                  onChange={manejarInput}
                  name="apellido"
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
                <Form.Label>Empresa: </Form.Label>
                <Form.Control
                  type="text"
                  value={entrada.empresa}
                  onChange={manejarInput}
                  name="empresa"
                  required
                ></Form.Control>
                <Form.Label>Cargo: </Form.Label>
                <Form.Control
                  type="text"
                  value={entrada.cargo}
                  onChange={manejarInput}
                  name="cargo"
                  required
                ></Form.Control>
                <Form.Label>Canal Preferido: </Form.Label>
                <Form.Control
                  type="text"
                  value={entrada.canalPreferido}
                  onChange={manejarInput}
                  name="canalPreferido"
                  required
                ></Form.Control>
                <Form.Label>Interés: </Form.Label>
                <Form.Control
                  type="text"
                  value={entrada.interes}
                  onChange={manejarInput}
                  name="interes"
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

export default Contactos;
