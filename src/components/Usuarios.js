import servicioUsuario from "../services/Usuario_servicio";
import {useState, useEffect} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import jwt_decode from "jwt-decode";

function Usuarios() {
  const [modoLoguear, setModoLoguear] = useState(true);

  const cambiarModo = () => {
    setModoLoguear(!modoLoguear);
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

  const manejarInput = event => {
    const {name, value} = event.target;
    setEntrada({...entrada, [name]: value});
  };

  const manejarInputLog = event => {
    const {name, value} = event.target;
    setEntradaLog({...entradaLog, [name]: value});
  };

  const crearUsuario = e => {
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
      .then(response => {
        console.log(response.data);
      })
      .catch(() => console.log("No se pudo agregar el usuario"));
  };

  const loguearUsuario = e => {
    e.preventDefault();
    const data = {
      email: entradaLog.email,
      password: entradaLog.password,
    };
    servicioUsuario
      .loguear(data)
      .then(response => {
        let token = response.data;
        sessionStorage.setItem("JWT", JSON.stringify(token));
        let perfil = jwt_decode(token).perfil;
        console.log(perfil);
        perfil === "Admin"
          ? setModoAutorizado(true)
          : window.location.assign("/empresas");
      })
      .catch(error => {
        console.log("No se pudo iniciar sesión");
        console.log(error);
      });
  };

  const [listadoUsuarios, setListadoUsuarios] = useState([]);

  const listadoDeUsuarios = listadoUsuarios
    .sort((item1, item2) => (item1.pais > item2.pais ? 1 : -1))
    .map((item, i, lis) => {
      return (
        <tr key={item._id}>
          <td>{item.nombre}</td>
          <td>{item.apellido}</td>
          <td>{item.email}</td>
          <td>{item.perfil}</td>
          {/* <td>
            <div className="centrarContenidos"
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
              <img className="icon" src={editar} alt="editar" />
            </div>
          </td> */}

          {/* <td>
            <div className="centrarContenidos" onClick={() => manejarBorrar(item.nombre)}><img className="icon" src={borrar} alt="borrar" /></div>
          </td> */}
        </tr>
      );
    });

  useEffect(() => {
    servicioUsuario
      .listar()
      .then(data => {
        setListadoUsuarios(data.data);
      })
      .catch(() => console.log("No se pudo traer la información"));
  }, []);

  const tratarAutorizar = sessionStorage.getItem("JWT")
    ? jwt_decode(JSON.parse(sessionStorage.getItem("JWT"))).exp >
      new Date().getTime() / 1000
    : false;

  const [modoAutorizado, setModoAutorizado] = useState(tratarAutorizar);

  return (
    <div>
      <button onClick={cambiarModo}>
        {!modoAutorizado ? "Loguearse" : "Registrarse"}
      </button>

      {modoAutorizado && (
        <div>
          <h3>Los usuarios existentes son</h3>
          <Table>
            <thead className="fondoNaranja">
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Perfil</th>
              </tr>
            </thead>
            <tbody>{listadoDeUsuarios}</tbody>
          </Table>
        </div>
      )}
      {!modoAutorizado && !modoLoguear ? (
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
                  required></Form.Control>
                <Form.Label>Apellido: </Form.Label>
                <Form.Control
                  type="text"
                  value={entrada.apellido}
                  onChange={manejarInput}
                  name="apellido"
                  required></Form.Control>
                <Form.Label>Email: </Form.Label>
                <Form.Control
                  type="text"
                  value={entrada.email}
                  onChange={manejarInput}
                  name="email"
                  required></Form.Control>
                <Form.Label>Password: </Form.Label>
                <Form.Control
                  type="password"
                  value={entrada.password}
                  onChange={manejarInput}
                  name="password"
                  autoComplete="new-password"
                  required></Form.Control>
                <Form.Label>Confirmar Password: </Form.Label>
                <Form.Control
                  type="password"
                  value={entrada.confirmarPassword}
                  onChange={manejarInput}
                  name="confirmarPassword"
                  required></Form.Control>
                <Form.Label>Perfil: </Form.Label>
                <Form.Control
                  as="select"
                  value={entrada.perfil}
                  onChange={manejarInput}
                  name="perfil"
                  required>
                  <option></option>
                  <option>Básico</option>
                  <option>Admin</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Button type="submit">Registro</Button>
          </Form>
        </div>
      ) : null}
      {!modoAutorizado && modoLoguear ? (
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
                  required></Form.Control>
                <Form.Label>Password: </Form.Label>
                <Form.Control
                  type="password"
                  value={entradaLog.password}
                  onChange={manejarInputLog}
                  name="password"
                  required></Form.Control>
              </Form.Group>
            </Col>
            <Button type="submit">Loguear</Button>
          </Form>
        </div>
      ) : null}
    </div>
  );
}

export default Usuarios;
