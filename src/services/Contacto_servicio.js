import http from "../http-common";

class servicioContacto {

  sumar(data) {
    return http.post("/contacto", data);
  }

  listar() {
    return http.get("/contactos");
  }
  actualizar(data) {
    return http.put("/contacto", data);
  }

  borrar(empresa) {
    return http.delete("/contacto/" + empresa);
  }

  borrarTodo() {
    return http.delete("/contactos");
  }

}

export default new servicioContacto();