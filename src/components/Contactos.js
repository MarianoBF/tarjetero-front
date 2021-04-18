import servicioContacto from "../services/Contacto_servicio";
import {useState, useEffect} from "react";
import Table from "react-bootstrap/Table";
import ContactosBuscador from "./ContactosBuscador";
import ContactosAgregar from "./ContactosAgregar";
import ContactosDescargar from "./ContactosDescargar";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import borrar from "../media/borrar.svg";
import editar from "../media/editar.svg";
import XLSX from "xlsx";

function Contactos() {
  const [lista, setLista] = useState([]);
  const [results, setResults] = useState([]);
  const [modoAgregar, setModoAgregar] = useState(false);
  const [modoEditar, setModoEditar] = useState(false);

  const cambiarModo = () => {
    setModoAgregar(!modoAgregar);
  };

  useEffect(() => {
    servicioContacto
      .listar()
      .then(data => {
        setLista(data.data);
        setResults(data.data);
      })
      .catch(() => console.log("No se pudo traer la información"));
  }, []);

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
    canalPreferido: "",
  };

  const [modalCanales, setModalCanales] = useState(false);
  const [contenidosModalCanales, setContenidosModalCanales] = useState([]);
  const manejarCerrar = () => setModalCanales(false);
  const manejarMostrar = item => {
    setModalCanales(true);
    setContenidosModalCanales(item);
  };

  const contenidosMod = contenidosModalCanales.map((item, i) => {
    return (
      <tbody key={i}>
        <tr>
          <td>{contenidosModalCanales[i].canal}</td>
          <td>{contenidosModalCanales[i].cuenta}</td>
          <td>{contenidosModalCanales[i].preferencia}</td>
        </tr>
      </tbody>
    );
  });

  const [modalBorrar, setModalBorrar] = useState(false);
  const [contactoParaBorrar, setContactoParaBorrar] = useState("");

  const manejarBorrar = (id, nombre, apellido) => {
    setModalBorrar(true);
    setContactoParaBorrar({id: id, nombre: nombre, apellido: apellido});
  };

  const manejarCerrarBorrar = item => {
    setModalBorrar(false);
  };

  const manejarModalBorrar = () => {
    setModalBorrar(false);
    try {
      servicioContacto.borrar(contactoParaBorrar.id);
    } catch {
      console.log("No se pudo borrar la ubicación");
    } finally {
      window.location.reload();
    }
  };

  const initialCheckboxes = [
    {id: "", checked: "false"},
    {id: "", checked: "false"},
    {id: "", checked: "false"},
    {id: "", checked: "false"},
    {id: "", checked: "false"},
    {id: "", checked: "false"},
    {id: "", checked: "false"},
    {id: "", checked: "false"},
    {id: "", checked: "false"},
    {id: "", checked: "false"},
  ];

  const [checkboxes, setCheckboxes] = useState(initialCheckboxes);
  const [checkboxesActivos, setCheckboxesActivos] = useState(false);
  const [cantidadCheckboxesActivos, setCantidadCheckboxesActivos] = useState(0);

  const manejarCheckbox = (e, id, i) => {
    let nuevosCheckboxes = [...checkboxes];
    nuevosCheckboxes[i].id = id;
    nuevosCheckboxes[i].checked = e.target.checked;
    setCheckboxes(nuevosCheckboxes);
    setCantidadCheckboxesActivos(
      checkboxes.filter(item => item.checked === true).length
    );
    checkboxes.filter(item => item.checked === true).length > 0
      ? setCheckboxesActivos(true)
      : setCheckboxesActivos(false);
  };

  const borrarCheckboxes = () => {
    const borrables = checkboxes.filter(item => item.checked === true);
    try {
      borrables.forEach(item => {
        servicioContacto.borrar(item.id);
      });
    } catch {
      console.log("No se pudo borrar la ubicación");
    } finally {
      window.location.reload();
    }
  };

  const listaContactos = results
    .sort((item1, item2) => (item1.nombre > item2.nombre ? 1 : -1))
    .map((item, i, lis) => {
      return (
        <tr key={item._id}>
          <td>
            <input
              type="checkbox"
              label=""
              value={checkboxes[i].checked}
              onChange={e => manejarCheckbox(e, item._id, i)}
            />
          </td>
          <td>{item.nombre}</td>
          <td>{item.apellido}</td>
          <td>{item.ciudad}</td>
          <td>{item.empresa}</td>
          <td>{item.cargo}</td>
          <td>
            <p
              className="clickeable textoSubrayado margenCero"
              onClick={() => manejarMostrar(item.canales)}>
              {item.canalPreferido}
            </p>
          </td>
          <td>{item.interes}</td>
          <td>
            <div className="clickeable" onClick={() => manejarEditar(item)}>
              <img className="icon" src={editar} alt="editar" />
            </div>
          </td>
          <td>
            <div
              className="clickeable"
              onClick={() =>
                manejarBorrar(item._id, item.nombre, item.apellido)
              }>
              <img className="icon" src={borrar} alt="borrar" />
            </div>
          </td>
        </tr>
      );
    });

  const filtrador = filtro => {
    setResults(
      lista.filter(
        item =>
          item.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
          item.apellido.toLowerCase().includes(filtro.toLowerCase()) ||
          item.ciudad.toLowerCase().includes(filtro.toLowerCase()) ||
          item.empresa.toLowerCase().includes(filtro.toLowerCase()) ||
          item.cargo.toLowerCase().includes(filtro.toLowerCase())
      )
    );
  };

  const [entradaEditar, setEntradaEditar] = useState();

  const manejarEditar = item => {
    setModoEditar(true);
    setModoAgregar(false);
    setEntradaEditar(item);
  };

  const manejarCancelarEdicion = () => {
    setModoEditar(false);
    setModoAgregar(false);
    setEntradaEditar(valorInicial);
  };

  const initialValueCanales = [{canal: "", cuenta: "", preferencia: ""}];

  const [idsTildados, setIdsTildados] = useState([]);

  const [descargarTodo, setDescargarTodo] = useState(false);

  const [descargarAlgunos, setDescargarAlgunos] = useState(false);

  const descargarContactos = e => {
    console.log(e)
    e.preventDefault();
    e.stopPropagation();
    juntados = unirResults();
    setTimeout(restaurarDescargar, 1000);
    setDescargarTodo(true);
  };

  const descargarContactosParcial = e => {
    e.preventDefault();
    e.stopPropagation();
    juntados = unirResults();
    setIdsTildados(checkboxes.map(item => item.id));
    setTimeout(restaurarDescargar, 1000);
    setDescargarAlgunos(true);
  };

  const restaurarDescargar = () => {
    setDescargarAlgunos(false);
    setDescargarTodo(false);
  };

  const [archivo, setArchivo] = useState();
  const [subir, setSubir] = useState();

  const manejarSubida = event => {
    setArchivo(event.target.files[0]);
    setSubir(true);
  };

  const importarContactos = () => {
    const reader = new FileReader();
    reader.readAsBinaryString(archivo);
    reader.onload = evt => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, {type: "binary"});
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const contactosAux = XLSX.utils.sheet_to_json(ws, {header: 1});
      console.log("aux", contactosAux);
      let contactos = [];
      contactosAux.forEach((contacto, i) => {
        if (i === 0) {
          console.log("header");
        } else {
          const canales = [];
          canales[0] = {
            canal: contacto[10],
            cuenta: contacto[11],
            preferencia: contacto[12],
          };
          canales[1] = {
            canal: contacto[13],
            cuenta: contacto[14],
            preferencia: contacto[15],
          };
          canales[2] = {
            canal: contacto[16],
            cuenta: contacto[17],
            preferencia: contacto[18],
          };
          canales[3] = {
            canal: contacto[19],
            cuenta: contacto[20],
            preferencia: contacto[21],
          };
          canales[4] = {
            canal: contacto[22],
            cuenta: contacto[23],
            preferencia: contacto[24],
          };

          const aSumar = {
            apellido: contacto[0],
            nombre: contacto[1],
            empresa: contacto[2],
            cargo: contacto[3],
            email: contacto[4],
            region: contacto[5],
            pais: contacto[6],
            ciudad: contacto[7],
            interes: contacto[8],
            canalPreferido: contacto[9],
            canales: [...canales],
          };
          contactos.push(aSumar);
        }
      });
      console.log(contactos);
      contactos.forEach(contacto => {
        servicioContacto
          .sumar(contacto)
          .then(response => {
            console.log(response.data);
          })
          .catch(() => console.log("No se pudo agregar el contacto"));
      });
    };
    setSubir(false);
    window.location.reload();
  };

  const resultBaj = results.map((item, i) => {
    let objeto = {};
    try {
      item.canales.forEach((cadaCanal, num) => {
        const canal = "canal" + num;
        const cuenta = "cuenta" + num;
        const preferencia = "preferencia" + num;
        objeto[canal] = cadaCanal.canal;
        objeto[cuenta] = cadaCanal.cuenta;
        objeto[preferencia] = cadaCanal.preferencia;
      });
    } catch {
    } finally {
      return objeto;
    }
  });

  const unirResults = () => {
    let res = [];
    for (let i = 0; i <= results.length - 1; i++) {
      res[i] = {...results[i], ...resultBaj[i], canales: "sí"};
    }
    return res;
  };

  let juntados = unirResults();

  return (
    <div>
      <div className="tituloCompartido">
        {!modoAgregar && !modoEditar && <h1>Contactos</h1>}

        {!modoAgregar && !modoEditar ? (
          <ContactosBuscador lista={lista} onChange={filtrador} />
        ) : null}

        {checkboxesActivos && (
          <Button variant="warning" onClick={borrarCheckboxes}>
            {cantidadCheckboxesActivos === 1
              ? "Borrar el contacto seleccionado"
              : `Borrar los ${cantidadCheckboxesActivos} contactos seleccionados`}
          </Button>
        )}

        {!modoAgregar && !modoEditar ? (
          <Button onClick={cambiarModo}>Agregar</Button>
        ) : null}
      </div>

      {!modoAgregar && !modoEditar && (
        <div className="tituloCompartido">
          <Form>
            <Form.File
              id="custom-file"
              label="..."
              data-browse="Elegir Excel"
              onChange={manejarSubida}
              custom
            />
          </Form>

          {subir && (
            <Button variant="danger" onClick={importarContactos}>
              Importar Contactos
            </Button>
          )}

          {!checkboxesActivos && (
            <Button variant="info" onClick={descargarContactos}>
              Descargar todos en un .xlsx
            </Button>
          )}

          {descargarTodo && <ContactosDescargar datos={juntados} />}

          {checkboxesActivos && (
            <Button variant="info" onClick={descargarContactosParcial}>
              {cantidadCheckboxesActivos === 1
                ? "Descargar el contacto seleccionado"
                : `Descargar los ${cantidadCheckboxesActivos} contactos seleccionados`}
            </Button>
          )}

          {descargarAlgunos && <ContactosDescargar datos={juntados.filter(item => idsTildados.includes(item._id))} />}
        </div>
      )}

      {!modoAgregar && !modoEditar && (
        <p className="alinearDerecha">
          *Click para ver todos los canales disponibles
        </p>
      )}

      {!modoAgregar && !modoEditar ? (
        <div>
          <Table striped bordered className="centrarContenidos">
            <thead className="fondoNaranja">
              <tr>
                <th></th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Ciudad</th>
                <th>Empresa</th>
                <th>Cargo</th>
                <th>Canal Preferido*</th>
                <th>Interés</th>
                <th>Editar</th>
                <th>Borrar</th>
              </tr>
            </thead>
            <tbody>{listaContactos ? listaContactos : "Problemas"}</tbody>
          </Table>
        </div>
      ) : null}
      {modoAgregar ? (
        <ContactosAgregar
          entrada={valorInicial}
          editar={modoEditar}
          cancelar={manejarCancelarEdicion}
          cantCanales={[1]}
          canales={initialValueCanales}
        />
      ) : null}
      {modoEditar ? (
        <ContactosAgregar
          entrada={entradaEditar}
          editar={modoEditar}
          cancelar={manejarCancelarEdicion}
          cantCanales={Array(entradaEditar.canales.length).fill(1)}
          canales={[...entradaEditar.canales]}
        />
      ) : null}

      {modalCanales && (
        <Modal show={modalCanales} onHide={manejarCerrar}>
          <Modal.Header closeButton>
            <Modal.Title>Canales de contacto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table>
              <thead>
                <tr>
                  <th>Canal</th>
                  <th>Cuenta</th>
                  <th>Preferencia</th>
                </tr>
              </thead>
              {contenidosMod}
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={manejarCerrar}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {modalBorrar && (
        <Modal show={modalBorrar} onHide={manejarCerrarBorrar}>
          <Modal.Header closeButton>
            <Modal.Title>Confirma Borrar la entrada?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              {contactoParaBorrar.nombre + " " + contactoParaBorrar.apellido}
            </p>
            <Button variant="danger" onClick={manejarModalBorrar}>
              Sí, borrar
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={manejarCerrarBorrar}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default Contactos;
