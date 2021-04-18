import ReactExport from "react-export-excel";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


function ContactosDescargar(props) {
    return (
            <ExcelFile filename="Contactos" hideElement>
              <ExcelSheet data={props.datos} name="Contactos">
                <ExcelColumn label="Nombre" value="nombre" />
                <ExcelColumn label="Apellido" value="apellido" />
                <ExcelColumn label="Empresa" value="empresa" />
                <ExcelColumn label="Cargo" value="cargo" />
                <ExcelColumn label="Email" value="email" />
                <ExcelColumn label="Región" value="region" />
                <ExcelColumn label="País" value="pais" />
                <ExcelColumn label="Ciudad" value="ciudad" />
                <ExcelColumn label="Dirección" value="direccion" />
                <ExcelColumn label="Interes" value="interes" />
                <ExcelColumn label="Canal Preferido" value="canalPreferido" />
                <ExcelColumn label="Canal0" value="canal0" />
                <ExcelColumn label="Cuenta0" value="cuenta0" />
                <ExcelColumn label="Preferido0" value="preferencia0" />
                <ExcelColumn label="Canal1" value="canal1" />
                <ExcelColumn label="Cuenta1" value="cuenta1" />
                <ExcelColumn label="Preferido1" value="preferencia1" />
                <ExcelColumn label="Canal2" value="canal2" />
                <ExcelColumn label="Cuenta2" value="cuenta2" />
                <ExcelColumn label="Preferido2" value="preferencia2" />
                <ExcelColumn label="Canal3" value="canal3" />
                <ExcelColumn label="Cuenta3" value="cuenta3" />
                <ExcelColumn label="Preferido3" value="preferencia3" />
                <ExcelColumn label="Canal4" value="canal4" />
                <ExcelColumn label="Cuenta4" value="cuenta4" />
                <ExcelColumn label="Preferido4" value="preferencia4" />
                <ExcelColumn label="Canal5" value="canal5" />
                <ExcelColumn label="Cuenta5" value="cuenta5" />
                <ExcelColumn label="Preferido5" value="preferencia5" />
              </ExcelSheet>
            </ExcelFile>
          )
}

export default ContactosDescargar;