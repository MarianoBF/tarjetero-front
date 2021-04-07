import servicioUsuario from "../services/Usuario_servicio";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

function Usuarios() {
  const [modoLoguear, setmodoLoguear] = useState(true);

  const cambiarModo = () => {
    setmodoLoguear(!modoLoguear);
  };

  const valorInicial = {
    nombre: "",
    apellido: "",
    perfil: "",
    email: "",
    password: "",
    confirmarPassword: "",
  };

  const valorInicialLog = {
    email: "",
    password: "",
  };

  const [entrada, setEntrada] = useState(valorInicial);

  const [entradaLog, setEntradaLog] = useState(valorInicialLog);

  const manejarInput = (event) => {
    const { name, value } = event.target;
    setEntrada({ ...entrada, [name]: value });
  };

  const manejarInputLog = (event) => {
    const { name, value } = event.target;
    setEntradaLog({ ...entradaLog, [name]: value });
  };

  const crearUsuario = (e) => {
    e.preventDefault();
    if (entrada.password !== entrada.confirmarPassword) {
      return alert("Los password no coinciden!");
    }
    const data = {
      nombre: entrada.nombre,
      apellido: entrada.apellido,
      email: entrada.email,
      password: entrada.password,
      perfil: entrada.perfil,
    };
    servicioUsuario
      .sumar(data)
      .then((response) => {
        console.log(response.data);
      })
      .catch(() => console.log("No se pudo agregar el usuario"));
  };

  const loguearUsuario = (e) => {
    e.preventDefault();
    const data = {
      email: entradaLog.email,
      password: entradaLog.password,
    };
    console.log(data);
    servicioUsuario
      .loguear(data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log("No se pudo iniciar sesión");
        console.log(error);
      });
  };

  return (
    <div>
      <h3>Región / Ciudad</h3>

      <button onClick={cambiarModo}>
        {!modoLoguear ? "Loguearse" : "Registrarse"}
      </button>

      {!modoLoguear ? (
        <div>
          <h3>Formulario de registro</h3>
          <Form onSubmit={crearUsuario}>
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
                <Form.Label>Email: </Form.Label>
                <Form.Control
                  type="text"
                  value={entrada.email}
                  onChange={manejarInput}
                  name="email"
                  required
                ></Form.Control>
                <Form.Label>Password: </Form.Label>
                <Form.Control
                  type="password"
                  value={entrada.password}
                  onChange={manejarInput}
                  name="password"
                  autoComplete="new-password"
                  required
                ></Form.Control>
                <Form.Label>Confirmar Password: </Form.Label>
                <Form.Control
                  type="password"
                  value={entrada.confirmarPassword}
                  onChange={manejarInput}
                  name="confirmarPassword"
                  required
                ></Form.Control>
                <Form.Label>Perfil: </Form.Label>
                <Form.Control
                  as="select"
                  value={entrada.perfil}
                  onChange={manejarInput}
                  name="perfil"
                  required
                >
                  <option></option>
                  <option>Básico</option>
                  <option>Admin</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Button type="submit">Registro</Button>
          </Form>
        </div>
      ) : (
        <div>
          <h3>Loguearse:</h3>
          <Form onSubmit={loguearUsuario}>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Email: </Form.Label>
                <Form.Control
                  type="text"
                  value={entradaLog.email}
                  onChange={manejarInputLog}
                  name="email"
                  required
                ></Form.Control>
                <Form.Label>Password: </Form.Label>
                <Form.Control
                  type="password"
                  value={entradaLog.password}
                  onChange={manejarInputLog}
                  name="password"
                  required
                ></Form.Control>
              </Form.Group>
            </Col>
            <Button type="submit">Loguear</Button>
          </Form>
        </div>
      )}
    </div>
  );
}

export default Usuarios;
