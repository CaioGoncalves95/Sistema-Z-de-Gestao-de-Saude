import React from 'react';

import './styles.css';

import Record from './Record';

const MedicalRecord = ({pacientName, prontuaryNumber}) => {
    return (
        <div className="wrapper-medical-record">
            <h1>Prontuário</h1>
            <p>{prontuaryNumber} - {pacientName}</p>
            <Record title={"Exames"} prontuaryNumber={prontuaryNumber}/>
            <Record title={"Evoluções"} prontuaryNumber={prontuaryNumber}/>
            <Record title={"Consultas"} prontuaryNumber={prontuaryNumber}/>
            <Record title={"Procedimentos"} prontuaryNumber={prontuaryNumber}/>
            <Record title={"Internações"} prontuaryNumber={prontuaryNumber}/>
        </div>
    );
}

export default MedicalRecord;