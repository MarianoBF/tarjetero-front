import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Ubicacion from "./components/Ubicacion";
import Empresas from "./components/Empresas";
import Usuarios from "./components/Usuarios";
import Contactos from "./components/Contactos";
import Configuracion from "./components/Configuracion";
import { Switch, Route, Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <div>
      <Navbar bg="dark" variant="dark" sticky="top" expand="md">
        <Navbar.Brand>
          <Link to={"/"}>/LOGO!/</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Link to={"/contactos"} className="nav-link">
              Contactos
            </Link>
            <Link to={"/usuarios"} className="nav-link">
              Usuarios
            </Link>
            <Link to={"/empresas"} className="nav-link">
              Compañías{" "}
            </Link>
            <Link to={"/ubicacion"} className="nav-link">
              Región/Ciudad{" "}
            </Link>
            <Link to={"/configuracion"} className="nav-link">
              Configuración
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div>
        <Switch>
          <ProtectedRoute exact={true} path="/contactos" component={Contactos} />
          <Route exact path="/usuarios" component={Usuarios} />
          <ProtectedRoute exact={true} path="/empresas" component={Empresas} />
          <ProtectedRoute exact={true} path="/ubicacion" component={Ubicacion} />
          <ProtectedRoute exact={true} path="/configuracion" component={Configuracion} />
          <Route component={Usuarios}/>
        </Switch>
      </div>
    </div>
  );
}

export default App;
