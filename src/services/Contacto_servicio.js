import http from "../http-common";

class servicioContacto {

  sumar(data) {
    return http.post("/contacto", data);
  }

  listar() {
    return http.get("/contactos");
  }

}

export default new servicioContacto();