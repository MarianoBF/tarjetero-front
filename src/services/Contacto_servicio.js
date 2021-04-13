import http from "../http-common";

class servicioContacto {

  sumar(data) {
    return http.post("/contacto", data);
  }

  listar() {
    return http.get("/contactos");
  }
  actualizar(id, data) {
    return http.put("/contacto/"+id, data);
  }

  borrar(empresa) {
    return http.delete("/contacto/" + empresa);
  }

  borrarTodo() {
    return http.delete("/contactos");
  }

}

export default new servicioContacto();