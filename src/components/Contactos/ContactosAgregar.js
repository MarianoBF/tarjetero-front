import ContactoService from "../../services/ContactoService";
import EmpresaService from "../../services/EmpresaService";
import UbicacionService from "../../services/UbicacionService";
import { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

function ContactosAgregar(props) {
  const [listaEmpresas, setListaEmpresas] = useState([]);

  const [entrada, setEntrada] = useState(props.entrada);

  useEffect(() => {
    EmpresaService
      .listar()
      .then((data) => {
        setListaEmpresas(data.data);
      })
      .catch(() => console.log("No se pudo traer la información"));
  }, []);

  const elegirListaEmpresas = listaEmpresas.map((item) => {
    return <option key={item.nombre}>{item.nombre}</option>;
  });

  const [listaUbicaciones, setListaUbicaciones] = useState([]);

  useEffect(() => {
    UbicacionService
      .listar()
      .then((data) => {
        setListaUbicaciones(data.data);
      })
      .catch(() => console.log("No se pudo traer la información"));
  }, []);

  const regiones = new Set(listaUbicaciones.map((item) => item.region));

  const elegirListaRegiones = Array.from(regiones).map((item) => {
    return <option key={item}>{item}</option>;
  });

  const paisRef = useRef(null);

  const manejarElegirRegion = (e) => {
    e.target.value !== ""
      ? (paisRef.current.disabled = false)
      : (paisRef.current.disabled = true);
    setEntrada({ ...entrada, region: e.target.value, pais: "", ciudad: "" });
  };

  const paises = new Set(
    listaUbicaciones
      .filter((item) => item.region === entrada.region)
      .map((item) => item.pais)
  );

  const elegirListaPaises = Array.from(paises).map((item) => {
    return <option key={item}>{item}</option>;
  });

  const manejarElegirPais = (e) => {
    e.target.value !== ""
      ? (ciudadRef.current.disabled = false)
      : (ciudadRef.current.disabled = true);
    setEntrada({ ...entrada, pais: e.target.value });
  };

  const ciudadRef = useRef(null);

  const ciudades = listaUbicaciones
    .filter((item) => item.pais === entrada.pais)
    .map((item) => item.ciudad);

  const elegirListaCiudades = ciudades.map((item) => {
    return <option key={item}>{item}</option>;
  });

  const manejarInput = (event) => {
    const { name, value } = event.target;
    setEntrada({ ...entrada, [name]: value });
  };

  const [valoresCanales, setValoresCanales] = useState(props.canales);

  const manejarInputCanales = (event, i) => {
    const { name, value } = event.target;
    let actualizado = [...valoresCanales];
    actualizado[i][name] = value;
    setValoresCanales(actualizado);
  };

  const guardarContacto = (e) => {
    e.preventDefault();
    const data = {
      nombre: entrada.nombre,
      apellido: entrada.apellido,
      empresa: entrada.empresa,
      cargo: entrada.cargo,
      email: entrada.email,
      region: entrada.ciudad,
      pais: entrada.ciudad,
      ciudad: entrada.ciudad,
      interes: entrada.interes,
      canales: [...valoresCanales],
      canalPreferido: valoresCanales.filter(
        (item) => item.preferencia === "Canal preferido"
      )[0].canal,
    };
    if (!props.editar) {
      try {
        ContactoService
          .sumar(data)
          .then((response) => {
            console.log(response.data);
          })
          .catch(() => console.log("No se pudo agregar el contacto"));
      } catch {
        console.log("No se pudo agregar");
      } finally {
        window.location.reload();
      }
    } else {
      try {
        ContactoService
          .actualizar(entrada.id, data)
          .then((response) => {
            console.log(response.data);
          })
          .catch(() => console.log("No se pudo actualizar el contacto"));
      } catch {
        console.log("No se pudo actualizar");
      } finally {
        window.location.reload();
      }
    }
  };

  const [cantidadCanales, setCantidadCanales] = useState(props.cantCanales);

  const CanalesContacto = cantidadCanales.map((x, i) => {
    return (
      <Form.Group key={i}>
        <Form.Label>Canales de Contacto: </Form.Label>
        <Form.Control
          as="select"
          value={valoresCanales[i].canal}
          onChange={(e) => manejarInputCanales(e, i)}
          name={"canal"}
          required
        >
          <option></option>
          <option>Whatsapp</option>
          <option>Teléfono</option>
          <option>Email</option>
          <option>Facebook</option>
          <option>Twitter</option>
        </Form.Control>
        <Form.Label>Cuenta de usuario: </Form.Label>
        <Form.Control
          type="text"
          value={valoresCanales[i].cuenta}
          onChange={(e) => manejarInputCanales(e, i)}
          name={`cuenta`}
          required
        ></Form.Control>
        <Form.Label>Preferencia: </Form.Label>
        <Form.Control
          as="select"
          value={valoresCanales[i].preferencia}
          onChange={(e) => manejarInputCanales(e, i)}
          name={`preferencia`}
          required
        >
          <option></option>
          <option>No molestar</option>
          <option>Sin preferencia</option>
          <option>Canal preferido</option>
        </Form.Control>
      </Form.Group>
    );
  });

  const agregarCanal = () => {
    if (cantidadCanales.length < 5) {
      setCantidadCanales([...cantidadCanales, 1]);
      setValoresCanales([
        ...valoresCanales,
        { canal: "", cuenta: "", preferencia: "" },
      ]);
    }
  };

  const removerCanal = () => {
    let actual = [...cantidadCanales];
    actual.pop();
    setCantidadCanales(actual);
  };

  return (
    <div>
      <div>
        <h1>Agregar Contacto:</h1>
        <Form inline onSubmit={guardarContacto}>
          <Col md={10}>
            <h2>Nombre y Compañía</h2>
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
              <Form.Label>Cargo: </Form.Label>
              <Form.Control
                type="text"
                value={entrada.cargo}
                onChange={manejarInput}
                name="cargo"
                required
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={10}>
            <Form.Group>
              <Form.Label>Email: </Form.Label>
              <Form.Control
                type="text"
                value={entrada.email}
                onChange={manejarInput}
                name="email"
                required
              ></Form.Control>
              <Form.Label>Compañía: </Form.Label>
              <Form.Control
                as="select"
                value={entrada.empresa}
                onChange={manejarInput}
                name="empresa"
                required
              >
                <option></option>
                {elegirListaEmpresas}
              </Form.Control>
            </Form.Group>
          </Col>

          <Col md={10}>
            <h2>Ubicación e interés</h2>
            <Form.Group>
              <Form.Label>Región: </Form.Label>
              <Form.Control
                as="select"
                value={entrada.region}
                onChange={manejarElegirRegion}
                name="region"
                required
              >
                <option></option>
                {elegirListaRegiones}
              </Form.Control>
              <Form.Label>País: </Form.Label>
              <Form.Control
                as="select"
                value={entrada.pais}
                onChange={manejarElegirPais}
                name="pais"
                ref={paisRef}
                required
                disabled
              >
                <option></option>
                {elegirListaPaises}
              </Form.Control>
              <Form.Label>Ciudad: </Form.Label>
              <Form.Control
                as="select"
                value={entrada.ciudad}
                onChange={manejarInput}
                name="ciudad"
                ref={ciudadRef}
                required
                disabled
              >
                <option></option>

                {elegirListaCiudades}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={10}>
            <Form.Group>
              <Form.Label>Dirección: </Form.Label>
              <Form.Control
                type="text"
                value={entrada.direccion}
                onChange={manejarInput}
                name="direccion"
                required
              ></Form.Control>
              <Form.Label>Interés: </Form.Label>
              <Col md={2}>
                <Form.Control
                  type="range"
                  min="0"
                  max="100"
                  step="25"
                  value={entrada.interes}
                  onChange={manejarInput}
                  name="interes"
                  required
                ></Form.Control>
              </Col>

              <Col>
                <Form.Control
                  type="number"
                  min="0"
                  max="100"
                  step="25"
                  value={entrada.interes}
                  onChange={manejarInput}
                  name="interes"
                  required
                ></Form.Control>
              </Col>
            </Form.Group>
          </Col>

          <Col md={10}>
            <Form.Group>
              <h2>Canales de contacto</h2>
              {"\t"}
              <Button
                size="sm"
                className="botonSeparadoHor"
                onClick={agregarCanal}
              >
                Agregar canal
              </Button>
              {"   "}
              <Button size="sm" variant="warning" onClick={removerCanal}>
                Quitar canal
              </Button>
              {CanalesContacto}
            </Form.Group>
          </Col>

          <Col md={10}>
            <div className="centradoSeparado">
              <Button variant="secondary" onClick={props.cancelar}>
                Cancelar y regresar al listado
              </Button>{" "}
              <Button type="submit" size="lg">
                Guardar
              </Button>
            </div>
          </Col>
        </Form>{" "}
      </div>
    </div>
  );
}

export default ContactosAgregar;
