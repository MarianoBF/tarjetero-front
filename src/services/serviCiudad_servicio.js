import http from "../http-common";

class serviCiudad {

  create(data) {
    return http.post("/ubicacion", data);
  }

}

export default new serviCiudad();