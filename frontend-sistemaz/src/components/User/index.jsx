import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import { formatCPF, formatPhone } from '../../services/mask/index';

import './styles.css';

import Button from '../Button';
import axios from 'axios';

const User = () => {
    const [name, setName] = useState();
    const [lastName, setLastName] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [age, setAge] = useState();
    const [cpf, setCPF] = useState();
    const [profession, setProfession] = useState();
    const [email, setEmail] = useState();
    const [accessProfile, setAccessProfile] = useState();
    const [cep, setCEP] = useState();
    const [street, setStreet] = useState();
    const [neighborhood, setNeighborhood] = useState();
    const [number, setNumber] = useState();
    const [complement, setComplement] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();

    const [openConfirm, setOpenConfirm] = useState(false);
    const [openError, setOpenError] = useState(false);

    const openErrorDialog = () => {
        setOpenError(true);
    }

    const closeErrorDialog = () => {
        setOpenError(false);
    }

    const handleClickOpen = () => {
      setOpenConfirm(true);
    };
  
    const handleClose = () => {
      setOpenConfirm(false);
    };

    useEffect(() => {
        if(cep && cep.length === 8) {
            axios.get(`http://localhost:3010/cep/${cep}`).then(res => {
                setStreet(res.data.logradouro);
                setNeighborhood(res.data.bairro);
                setCity(res.data.localidade);
                setState(res.data.uf);
            }).catch(e => {
                throw "Error ao buscar CEP"
            });
        }
    }, [cep]);

    useEffect(() => {
        if(cpf && cpf.length === 11) {
            setCPF(formatCPF(cpf));
        }
    }, [cpf]);

    useEffect(() => {
        if(phoneNumber && phoneNumber.length >= 8) {
            setPhoneNumber(formatPhone(phoneNumber));
        }
    }, [phoneNumber]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(`http://localhost:3010/user`, {
            "name": name,
            "lastname": lastName,
            "phone": phoneNumber,
            "age": age,
            "cpf": cpf,
            "profession": profession,
            "email": email,
            "accessProfile": accessProfile,
            "address": {
                "cep": cep,
                "street": street,
                "neighborhood": neighborhood,
                "number": number,
                "complement": complement,
                "city": city,
                "state": state
            }
        });
        
        if(response.data.error) {
            openErrorDialog();
        } else {
            handleClickOpen();
        }

      };

    return (
        <div className="wrapper">
            <div>
                <Dialog
                    open={openError}
                    onClose={closeErrorDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Usuário já cadastrado com esse CPF"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Percebemos que já existe um usuário cadastrado com esse CPF no sistema! Selecione a opção de editar usuário, se deseja alterar algum dado deste CPF.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onSubmit={closeErrorDialog} text={"Fechar"} color={'#FD9797'}/>
                    </DialogActions>
                </Dialog>
            </div>

            <div>
                <Dialog
                    open={openConfirm}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Usuário cadastrado com sucesso"}</DialogTitle>
                    <DialogActions>
                        <Button onSubmit={handleClose} text={"Ok"} />
                    </DialogActions>
                </Dialog>
            </div>

            <form id="form" onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Usuário</legend>
                    <div className="all-labels">
                        <div className="label-row">
                            <div className="custom-label">
                                <label htmlFor="name">Nome</label>
                                <input type="text" name="name" required onChange={(e) => setName(e.target.value)}></input>
                            </div>
                            <div className="custom-label">
                                <label htmlFor="last-name">Sobrenome</label>
                                <input type="text" name="last-name" required style={{width: "20rem"}} onChange={(e) => setLastName(e.target.value)}></input>
                            </div>
                            <div className="custom-label">
                                <label htmlFor="age">Idade</label>
                                <input type="text" name="age" required onChange={(e) => setAge(e.target.value)}></input>
                            </div>
                        </div>
                        <div className="label-row">
                            <div className="custom-label">
                                <label htmlFor="cpf">CPF</label>
                                <input type="text" name="cpf" required onChange={(e) => setCPF(e.target.value)} value={cpf}></input>
                            </div>
                            <div className="custom-label">
                                <label htmlFor="phone">Telefone Principal</label>
                                <input type="text" name="phone" required onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber}></input>
                            </div >
                            <div className="custom-label">
                                <label htmlFor="email">Email</label>
                                <input type="text" name="email" required onChange={(e) => setEmail(e.target.value)}></input>
                            </div>
                            <div className="custom-label">
                                <label htmlFor="job">Profissão</label>
                                <input type="text" name="job" required onChange={(e) => setProfession(e.target.value)}></input>
                            </div>
                        </div>
                        <div className="custom-label">
                            <label htmlFor="access-profile">Perfil de Acesso</label>
                            <input list="accessProfile" type="text" required name="access-profile" onChange={ e => setAccessProfile(e.target.value)}></input>
                            <datalist id="accessProfile">
                                <option value="Administrador" />
                                <option value="Paciente" />
                                <option value="Central de Cadastro" />
                                <option value="Médico" />
                                <option value="Farmácia" />
                            </datalist>
                        </div>
                    </div>
                </fieldset>
            </form>
            <form id="form" onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Endereço</legend>
                    <div className="all-labels">
                        <div className="label-row">
                            <div className="custom-label">
                                <label htmlFor="cep">CEP</label>
                                <input type="text" name="cep" required maxLength={8} onChange={(e) => setCEP(e.target.value)}></input>
                            </div>
                            <div className="custom-label">
                                <label htmlFor="street">Rua</label>
                                <input type="text" name="street" style={{width: "20rem"}} disabled value={street} onChange={(e) => setStreet(e.target.value)}></input>
                            </div>
                            <div className="custom-label">
                                <label htmlFor="neighborhood">Bairro</label>
                                <input type="text" name="neighborhood" disabled value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)}></input>
                            </div>
                        </div>

                        <div className="label-row">
                            <div className="custom-label">
                                <label htmlFor="number">Número</label>
                                <input type="text" name="number" onChange={(e) => setNumber(e.target.value)}></input>
                            </div>
                            <div className="custom-label">
                                <label htmlFor="complement">Complemento</label>
                                <input type="text" name="complement" onChange={(e) => setComplement(e.target.value)}></input>
                            </div >
                            <div className="custom-label">
                                <label htmlFor="city">Cidade</label>
                                <input type="text" name="city" disabled value={city} onChange={(e) => setCity(e.target.value)}></input>
                            </div>
                            <div className="custom-label">
                                <label htmlFor="state">Estado</label>
                                <input type="text" name="state" disabled value={state} onChange={(e) => setState(e.target.value)}></input>
                            </div>
                        </div>
                    </div>
                </fieldset>

            </form>
            <div className="bottom-buttons">
                <Button  text={'Salvar'} form={"form"} />
                {/* onSubmit={handleClickOpen} */}
            </div>
        </div>
    );
}

export default User;