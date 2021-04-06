import http from "../http-common";

class servicioUbicacion {

  sumar(data) {
    return http.post("/ubicacion", data);
  }

  listar() {
    return http.get("/ubicaciones");
  }

}

export default new servicioUbicacion();