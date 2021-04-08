import {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

function ContactosBuscador(props) {
  const buscarContacto = e => {
    e.preventDefault();
    const results = props.lista.filter(
      item =>
        item.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.apellido.toLowerCase().includes(busqueda.toLowerCase())
    );
    console.log(results);
  };

  const [busqueda, setBusqueda] = useState("");

  const manejarInput = e => {
    setBusqueda(e.target.value);
    if (e.target.value > 2) {
      buscarContacto();
    }
  };

  return (
    <div>
      <Form inline onSubmit={buscarContacto}>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Ingrese busqueda: </Form.Label>
            <Form.Control
              type="text"
              value={busqueda}
              onChange={manejarInput}
              name="nombre"
              required></Form.Control>
          </Form.Group>
        </Col>
        <Button type="submit">Buscar</Button>
      </Form>
    </div>
  );
}

export default ContactosBuscador;
