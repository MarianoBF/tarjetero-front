import http from "../http-common";

class servicioUbicacion {
  sumar(data) {
    return http.post("/ubicacion", data);
  }

  listar() {
    return http.get("/ubicaciones");
  }

  actualizar(data) {
    return http.put("/ubicacion", data);
  }

  borrar(ciudad) {
    return http.delete("/ubicacion/" + ciudad);
  }

  borrarTodo() {
    return http.delete("/ubicaciones");
  }
}

export default new servicioUbicacion();
