import UbicacionService from "../services/UbicacionService";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import borrar from "../assets/borrar.svg";
import editar from "../assets/editar.svg";

function Ubicacion() {
  const [lista, setLista] = useState([]);
  const [modoAgregar, setModoAgregar] = useState(false);
  const [modoEditar, setModoEditar] = useState(false);

  useEffect(() => {
    UbicacionService
      .listar()
      .then((data) => {
        setLista(data.data);
      })
      .catch(() => console.log("No se pudo traer la información"));
  }, []);

  const valorInicial = {
    region: "",
    pais: "",
    ciudad: "",
  };

  const [entrada, setEntrada] = useState(valorInicial);
  const [entradaEditar, setEntradaEditar] = useState(valorInicial);

  const manejarInput = (event) => {
    const { name, value } = event.target;
    setEntrada({ ...entrada, [name]: value });
  };

  const manejarInputEdit = (event) => {
    const { name, value } = event.target;
    setEntradaEditar({ ...entradaEditar, [name]: value });
  };

  const manejarAgregar = () => {
    setModoAgregar(true);
    setModoEditar(false);
    setEntrada(valorInicial);
  };

  const manejarEditar = (region, pais, ciudad) => {
    setModoEditar(true);
    setModoAgregar(false);
    setEntradaEditar({
      region: region,
      pais: pais,
      ciudad: ciudad,
    });
  };

  const manejarBorrar = (ciudad) => {
    try {
      UbicacionService.borrar(ciudad);
    } catch {
      console.log("No se pudo borrar la ubicación");
    } finally {
      window.location.reload();
    }
  };

  const manejarCancelar = () => {
    setEntrada();
    setModoEditar(false);
    setModoAgregar(false);
  };

  const editarUbicacion = (e) => {
    e.preventDefault();
    const data = {
      region: entradaEditar.region,
      pais: entradaEditar.pais,
      ciudad: entradaEditar.ciudad,
    };
    try {
      UbicacionService
        .actualizar(data)
        .then((response) => {
          console.log(response.data);
        })
        .catch(() => console.log("No se pudo agregar la ubicación"));
    } catch {
      console.log("No se pudo agregar la ubicación");
    } finally {
      window.location.reload();
    }
  };

  const sumarUbicacion = (e) => {
    e.preventDefault();
    const data = {
      region: entrada.region,
      pais: entrada.pais,
      ciudad: entrada.ciudad,
    };
    try {
      UbicacionService.sumar(data).then((response) => {
        console.log(response.data);
      });
    } catch {
      console.log("No se pudo agregar la ubicación");
    } finally {
      window.location.reload();
    }
  };

  const listaUbicaciones = lista
    .sort((item1, item2) => (item1.region > item2.region ? 1 : -1))
    .sort((item1, item2) =>
      item1.region === item2.region ? (item1.pais > item2.pais ? 1 : -1) : ""
    )
    .map((item, i, lis) => {
      return (
        <tr key={item._id}>
          <td>
            {i >= 1
              ? item.region === lis[i - 1].region
                ? ""
                : item.region
              : item.region}
          </td>
          <td>
            {i >= 1
              ? item.pais === lis[i - 1].pais
                ? ""
                : item.pais
              : item.pais}
          </td>
          <td>{item.ciudad}</td>
          <td>
            {
              <div
                className="centrarContenidos clickeable"
                onClick={() =>
                  manejarEditar(item.region, item.pais, item.ciudad)
                }
              >
                <img className="icon" src={editar} alt="editar" />
              </div>
            }
          </td>
          <td>
            {
              <div
                className="centrarContenidos clickeable"
                onClick={() => manejarBorrar(item.ciudad)}
              >
                <img className="icon" src={borrar} alt="borrar" />
              </div>
            }
          </td>
        </tr>
      );
    });

  return (
    <div>
      {!modoAgregar && !modoEditar && (
        <div className="tituloCompartido">
          <h1>Ubicaciones: Región - País - Ciudad</h1>
          <Button variant="primary" onClick={manejarAgregar}>
            Agregar
          </Button>
        </div>
      )}
      {!modoAgregar && !modoEditar ? (
        <div>
          <Table striped bordered>
            <thead className="fondoNaranja">
              <tr>
                <th>Región</th>
                <th>País</th>
                <th>Ciudad</th>
                <th className="centrarContenidos">Editar</th>
                <th className="centrarContenidos">Borrar</th>
              </tr>
            </thead>
            <tbody>{listaUbicaciones ? listaUbicaciones : "Problemas"}</tbody>
          </Table>
        </div>
      ) : null}
      {modoAgregar ? (
        <div>
          <h1>Agregar:</h1>
          <Form onSubmit={sumarUbicacion}>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Región: </Form.Label>
                <Form.Control
                  type="text"
                  value={entrada.region}
                  onChange={manejarInput}
                  name="region"
                  required
                ></Form.Control>
                <Form.Label>País: </Form.Label>
                <Form.Control
                  type="text"
                  value={entrada.pais}
                  onChange={manejarInput}
                  name="pais"
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
              </Form.Group>
            </Col>
            <Button type="submit">Agregar</Button>{" "}
            <Button onClick={manejarCancelar} variant="danger">
              Cancelar
            </Button>
          </Form>
        </div>
      ) : null}
      {modoEditar ? (
        <div>
          <h1>Editar:</h1>
          <Form onSubmit={editarUbicacion}>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Región: </Form.Label>
                <Form.Control
                  type="text"
                  value={entradaEditar.region}
                  onChange={manejarInputEdit}
                  name="region"
                  required
                ></Form.Control>
                <Form.Label>País: </Form.Label>
                <Form.Control
                  type="text"
                  value={entradaEditar.pais}
                  onChange={manejarInputEdit}
                  name="pais"
                  required
                ></Form.Control>
                <Form.Label>Ciudad: </Form.Label>
                <Form.Control
                  type="text"
                  value={entradaEditar.ciudad}
                  onChange={manejarInputEdit}
                  name="ciudad"
                  required
                ></Form.Control>
              </Form.Group>
            </Col>
            <Button type="submit">Guardar</Button>{" "}
            <Button onClick={manejarCancelar} variant="danger">
              Cancelar
            </Button>
          </Form>
        </div>
      ) : null}
    </div>
  );
}

export default Ubicacion;
