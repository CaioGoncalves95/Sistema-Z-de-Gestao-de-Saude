import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import "./styles.css";

import axios from 'axios';

import Action from '../../components/Action';
import User from '../../components/User';
import Exam from '../../components/Exam';
import MedicalRecord from '../../components/MedicalRecord';

const Main = ({ page }) => {
  const [includeUser, setincludeUser] = useState(false);
  const [includeExam, setincludeExam] = useState(false);
  const [searchMedicalRecord, setsearchMedicalRecord] = useState(false);
  const [actionToTake, setActionToTake] = useState();
  const [open, setOpen] = useState(false);
  const [prontuary, setProntuary] = useState();
  const [pacientName, setPacientName] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // console.log(document.getElementById('prontuario').value);
    // if(actionToTake === 'searchMedicalRecord') {
    //   setsearchMedicalRecord(true);
    // } else if(actionToTake === 'requestExam') {
    //   setincludeExam(true);
    // }
  };

  const handleForward = async () => {
    let prontNumber = document.getElementById('prontuario').value;
    setProntuary(prontNumber);// console.log(document.getElementById('prontuario').value);
    const response = await axios.get(`http://localhost:3010/user/checkProntuary/${prontNumber}`);
    if(response.data && response.data.name) setPacientName(response.data.name);
    if(!response) return
    if(actionToTake === 'searchMedicalRecord') {
      setsearchMedicalRecord(true);
    } else if(actionToTake === 'requestExam') {
      setincludeExam(true);
    }
    setOpen(false);
  }

  let render;

  switch (page) {
    case 'admin':
      render = !includeUser ? 
              <>
                <Action title={'Incluir usuário'} type={'sum'} action={() => { setincludeUser(true)}}/>
                <Action title={'Editar usuário'} type={'edit'} action={() => {}}/>
                <Action title={'Excluir usuário'} type={'minus'}/>
              </> : <User /> 
      break;
    case 'medicalcenter': {
      if (includeExam) {
        render = <Exam prontuary={prontuary}/>
      } else if(searchMedicalRecord) {
        render = <MedicalRecord prontuaryNumber={prontuary} pacientName={pacientName}/>
      } else {
        render = <>
                    <Action title={'Pesquisar prontuário'} type={'search'} action={() => { 
                      handleClickOpen()
                      setActionToTake('searchMedicalRecord')
                      }}/>
                    <Action title={'Solicitar exame'} type={'sum'} action={() => { 
                      handleClickOpen()
                      setActionToTake('requestExam') }}/>
                    <Action title={'Solicitar procedimento'} type={'sum'}/>
                    <Action title={'Adicionar evolução'} type={'sum'}/>
                </>
      }
    break;
    }
  }

  return (
    <>
      <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" PaperProps={{style: {
            backgroundColor: '#5383FF'
          }}}>
          <DialogTitle id="form-dialog-title" style={{ color: 'white'}}>Digite o prontuário</DialogTitle>
          <DialogContent >
            <TextField
              autoFocus
              margin="dense"
              id="prontuario"
              label="Número do prontuário"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" style={{ color: 'white'}}>
              Fechar
            </Button>
            <Button onClick={handleForward} color="primary" style={{ color: 'white'}}>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div className="main">
        {/* <div id="search-box"></div> */}
        <div className="top-bar">
          
        </div>
        <div className="main-action">
          {/* <h3>Favoritos</h3> */}
          {render}
          {/* <MedicalRecord /> */}
        </div>
      </div>
    </>
  );
};

export default Main;
