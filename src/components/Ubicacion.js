import serviCiudad from "../services/serviCiudad_servicio"
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

function Ubicacion() {

    const [lista, setLista] = useState([]);
    const [modoAgregar, setModoAgregar] = useState(false)
  
  const cambiarModo = () => {
    setModoAgregar(!modoAgregar)
  }

    useEffect(() => {
        serviCiudad.find()
            .then((data)=> {
                setLista(data.data);
                console.log(data.data)
                
            })
       .catch(() => console.log("No se pudo traer la informcación"))
        }, []);

    const listaUbicaciones = lista
        .sort((item1, item2) => item1.region > item2.region ? 1 : 1)
        .sort((item1, item2) => item1.region === item2.region ? item1.pais > item2.pais ? 1 : -1 : "")
        .map((item, i, lis) => {
          return (
            <tr key={item._id}>
              <td>{i>=1?item.region===lis[i-1].region?"":item.region:item.region}</td>
              <td>{i>=1?item.pais===lis[i-1].pais?"":item.pais:item.pais}</td>
              <td>{item.ciudad}</td>
            </tr>
          );
        });

        const valorInicial = {
          region: "",
          pais: "",
          ciudad: "",
        };
      
        const [entrada, setEntrada] = useState(valorInicial);
      
        const manejarInput = (event) => {
          const { name, value } = event.target;
          setEntrada({ ...entrada, [name]: value });
        };
      
        const guardarUbicacion = (e) => {
          e.preventDefault();
          const data = {
            region: entrada.region,
            pais: entrada.pais,
            ciudad: entrada.ciudad,
          };
          serviCiudad
            .create(data)
            .then((response) => {
              console.log(response.data);
            })
            .catch(() => console.log("No se pudo agregar la ubicación"));
        };


    return(
    <div>

     <h3>Ubicación</h3>

    <button onClick={cambiarModo}>{!modoAgregar?"Agregar":"Listar"}</button>

    {!modoAgregar?
    <div>
        <Table>
        <thead>
              <tr>
                <th>Región</th>
                <th>País</th>
                <th>Ciudad</th>
                </tr>
                </thead>
                <tbody>
                {listaUbicaciones?listaUbicaciones:"Problemas"}
                </tbody>
        </Table>
    </div>
    :<div>
      <h3>Agregar Lugar:</h3>
      <Form onSubmit={guardarUbicacion}>
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
        <Button type="submit">Guardar</Button>
      </Form>
    </div>}



    </div>

 )
}

export default Ubicacion;