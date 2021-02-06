import React from 'react';

import './styles.css'

import addCircle from '../../../assets/images/icons/add_circle_outline_24px.svg';
import editCircle from '../../../assets/images/icons/settings_24px.svg';
import minusCircle from '../../../assets/images/icons/remove_circle_outline_24px.svg';
import viewCircle from '../../../assets/images/icons/visibility_24px_outlined.svg';
import downloadCircle from '../../../assets/images/icons/cloud_download_24px_outlined.svg';

const Record = ({title}) => {
    return (
        <div className="record-wrapper">
            <div className="record-header">
                <div>
                    <p id="record-title"><b>{title}</b></p>
                </div>
                <div className="record-icons">
                    <img src={addCircle} />
                    <img src={minusCircle} />
                    <img src={editCircle} />
                </div>
            </div>


            <div className="record-items">
                <div className="record-column">
                    <p className="record-item-header-title"><b>Nome</b></p>
                    <p className="record-item">Hemograma Completo</p>
                </div>
                <div className="record-column">
                    <p className="record-item-header-title"><b>Data</b></p>
                    <p className="record-item">05/01/2020</p>
                </div>
                <div className="record-column">
                    <p className="record-item-header-title"><b>Resultado</b></p>
                    <div className="record-actions">
                        <img src={viewCircle} alt=""/>
                        <img src={downloadCircle} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Record;