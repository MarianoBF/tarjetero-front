import servicioContacto from "../services/Contacto_servicio";
import servicioEmpresa from "../services/Empresa_servicio";
import {useState, useEffect} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";


function Contactos() {
  const [listaEmpresas, setListaEmpresas] = useState([]);

  useEffect(() => {
    servicioEmpresa
      .listar()
      .then(data => {
        setListaEmpresas(data.data);
        console.log(data.data);
      })
      .catch(() => console.log("No se pudo traer la información"));
  }, []);

  const elegirListaEmpresas = listaEmpresas.map(item => {
    return <option>{item.nombre}</option>;
  });

  const valorInicial = {
    nombre: "",
    apellido: "",
    empresa: "",
    cargo: "",
    email: "",
    region: "",
    pais: "",
    ciudad: "",
    interes: "",
    canales: [{canal: "a", cuenta: "b", preferencias: "c"}],
    canalPreferido: "",
  };

  const [entrada, setEntrada] = useState(valorInicial);

  const manejarInput = event => {
    const {name, value} = event.target;
    setEntrada({...entrada, [name]: value});
  };

  const guardarEmpresa = e => {
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
      canales: entrada.canales,
      canalPreferido: entrada.canalPreferido,
    };
    servicioContacto
      .sumar(data)
      .then(response => {
        console.log(response.data);
      })
      .catch(() => console.log("No se pudo agregar el contacto"));
  };

  const [canales, setCanales] = useState([1]);

  const CanalesContacto = canales.map((x, i) => {
    return (
      <Form.Group>
        <Form.Label>Canales de Contacto: </Form.Label>
        <Form.Control
          type="text"
          value={entrada.canales[i].canal}
          onChange={manejarInput}
          name={`canalesCanal${i}`}
          required></Form.Control>
        <Form.Label>Cuenta de usuario: </Form.Label>
        <Form.Control
          type="text"
          value={entrada.canales[i].cuenta}
          onChange={manejarInput}
          name={`canalesCuenta${i}`}
          required></Form.Control>
        <Form.Label>Preferencias: </Form.Label>
        <Form.Control
          type="text"
          value={entrada.canales[i].preferencias}
          onChange={manejarInput}
          name={`canalesPreferencias${i}`}
          required></Form.Control>
      </Form.Group>
    );
  });

  const agregarCanal = () => {
    setCanales([...canales, 1]);
    setEntrada({
      ...entrada,
      canales: [
        ...entrada.canales,
        {canal: "a", cuenta: "b", preferencias: "c"},
      ],
    });
    console.log(entrada.canales);
  };

  return (
    <div>
      <h3>Agregar Contacto:</h3>
      <Form inline onSubmit={guardarEmpresa}>
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
              value={entrada.cargo}
              onChange={manejarInput}
              name="cargo"
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
              type="text"
              value={entrada.region}
              onChange={manejarInput}
              name="nombre"
              required></Form.Control>
            <Form.Label>País: </Form.Label>
            <Form.Control
              type="text"
              value={entrada.pais}
              onChange={manejarInput}
              name="apellido"
              required></Form.Control>
            <Form.Label>Ciudad: </Form.Label>
            <Form.Control
              type="text"
              value={entrada.ciudad}
              onChange={manejarInput}
              name="empresa"
              required></Form.Control>
            <Form.Label>Dirección: </Form.Label>
            <Form.Control
              type="text"
              value={entrada.direccion}
              onChange={manejarInput}
              name="cargo"
              required></Form.Control>
            <Form.Label>Interés: </Form.Label>
            <Form.Control
              type="range"
              min="0"
              max="100"
              step="25"
              value={entrada.interes}
              onChange={manejarInput}
              name="interes"
              required></Form.Control>
          </Form.Group>
        </Col>

        <Col md={10}>
          {CanalesContacto}

          <Button onClick={agregarCanal}>Agregar canal</Button>
        </Col>

        <Button type="submit">Guardar</Button>
      </Form>
    </div>
  );
}

export default Contactos;
