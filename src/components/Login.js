import servicioUsuario from "../services/Usuario_servicio";
import {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import jwt_decode from "jwt-decode";

function Login() {
  const valorInicialLog = {
    email: "",
    password: "",
  };

  const [entradaLog, setEntradaLog] = useState(valorInicialLog);

  const manejarInputLog = event => {
    const {name, value} = event.target;
    setEntradaLog({...entradaLog, [name]: value});
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
        perfil === "Admin"
          ? window.location.assign("/usuarios")
          : window.location.assign("/empresas");
      })
      .catch(error => {
        console.log("No se pudo iniciar sesión");
        console.log(error);
      });
  };

  return (
    <div className="centrarContenidos">
      {
        <div>
          <h1>Loguearse:</h1>
          <Form onSubmit={loguearUsuario}>
            <Col md={6} className="bloqueCentrado">
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
              <Button className="bloqueCentrado" type="submit" size="lg">
                Loguear
              </Button>
            </Col>
          </Form>
        </div>
      }
    </div>
  );
}

export default Login;
