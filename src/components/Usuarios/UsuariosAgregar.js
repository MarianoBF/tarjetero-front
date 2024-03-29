import UsuarioService from "../../services/UsuarioService";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

function UsuariosAgregar(props) {
  const [entrada, setEntrada] = useState(props.entrada);

  const manejarInput = (event) => {
    const { name, value } = event.target;
    setEntrada({ ...entrada, [name]: value });
  };

  const guardarUsuario = (e) => {
    e.preventDefault();
    if (!props.editar) {
      if (entrada.password !== entrada.confirmarPassword) {
        return alert("Los password no coinciden!");
      }
    }
    const data = {
      nombre: entrada.nombre,
      apellido: entrada.apellido,
      email: entrada.email,
      password: entrada.password,
      perfil: entrada.perfil,
    };
    if (!props.editar) {
      UsuarioService
        .sumar(data)
        .then((response) => {
          console.log(response.data);
          alert("Usuario creado con éxito!");
          window.location.reload();
        })
        .catch(() => console.log("No se pudo agregar el usuario"));
    } else {
      UsuarioService
        .actualizar(entrada._id, data)
        .then((response) => {
          console.log(response.data);
          alert("Usuario actualizado con éxito!");
          window.location.reload();
        })
        .catch(() => console.log("No se pudo agregar el usuario"));
    }
  };

  return (
    <div className="centrarContenidos">
      <div>
        {!props.editar ? (
          <h1>Formulario de registro</h1>
        ) : (
          <h1>Editar Usuario</h1>
        )}
        <Form onSubmit={guardarUsuario}>
          <Col className="bloqueCentrado" md={6}>
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
              ></Form.Control>{" "}
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
            <Button className="bloqueCentrado" type="submit" size="lg">
              {!props.editar ? "Crear Usuario" : "Actualizar Usuario"}
            </Button>
            <hr />
            <Button
              className="bloqueCentrado"
              onClick={props.cancelar}
              variant="danger"
            >
              Cancelar
            </Button>
          </Col>
        </Form>
      </div>
    </div>
  );
}

export default UsuariosAgregar;
