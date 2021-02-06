import React, { useState, useEffect } from "react";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useHistory } from "react-router-dom";
import "./styles.css";


import axios from 'axios';

import Input from "../InputMedium";
import Button from "../Button";

const LoginBox = () => {
  
  let history = useHistory();
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const [logged, setLogged] = useState(false);
  const [accessProfile, setAccessProfile] = useState();
  const [openError, setOpenError] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:3010/user/login',{
      email: user,
      password: password
    });

    if(response.status !== 401) {
      setAccessProfile(response.data.accessProfile);
      setLogged(true);
    } else {
      setOpenError(true);
    }
    // console.log(response.data)

  };

  useEffect(() => {
    if(logged && accessProfile === 'Central de Cadastro') {
      history.push('/admin');
    } else if(logged && accessProfile === 'Médico') {
      history.push('/medicalcenter');
    } 
  }, [logged])

  
  const openErrorDialog = () => {
    setOpenError(true);
  }

  const closeErrorDialog = () => {
      setOpenError(false);
  }

  return (
    <>
      <div>
        <Dialog
            open={openError}
            onClose={closeErrorDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Usuário e/ou senha inválidos"}</DialogTitle>
            {/* <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Percebemos que já existe um usuário cadastrado com esse CPF no sistema! Selecione a opção de editar usuário, se deseja alterar algum dado deste CPF.
                </DialogContentText>
            </DialogContent> */}
            <DialogActions>
            <Button onSubmit={closeErrorDialog} text={"Fechar"} color={'#FD9797'}/>
            </DialogActions>
        </Dialog>
      </div>
      <form onSubmit={handleSubmit}>
        <div id="login-box">
          <div>
            <h3 className="header-text">Login</h3>
          </div>
          <div id="input-box">
            <Input
              title={"Email"}
              type={"text"}
              onChange={(e) => setUser(e.target.value)}
            ></Input>
            <Input
              title={"Senha"}
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
            <Button text={"Entrar"}></Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginBox;
