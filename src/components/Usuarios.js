import servicioUsuario from "../services/Usuario_servicio";
import {useState, useEffect} from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import jwt_decode from "jwt-decode";
import borrar from "../media/borrar.svg";
import editar from "../media/editar.svg";
import UsuarioAgregar from "./UsuariosAgregar.js";

function Usuarios() {
  const [modoRegistro, setModoRegistro] = useState(false);

  const manejarRegistrar = () => {
    setModoRegistro(true);
    setModoEditar(false);
  };

  const valorInicial = {
    nombre: "",
    apellido: "",
    perfil: "",
    email: "",
    password: "",
    confirmarPassword: "",
  };

  const [listadoUsuarios, setListadoUsuarios] = useState([]);

  const manejarBorrar = id => {
    servicioUsuario.borrar(id);
    window.location.reload();
  };

  const [modoEditar, setModoEditar] = useState(false);

  const [entradaEditar, setEntradaEditar] = useState();

  const manejarEditar = item => {
    setModoEditar(true);
    setEntradaEditar(item);
  };

  const manejarCancelarEdicion = () => {
    setModoEditar(false);
    setModoRegistro(false);
    setEntradaEditar("");
  };

  const listadoDeUsuarios = listadoUsuarios
    .sort((item1, item2) => (item1.pais > item2.pais ? 1 : -1))
    .map((item, i, lis) => {
      return (
        <tr key={item._id}>
          <td>{item.nombre}</td>
          <td>{item.apellido}</td>
          <td>{item.email}</td>
          <td>{item.perfil}</td>
          <td>
            <div className="clickeable" onClick={() => manejarEditar(item)}>
              <img className="icon" src={editar} alt="editar" />
            </div>
          </td>

          <td>
            <div className="clickeable" onClick={() => manejarBorrar(item._id)}>
              <img className="icon" src={borrar} alt="borrar" />
            </div>
          </td>
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
      {modoAdmin && !modoRegistro && !modoEditar && (
        <div>
          <div className="tituloCompartido">
            <h3>Usuarios existentes</h3>
            <Button onClick={manejarRegistrar}>Agregar un nuevo usuario</Button>
          </div>
          <Table striped bordered>
            <thead className="fondoNaranja">
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Perfil</th>
                <th>Editar</th>
                <th>Borrar</th>
              </tr>
            </thead>
            <tbody>{listadoDeUsuarios}</tbody>
          </Table>
        </div>
      )}

      {modoAdmin && modoRegistro ? (
        <UsuarioAgregar
          entrada={valorInicial}
          editar={modoEditar}
          cancelar={manejarCancelarEdicion}
        />
      ) : null}
      {modoAdmin && modoEditar ? (
        <UsuarioAgregar
          entrada={entradaEditar}
          editar={modoEditar}
          cancelar={manejarCancelarEdicion}
        />
      ) : null}
    </div>
  );
}

export default Usuarios;
