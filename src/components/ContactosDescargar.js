import React from "react";
import ReactExport from "react-export-excel";

function ContactosDescargar(props) {
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


  console.log(props.datos)

  return (
    <ExcelFile hideElement="true" filename="Contactos">
      <ExcelSheet data={props.datos} name="Contactos">
        <ExcelColumn label="Nombre" value="nombre" />
        <ExcelColumn label="Apellido" value="apellido" />
        <ExcelColumn label="Cargo" value="cargo" />
      </ExcelSheet>
    </ExcelFile>
  );
}

export default ContactosDescargar;
