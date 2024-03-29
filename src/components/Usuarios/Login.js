import UsuarioService from "../../services/UsuarioService";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import jwt_decode from "jwt-decode";
import Alert from "react-bootstrap/Alert";

function Login() {
  useEffect(() => {
    try {
      let token = JSON.parse(sessionStorage.getItem("JWT"));
      token = jwt_decode(token);
      if (token.exp > new Date().getTime() / 1000) {
        window.location.assign("/#/contactos");
      }
    } catch {
      console.log("Debe loguearse");
    }
  }, []);

  const valorInicialLog = {
    email: "",
    password: "",
  };

  const [entradaLog, setEntradaLog] = useState(valorInicialLog);

  const manejarInputLog = (event) => {
    const { name, value } = event.target;
    setEntradaLog({ ...entradaLog, [name]: value });
  };

  const [show, setShow] = useState(false);

  const loguearUsuario = (e) => {
    e.preventDefault();
    const data = {
      email: entradaLog.email,
      password: entradaLog.password,
    };
    UsuarioService
      .loguear(data)
      .then((response) => {
        console.log(response);
        let token = response.data;
        sessionStorage.setItem("JWT", JSON.stringify(token));
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        setShow(true);
      });
  };

  return (
    <div className="centrarContenidos">
      {
        <div>
        {show && (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Novedades</Alert.Heading>
          <p>{"Datos incorrectos, reintente"}</p>
        </Alert>
      )}
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
