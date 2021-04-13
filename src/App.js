import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Ubicacion from "./components/Ubicacion";
import Empresas from "./components/Empresas";
import Usuarios from "./components/Usuarios";
import Contactos from "./components/Contactos";
import Login from "./components/Login";
import Configuracion from "./components/Configuracion";
import {Switch, Route, Link} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import ProtectedRoute from "./components/ProtectedRoute";
import logo from "./media/logo.svg";
import jwt_decode from "jwt-decode";

function App() {
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
    <div>
      <Navbar bg="primary" variant="light" sticky="top" expand="md">
        <Navbar.Brand>
          <Link to={"/"}>
            <img className="logo" src={logo} alt="logo" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ml-auto">
            <Link to={"/contactos"} className="nav-link bordeNaranja">
              Contactos
            </Link>
            {modoAdmin && (
              <Link to={"/usuarios"} className="nav-link bordeNaranja">
                Usuarios
              </Link>
            )}
            <Link to={"/empresas"} className="nav-link bordeNaranja">
              Compañías{" "}
            </Link>
            <Link to={"/ubicacion"} className="nav-link bordeNaranja">
              Región/Ciudad{" "}
            </Link>
            <Link to={"/configuracion"} className="nav-link bordeNaranja">
              Configuración
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div>
        <Switch>
          <ProtectedRoute
            exact={true}
            path="/contactos"
            component={Contactos}
          />
          <ProtectedRoute exact={true} path="/empresas" component={Empresas} />
          <ProtectedRoute
            exact={true}
            path="/ubicacion"
            component={Ubicacion}
          />
          <ProtectedRoute exact={true} path="/usuarios" component={Usuarios} />
          <ProtectedRoute
            exact={true}
            path="/configuracion"
            component={Configuracion}
          />
          <Route path="login" component={Login} />
          <Route component={Login} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
