import React, {useEffect, useState} from 'react';
import DatePicker, {registerLocale} from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import br from 'date-fns/locale/pt-BR';
import axios from 'axios';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '../Button';

import './styles.css';

registerLocale('pt-BR', br)

const Exam = ({prontuary}) => {
    const [open, setOpen] = useState(false);
    const [examTypes, setExamTypes] = useState([]);
    const [selectedExam, setSelectedExam] = useState();
    const [unitsByExam, setUnitsByExam] = useState([]);
    const [selectedUnit, setSelectedUnit] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [availableScheduleTime, setAvailableScheduleTime] = useState([]);
    const [selectedScheduleTime, setSelectedScheduleTime] = useState();
    
    useEffect(async () => {
        const response = await axios.get(`http://localhost:3010/exam/examNames`);
        let exams = response.data.map(exam => exam.name);
        setExamTypes(exams);
        console.log(prontuary);
    }, []);

    useEffect(async () => {
        if(selectedExam && selectedExam.length > 0) {
            const response = await axios.get(`http://localhost:3010/exam/unitNamesByExam/${selectedExam}`);
            let units = response.data;
            setUnitsByExam(units);
        }
    }, [selectedExam]);

    useEffect(async () => {
        if(selectedExam && selectedUnit) {
            const response = await axios.get(`http://localhost:3010/exam/availableAgenda/${selectedExam}&${selectedUnit}&${startDate.getMonth()}&${startDate.getUTCDate()}`);
            if(response && response.data && response.data.length && response.data.length > 0) setAvailableScheduleTime(response.data);
        }
    }, [startDate]);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      };

    return (
        <>
            <div className="wrapper">
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Exame agendado com sucesso"}</DialogTitle>
                    <DialogActions>
                    <Button onSubmit={handleClose} text={"Ok"} />
                    </DialogActions>
                </Dialog>
            </div>

            <form id="form" onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Exame</legend>
                    <div className="all-labels">
                        <div className="label-row">
                            <div className="custom-label">
                                <label htmlFor="exam-type">Tipo de exame</label>
                                <input list="exams" type="text" name="exam-type" style={{width: "20rem"}} onChange={(e) => setSelectedExam(e.target.value)}></input>
                                <datalist id="exams">
                                    {examTypes.map((exam, key) => <option key={key.toString()} value={exam}  />)}
                                </datalist>
                            </div>
                        </div>
                        <div className="label-row">
                            <div className="custom-label">
                                <label htmlFor="unity">Unidade</label>
                                <input list="unity" type="text" name="unity" style={{width: "20rem"}} onChange={(e) => setSelectedUnit(e.target.value)}></input>
                                <datalist id="unity">
                                    {unitsByExam.map((unit, key) => <option key={key.toString()} value={unit} />)}
                                </datalist>
                            </div>
                        </div>
                        <div className="label-row">
                            <div className="custom-label">
                                <label htmlFor="date">Data</label>
                                <DatePicker minDate={new Date()} dateFormat="dd/MM/yy" locale="pt-BR" selected={startDate} onChange={date => setStartDate(date)} />
                            </div>
                        </div>
                        <div className="label-row">
                            <div className="custom-label">
                                <label htmlFor="hour">Horário</label>
                                <input list="scheduleTime" type="text" name="scheduleTime" onChange={ e => setSelectedScheduleTime(e.target.value)}></input>
                                <datalist id="scheduleTime">
                                    {availableScheduleTime.map((schedule, key) => <option key={key.toString()} value={new Date(schedule).getHours() + 3 + " hrs"} />)}
                                </datalist>
                            </div>
                        </div>

                    </div>
                </fieldset>
            </form>
    
            <div className="bottom-buttons">
                <Button  text={'Urgência'} color={'#FD9797'} form={"form"} onSubmit={handleClickOpen}/>
                <Button  text={'Agendar'} form={"form"} onSubmit={handleClickOpen}/>
            </div>
        </div>
        </>
    );
}

export default Exam;