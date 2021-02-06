import React from 'react';

import './styles.css';

import Record from './Record';

const MedicalRecord = () => {
    return (
        <div className="wrapper-medical-record">
            <h1>Prontuário</h1>
            <p>13829 - José da Silva</p>
            <Record title={"Exames"}/>
            <Record title={"Evoluções"}/>
        </div>
    );
}

export default MedicalRecord;