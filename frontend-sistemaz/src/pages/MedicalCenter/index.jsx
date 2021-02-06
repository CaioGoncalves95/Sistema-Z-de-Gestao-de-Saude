import React from "react";

import './styles.css'

import Header from '../../components/Header';
import LeftMenu from '../../components/LeftMenu';
import Main from '../../components/Main';

function MedicalCenter() {
  return (
    <>
      <Header pageTitle={"Painel Administrativo - Central Médica"} />
      <div className="page">
        <LeftMenu options={["Paciente", "Prontuário", "Exame", "Procedimento", "Evolução", "Medicamento", "Relatórios"]}/>
        <Main page={"medicalcenter"}></Main>
      </div>
    </>
  );
}

export default MedicalCenter;
