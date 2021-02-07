import React, { useEffect, useState } from 'react';

import './styles.css'

import axios from 'axios';

import addCircle from '../../../assets/images/icons/add_circle_outline_24px.svg';
import editCircle from '../../../assets/images/icons/settings_24px.svg';
import minusCircle from '../../../assets/images/icons/remove_circle_outline_24px.svg';
import viewCircle from '../../../assets/images/icons/visibility_24px_outlined.svg';
import downloadCircle from '../../../assets/images/icons/cloud_download_24px_outlined.svg';

const Record = ({title, prontuaryNumber}) => {

    const [names, setNames] = useState([]);
    const [dates, setDates] = useState([]);
    const [results, setResults] = useState([]);

    useEffect(async () => {
        switch(title) {
            case 'Exames':
                const response = await axios.post('http://localhost:3010/exam/examHistory',{
                    prontuaryNumber: prontuaryNumber
                });
                
                const namesOfExams = response.data.map(res => res.examType);
                setNames(namesOfExams);

                const datesOfExams = response.data.map(res => new Date(res.date).toLocaleDateString());
                setDates(datesOfExams);

                const resultsOfExams = response.data.map(res => res.examLink);
                setResults(resultsOfExams);
                break;
            case 'Evoluções':
                const response2 = await axios.post('http://localhost:3010/exam/evolutionHistory',{
                    prontuaryNumber: prontuaryNumber
                });
                
                const namesOfEvolutions = response2.data.map(res => res.description);
                setNames(namesOfEvolutions);

                const datesOfEvolutions = response2.data.map(res => new Date(res.date).toLocaleDateString());
                setDates(datesOfEvolutions);

                const resultsOfEvolutions = response2.data.map(res => res.evolutionLink);
                setResults(resultsOfEvolutions);
                break;
        }
    },[]);

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
                    {names.map((name,key) => <p className="record-item" key={key.toString()} >{name}</p>)}
                </div>
                <div className="record-column">
                    <p className="record-item-header-title"><b>Data</b></p>
                    {dates.map((date,key) => <p className="record-item" key={key.toString()} >{date}</p>)}
                </div>
                <div className="record-column">
                    <p className="record-item-header-title"><b>Resultado</b></p>
                    {results.map((result,key) => {
                        return <>
                                    <div key={key.toString()} className="record-actions">
                                        <a href={result} target="_blank" rel="noopener noreferrer"><img src={viewCircle} alt=""/></a>
                                        <img src={downloadCircle} alt=""/>
                                    </div>
                                </>})}
                </div>
            </div>
        </div>
    );
}

export default Record;