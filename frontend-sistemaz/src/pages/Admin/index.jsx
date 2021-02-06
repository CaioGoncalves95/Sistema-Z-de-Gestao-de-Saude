import React from "react";

import './styles.css'

import Header from '../../components/Header';
import LeftMenu from '../../components/LeftMenu';
import Main from '../../components/Main';

function Admin() {
  return (
    <>
      <Header pageTitle={"Painel Administrativo - Central de Cadastros e Controle"} />
      <div className="page">
        <LeftMenu options={["Usuários", "Unidades", "Tipos de Exames", "Tip. de Procedimentos", "Central de Leitos", "Relatórios", "Medicamentos"]}/>
        <Main page={"admin"}></Main>
      </div>
    </>
  );
}

export default Admin;
