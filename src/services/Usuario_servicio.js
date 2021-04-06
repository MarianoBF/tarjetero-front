import http from "../http-common";

class servicioUsuario {

  sumar(data) {
    return http.post("/usuario", data);
  }

  listar() {
    return http.get("/usuarios");
  }

  loguear(data) {
      return http.post("/login", data);
  }

}

export default new servicioUsuario();