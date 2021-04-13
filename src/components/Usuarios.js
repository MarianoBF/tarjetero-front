import servicioUsuario from "../services/Usuario_servicio";
import {useState, useEffect} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import jwt_decode from "jwt-decode";

function Usuarios() {
  const [modoRegistro, setModoRegistro] = useState(false);

  const cambiarModo = () => {
    setModoRegistro(!modoRegistro);
  };

  const valorInicial = {
    nombre: "",
    apellido: "",
    perfil: "",
    email: "",
    password: "",
    confirmarPassword: "",
  };

  const [entrada, setEntrada] = useState(valorInicial);

  const manejarInput = event => {
    const {name, value} = event.target;
    setEntrada({...entrada, [name]: value});
  };

  const manejarCancelar = () => {
    setEntrada();
    setModoRegistro(false);
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
        alert("Usuario creado con éxito!");
        window.location.reload();
      })
      .catch(() => console.log("No se pudo agregar el usuario"));
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

  const chequearAdmin = () => {
    try {
      let token = JSON.parse(sessionStorage.getItem("JWT"));
      token = jwt_decode(token);
      if (token.exp > new Date().getTime() / 1000 && token.perfil === "Admin") {
        return true;
      } else {
        return false;
      }
    } catch {
      return false;
    }
  };

  const modoAdmin = chequearAdmin();

  return (
    <div className="centrarContenidos">
      {modoAdmin && !modoRegistro && (
        <div>
          <div className="tituloCompartido">
            <h3>Usuarios existentes</h3>
            <Button onClick={cambiarModo}>Agregar un nuevo usuario</Button>
          </div>
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
      {modoAdmin && modoRegistro ? (
        <div>
          <h3>Formulario de registro</h3>
          <Form onSubmit={crearUsuario}>
            <Col className="bloqueCentrado" md={6}>
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
              <Button className="bloqueCentrado" type="submit" size="lg">
                Crear Usuario
              </Button>
              <hr />
              <Button
                className="bloqueCentrado"
                onClick={manejarCancelar}
                variant="danger">
                Cancelar
              </Button>
            </Col>
          </Form>
        </div>
      ) : null}
    </div>
  );
}

export default Usuarios;
