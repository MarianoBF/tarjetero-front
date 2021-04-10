import servicioContacto from "../services/Contacto_servicio";
import servicioEmpresa from "../services/Empresa_servicio";
import servicioUbicacion from "../services/Ubicacion_servicio";
import {useState, useEffect, useRef} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

function ContactosAgregar(props) {
  const [listaEmpresas, setListaEmpresas] = useState([]);



  const [entrada, setEntrada] = useState(props.entrada);

  useEffect(() => {
    servicioEmpresa
      .listar()
      .then(data => {
        setListaEmpresas(data.data);
      })
      .catch(() => console.log("No se pudo traer la información"));
  }, []);

  const elegirListaEmpresas = listaEmpresas.map(item => {
    return <option>{item.nombre}</option>;
  });

  const [listaUbicaciones, setListaUbicaciones] = useState([]);

  useEffect(() => {
    servicioUbicacion
      .listar()
      .then(data => {
        setListaUbicaciones(data.data);
      })
      .catch(() => console.log("No se pudo traer la información"));
  }, []);

  const regiones = new Set(listaUbicaciones.map(item => item.region));

  const elegirListaRegiones = Array.from(regiones).map(item => {
    return <option>{item}</option>;
  });

  const paisRef = useRef(null);

  const manejarElegirRegion = e => {
    e.target.value !== ""
      ? (paisRef.current.disabled = false)
      : (paisRef.current.disabled = true);
    setEntrada({...entrada, region: e.target.value, pais: "", ciudad: ""});
  };

  const paises = new Set(
    listaUbicaciones
      .filter(item => item.region === entrada.region)
      .map(item => item.pais)
  );

  const elegirListaPaises = Array.from(paises).map(item => {
    return <option>{item}</option>;
  });

  const manejarElegirPais = e => {
    e.target.value !== ""
      ? (ciudadRef.current.disabled = false)
      : (ciudadRef.current.disabled = true);
    setEntrada({...entrada, pais: e.target.value});
  };

  const ciudadRef = useRef(null);

  const ciudades = listaUbicaciones
    .filter(item => item.pais === entrada.pais)
    .map(item => item.ciudad);

  const elegirListaCiudades = ciudades.map(item => {
    return <option>{item}</option>;
  });

  const manejarInput = event => {
    const {name, value} = event.target;
    setEntrada({...entrada, [name]: value});
  };

  const initialValueCanales = [{canal: "", cuenta: "", preferencia: ""}];

  const [valoresCanales, setValoresCanales] = useState(initialValueCanales);

  const manejarInputCanales = (event, i) => {
    const {name, value} = event.target;
    let actualizado = [...valoresCanales];
    actualizado[i][name] = value;
    setValoresCanales(actualizado);
  };

  const guardarContacto = e => {
    e.preventDefault();
    console.log(valoresCanales)
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
        item => item.preferencia === "Canal preferido"
      )[0].canal,
    };
    try {
    servicioContacto
      .sumar(data)
      .then(response => {
        console.log(response.data);
      })
      .catch(() => console.log("No se pudo agregar el contacto"));
    } catch {
      console.log("No se pudo agregar");
    } finally {
      window.location.reload();
    }
  };

  const [cantidadCanales, setCantidadCanales] = useState([1]);

  const CanalesContacto = cantidadCanales.map((x, i) => {
    return (
      <Form.Group key={x}>
        <Form.Label>Canales de Contacto: </Form.Label>
        <Form.Control
          as="select"
          value={valoresCanales[i].canal}
          onChange={e => manejarInputCanales(e, i)}
          name={"canal"}
          required>
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
          onChange={e => manejarInputCanales(e, i)}
          name={`cuenta`}
          required></Form.Control>
        <Form.Label>Preferencia: </Form.Label>
        <Form.Control 
          as="select"
          value={valoresCanales[i].preferencia}
          onChange={e => manejarInputCanales(e, i)}
          name={`preferencia`}
          required>
          <option></option>
          <option>No molestar</option>
          <option>Sin preferencia</option>
          <option>Canal preferido</option>
        </Form.Control>
      </Form.Group>
    );
  });

  const agregarCanal = () => {
    setCantidadCanales([...cantidadCanales, 1]);
    setValoresCanales([
      ...valoresCanales,
      {canal: "", cuenta: "", preferencia: ""},
    ]);
  };

  const removerCanal = () => {
    let actual = [...cantidadCanales];
    actual.pop();
    setCantidadCanales(actual);
  };

  const [modoEditar, setModoEditar] = useState(props.editar)
  console.log(props.editar, props.entrada)

  return (
    <div>
    {/* {!modoEditar ? ( */}
      <div>
      <h3>Agregar Contacto:</h3>
      <Form inline onSubmit={guardarContacto}>
        <Col md={10}>
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
            <Form.Label>Cargo: </Form.Label>
            <Form.Control
              type="text"
              value={entrada.cargo}
              onChange={manejarInput}
              name="cargo"
              required></Form.Control>
            <Form.Label>Email: </Form.Label>
            <Form.Control
              type="text"
              value={entrada.email}
              onChange={manejarInput}
              name="email"
              required></Form.Control>
            <Form.Label>Compañía: </Form.Label>
            <Form.Control
              as="select"
              value={entrada.empresa}
              onChange={manejarInput}
              name="empresa"
              required>
              <option></option>
              {elegirListaEmpresas}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={10}>
          <Form.Group>
            <Form.Label>Región: </Form.Label>
            <Form.Control
              as="select"
              value={entrada.region}
              onChange={manejarElegirRegion}
              name="region"
              required>
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
              disabled>
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
              disabled>
              <option></option>

              {elegirListaCiudades}
            </Form.Control>
            <Form.Label>Dirección: </Form.Label>
            <Form.Control
              type="text"
              value={entrada.direccion}
              onChange={manejarInput}
              name="direccion"
              required></Form.Control>
            <Form.Label>Interés: </Form.Label>
            <Col md={4}>
              <Form.Control
                type="range"
                min="0"
                max="100"
                step="25"
                value={entrada.interes}
                onChange={manejarInput}
                name="interes"
                required></Form.Control>
            </Col>

            <Col md={1}>
              <Form.Control
                size="sm"
                type="text"
                value={entrada.interes}
                onChange={manejarInput}
                name="interes"
                required></Form.Control>
            </Col>
          </Form.Group>
        </Col>

        <Col md={10}>
          {CanalesContacto}

          <Button onClick={agregarCanal}>Agregar canal</Button>
          <Button onClick={removerCanal}>Quitar canal</Button>
        </Col>

        <Button type="submit">Guardar</Button>
      </Form> </div>
      {/* ): "Editando"} */}
    </div>
  );
}

export default ContactosAgregar;
