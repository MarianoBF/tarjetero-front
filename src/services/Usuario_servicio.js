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

  encontrar(data) {
    return http.put("/ubicacion", data);
  }

  actualizar(data) {
    return http.put("/usuario/" + data);
  }

  borrar(data) {
    return http.delete("/usuario/" + data);
  }

  borrarTodo() {
    return http.delete("/usuarios");
  }

}

export default new servicioUsuario();