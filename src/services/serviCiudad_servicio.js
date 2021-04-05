import http from "../http-common";

class serviCiudad {

  create(data) {
    return http.post("/ubicacion", data);
  }

  find() {
    return http.get("/ubicaciones");
  }

}

export default new serviCiudad();