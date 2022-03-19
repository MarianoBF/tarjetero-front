import http from "../http-common";

class EmpresaService {
  sumar(data) {
    return http.post("/empresa", data);
  }

  listar() {
    return http.get("/empresas");
  }

  actualizar(data) {
    return http.put("/empresa", data);
  }

  borrar(empresa) {
    return http.delete("/empresa/" + empresa);
  }

  borrarTodo() {
    return http.delete("/empresas");
  }
}

export default new EmpresaService();
