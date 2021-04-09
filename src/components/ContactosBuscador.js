import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

function ContactosBuscador(props) {

  const filtrador = (e) => {
    props.onChange(e.target.value)
  }

  return (
    <div>
      <Form inline onSubmit={null}>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Ingrese busqueda: </Form.Label>
            <Form.Control
              type="text"
              value={props.busqueda}
              onChange={filtrador}
              name="nombre"
              required></Form.Control>
          </Form.Group>
        </Col>
      </Form>
    </div>
  );
}

export default ContactosBuscador;
