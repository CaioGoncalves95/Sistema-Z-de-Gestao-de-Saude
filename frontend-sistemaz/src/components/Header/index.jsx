import React from 'react';
import { useHistory } from "react-router-dom";
import "./styles.css";

import Button from '../Button';

const Header = ({pageTitle}) => {
    let history = useHistory();

    const Logout = () => {
        history.push('/');
    }

    return (
        <header className="header">
            <div className="page-title">
                <p className="text">{pageTitle}</p>
            </div>
            <div className="system-title">
                <p className="text" id="title"><b>Sistema Z de Gestão de Saúde</b></p>
            </div>
            <div className="greetings-logout">
                <p className="text" >Bem vindo(a)</p>
                <Button text="Logout" onSubmit={Logout}></Button>
            </div>
        </header>
    )
}

export default Header;